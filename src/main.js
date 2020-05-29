#!/usr/bin/env node

const yargs = require("yargs")

const get = require("./get")
const validate = require("./validate")
const write = require("./write")

const { search, format, schemaFile, themeFile, cssFile, dir } = get.args()
const data  = get.data(search)
const css = get.css(cssFile)
const resumeData = validate(data, schemaFile)

const theme = require(themeFile)
write(resumeData, theme, css, format, dir)

// run help only at the end
yargs.argv = yargs.help("h").argv
