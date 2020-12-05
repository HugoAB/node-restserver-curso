const express = require('express');

const {verificaToken} = require('../middlewares/autenticacion');

const Categoria = require('../models/categoria');
const app = express();


// Mostrar todas las categorias
app.get('/categorias', (req, res) => {
    const categorias = Categoria.find({}, (err, categorias) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categorias
        });
    });
});


// Mostrar una categoria
app.get('/categorias/:id', (req, res) => {
    const id = req.params.id;

    const categoria = Categoria.findById(id, (err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    });
});


// Agregar una categoria
app.post('/categorias', (req, res) => {
    const body = req.body;

    const categoria = new Categoria({
        nombre: body.nombre
    });

    categoria.save((err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// Actualizar una categoria
app.put('/categorias/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Categoria.findByIdAndUpdate(id, body, (err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// Eliminar una categoria
app.delete('/categorias/:id', (req, res) => {

});


module.exports = app;