import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp/')
  },
  filename: function (req, file, cb) {
    const randomSuffix = Math.round(Math.random() * 1e9)
    cb(null, randomSuffix + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

export default upload
