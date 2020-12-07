const express = require('express');

const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

const Categoria = require('../models/categoria');
const app = express();


// Mostrar todas las categorias
app.get('/categorias', verificaToken,(req, res) => {
    Categoria.find({})
            .sort('descripcion')
            .populate('usuario', 'nombre email')
            .exec((err, categorias) => {
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
app.get('/categorias/:id', verificaToken,(req, res) => {
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
app.post('/categorias', [verificaToken, verificaAdminRole], (req, res) => {
    const body = req.body;

    const categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
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
app.put('/categorias/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const id = req.params.id;
    const body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators:true}, (err, categoriaDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoriaDB) {
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
app.delete('/categorias/:id', [verificaToken, verificaAdminRole],(req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoriaBorrada) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada,
            message: 'Categoria borrada'
        })
    });
});


module.exports = app;