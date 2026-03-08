const fs = require('fs')
const csv = require('csv-parser')
const { Parser } = require('json2csv')

const readCSV = (path) => {

  return new Promise((resolve, reject) => {

    const results = []

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject)
  })
}

const unifyCSV = async (files) => {

  let unified = []

  for (const file of files) {

    const data = await readCSV(file)

    unified = unified.concat(data)
  }

  return unified
}

const exportFiles = (folder, data) => {

  const jsonPath = `${folder}/unified.json`
  const csvPath = `${folder}/unified.csv`

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))

  const parser = new Parser()
  const csv = parser.parse(data)

  fs.writeFileSync(csvPath, csv)

  return { jsonPath, csvPath }
}

module.exports = {
  unifyCSV,
  exportFiles
}