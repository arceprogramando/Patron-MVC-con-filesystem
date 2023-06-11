import multer from "multer";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/img')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage })