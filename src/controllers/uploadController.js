const path = require('path')
const fs = require('fs')

const { unifyCSV, exportFiles } = require('../services/csvService')

const uploadCSV = async (req, res) => {

  try {

    const files = req.files.map(f => f.path)

    const unified = await unifyCSV(files)

    const today = new Date().toISOString().split('T')[0]

    const outputFolder = path.join(__dirname, '../../uploads/processed', today)

    fs.mkdirSync(outputFolder, { recursive: true })

    const result = exportFiles(outputFolder, unified)

    res.json({
      message: "Archivos procesados",
      files: result
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error procesando archivos" })
  }
}

module.exports = { uploadCSV }