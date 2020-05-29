const glob = require("glob")
const yargs = require("yargs")
const fs = require("fs")
const yaml = require("js-yaml")

exports.args = function () {
  yargs.strict()

  yargs.option("search", {
    describe: "Path to the JSON file(s) you are using as input.",
    demandOption: true
  })

  yargs.option("format", {
    describe: "Output format.",
    choices: ["pdf", "html", "stdout"],
    default: "pdf"
  })

  yargs.option("theme", {
    describe: "Name of the theme you want to use. Install new themes with \"npm install $theme_name\" and pass $theme_name as the arg value.",
    demandOption: false,
    default: "jsonresume-theme-stackoverflow"
  })

  yargs.option("css", {
    describe: "Specify a stylesheet to override styles in your theme",
    demandOption: false,
    default: null
  })

  yargs.option("dir", {
    describe: "Specify output directory",
    demandOption: false,
    default: ''
  })

  yargs.option("schema", {
    describe: "Validation schema.",
    demandOption: false,
    default: null
  })

  return {
    search: yargs.argv.search,
    format: yargs.argv.format,
    cssFile: yargs.argv.css,
    themeFile: yargs.argv.theme,
    schemaFile: yargs.argv.schema,
    dir: yargs.argv.dir
  }
}

exports.data = function (search) {
  // get the resume data files
  const filesArr = glob.sync(search, {
    encoding: "utf8"
  })

  if (filesArr.length === 0) {
    console.log("ERROR: No files found. Double check '--search' parameter is correct")
    process.exit()
  }

  return filesArr
    .map(path => {
      const fileType = path.split(".").pop()
      let raw
      try {
        raw = fs.readFileSync(path, {
          encoding: "utf8"
        })
      } catch (err) {
        console.log(`ERROR: ${path} could not be read`)
        process.exit()
      }

      return { raw: raw, path: path, fileType: fileType }
    })
    .map(({ raw, path, fileType }) => {
      let parsed
      switch (fileType) {
        case ("json"):
          try {
            parsed = JSON.parse(raw)
          } catch (err) {
            console.log(`ERROR: ${path} is not a valid ${fileType} file`)
            process.exit()
          }
          break

        case ("yml"):
          try {
            parsed = yaml.safeLoad(raw)
          } catch (err) {
            console.log(`ERROR: ${path} is not a valid ${fileType} file`)
            process.exit()
          }
          break

        default:
          throw new Error(`Filetype ${fileType} not recognized`)
      }

      return { parsed, raw, path, fileType }
    })
}


exports.css = function(cssFile) {
  if (cssFile === null) return '' 
  debugger
  return fs.readFileSync(cssFile)
}
