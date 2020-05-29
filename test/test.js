// debug: node --inspect-brk node_modules/.bin/mocha --save
const fs = require("fs")
const path = require("path")
const exec = require("child_process").exec

const yargs = require("yargs")

/* globals describe, it */
const chai = require("chai")
// eslint-disable-next-line no-unused-vars
const expect = chai.expect
// eslint-disable-next-line no-unused-vars
const should = chai.should()

yargs.strict()
yargs.option("save", {
  describe: "True to save test results",
  demandOption: false
})

const themes = [
  "jsonresume-theme-stackoverflow"
]

themes.forEach ( theme => {
  const cmd = `node src/main.js --search test/mock-data/*.yml --theme ${theme} --css test/custom-theme.css --format stdout`

  if (yargs.argv.save) {
    exec(`${cmd} > test/saved-tests/${theme}.html`, function (error, stdout /* , stderr */) {
        if (error !== null) {
          console.log(`Exec error: ${error}`)
        }
      }
    )
  }
  else {
    it(`Should match saved test: ${theme}.html`, function(deferred) {
      exec(cmd, function (error, stdout /* , stderr */) {
          if (error !== null) {
            console.log(`Exec error: ${error}`)
          }

          let expected = fs.readFileSync(`./test/saved-tests/${theme}.html`, {
            encoding: "utf8"
          })

          // example result should match saved output
          stdout.should.equal(expected)
          deferred()
        }
      )
    })
  }
})
