const multer = require('multer')
const path = require('path')

const { ErrorObject } = require('../helpers/error')

const filesUpload = [
  { name: 'avatar', maxCount: 1 }
]
const MIMETYPES = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
const uploadPath = path.join(__dirname, '../uploads')

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname)
      const fileName = file.originalname.split(fileExtension)[0]
      const fileNameComplet = `${fileName}-${Date.now()}${fileExtension}`

      req.filePath = path.join(__dirname, '../uploads/', fileNameComplet)

      cb(null, fileNameComplet)
    }
  }),
  fileFilter: (req, file, cb) => {
    (MIMETYPES.includes(file.mimetype))
      ? cb(null, true)
      : cb(new ErrorObject(`Only extensions are allowed: [${MIMETYPES.join(' - ')}]`, 400))
  }
})

const cpUpload = upload.fields(filesUpload)

module.exports = cpUpload
