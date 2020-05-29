const Zschema = require("z-schema")
const fs = require("fs")

module.exports = function (resumesData, schemaFile) {
  // validate against schema if requested
  if (schemaFile) {
    // get the schema file
    let schema = fs.readFileSync(schemaFile, {
      encoding: "utf8"
    })
    schema = JSON.parse(schema)

    // validate against it
    const validator = new Zschema()

    resumesData.forEach(data => {
      if (!validator.validate(data.parsed, schema)) {
        const errors = validator.getLastErrors()
        console.log(errors)
        process.exit()
      }
    })
  }

  return resumesData
}
