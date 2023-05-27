import multer from 'multer'

// Antes de instanciar multer, debemos configurar donde se almacenaran los archivos
const storage = multer.diskStorage({
    //destination hara referencia a la carpeta donde se va a guardar el archivo.
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/img')//Especiicamos la carpeta en este punto.
    },

    //filename hara referencia al nombre final que contendra el archivo 
    filename: function (req, file, cb) {
        cb(null, file.originalname)//Originalname indica que se conserve el nombre inicial
    }
})

export const uploader = multer({ storage })