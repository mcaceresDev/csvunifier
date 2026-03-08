const express = require('express')

const upload = require('../config/multer')

const { uploadCSV } = require('../controllers/uploadController')

const router = express.Router()

router.post(
  '/upload',
  upload.array('files', 20),
  uploadCSV
)

module.exports = router