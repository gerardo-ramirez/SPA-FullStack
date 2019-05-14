//usamos variables de entorno para ocultar nuesta ruta localhost:
//lo requerimos en el inicio:
//require('dotenv').config();

//hacemos un condicional para separar prodduccion de desarrollo.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const morgan = require('morgan');
const path = require('path');
//importamos rutas:
const books = require('./routes/books');
//modulo para ejecutar imagenes:
const multer = require('multer');

//cors permite comunicar dos servidores
const cors = require('cors');



//initializaations

const app = express();
require('./database');
//setting
app.set('port', process.env.PORT || 4000);
//middleware
app.use(morgan('dev'));
const storage = multer.diskStorage({
    //lugar donde alojaremos el archivo
    destination: path.join(__dirname, 'public/uploads'),
    //filename es una funcion, recibe : peticion, archivo y callbak
    filename(req, file, cb) {
        /*coloca a los  archivos que se suban una fecha con su extension original*/
        cb(null, new Date().getTime() + path.extname(file.originalname));

    }
})
//configura el archivo imagen recibido:
app.use(multer({ storage }).single('image'));
//interpreta formularios:
app.use(express.urlencoded({ extended: false }));
//entiende peticiones ajax :
app.use(express.json());
//conectamos dos servidores (front:8080 y back:4000)
app.use(cors());

//staticFiles
app.use(express.static(path.join(__dirname, 'public')));

//routesnpm
app.use('/api/books', books);
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});