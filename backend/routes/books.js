const { Router } = require('express');
const path = require('path');
const router = Router();
const Books = require('../models/books');
//requiero fs para eliminar archivos:
const { unlink } = require('fs-extra');
//requerimos fs-extra paraa validar pues fs no soporta promesas

router.get('/', async (req, res) => {
    const books = await Books.find()
    res.json(books);

});
router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    /*guardamos en base la ruta donde esta alojada la imagen */
    const imagePath = '/uploads/' + req.file.filename;
    /*nuevo*/
    const newBook = await new Books({ title, author, isbn, imagePath });
    console.log(newBook)
    await newBook.save();
    res.json({ menssage: 'libro guardado' });

});
router.delete('/:id', async (req, res) => {
    //const { id } = req.params;
    const book = await Books.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public/' + book.imagePath));

    res.json({ menssage: 'deleted' });



});

module.exports = router;