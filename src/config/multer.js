const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    const today = new Date().toISOString().split('T')[0]

    const dir = path.join(__dirname, '../../uploads/raw', today)

    fs.mkdirSync(dir, { recursive: true })

    cb(null, dir)
  },

  filename: (req, file, cb) => {

    const unique = Date.now() + '-' + file.originalname
    cb(null, unique)
  }
})

const upload = multer({ storage })

module.exports = upload