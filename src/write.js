const puppeteer = require("puppeteer")
const fs = require("fs")

module.exports = function (resumeData, theme, css, format, dir) {
  resumeData.forEach(async obj => {
    let output = theme.render(obj.parsed)

    if (css) {
      output = `${output} 
<style>
  ${css}
</style>`
    }

    const inputFilename = obj.path.split("/").pop()
    const outputFilenameRoot = `${inputFilename.split(".").shift()}`
    const path = (dir && dir[dir.length - 1] !== '/') ? dir + '/' : dir
    let outPath

    // get any css overrides

    switch (format) {
      case ("html"):
        outPath = `${path}${outputFilenameRoot}.html`
        fs.writeFileSync(outPath, output, {
          encoding: "utf8"
        })
        console.log(`${obj.path} rendered to -> ${outPath}`)
        break

      case ("pdf"):
        const tmpPath = `/tmp/${outputFilenameRoot}.html`
        fs.writeFileSync(tmpPath, output, {
          encoding: "utf8"
        })

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.setViewport({
          width: 1440,
          height: 900,
          deviceScaleFactor: 2
        })

        await page.goto(`file://${tmpPath}`, {
          waitUntil: "networkidle2"
        })
        
        outPath = `${path}${outputFilenameRoot}.pdf`

        await page.pdf({
          path: `${outPath}`,
          pathRanges: "1",
          format: "A4",
          printBackground: true
        })

        await browser.close()

        console.log(`${obj.path} rendered to -> ${outPath}`)
        break

      case ("stdout"):
        console.log(output)
        break;

      default:
        console.log(`Output format "${format}" unrecognized.`)
        process.exit()
    }
  })
}
