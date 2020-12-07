const express = require('express');
const _ = require('underscore');

const Producto = require('../models/producto');
const {verificaToken, verificaAdminRole} = require('../middlewares/autenticacion');

const app = express();


// Obtener todos los productos
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({disponible: true})
            .skip(desde)
            .limit(limite)
            .sort('nombre')
            .populate('usuario', 'nombre email')
            .populate('categoria')
            .exec((err, productos) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    productos
                });
            });
});


// Obtener un producto por id
app.get('/productos/:id', verificaToken, (req, res) => {
    const id = req.params.id;

    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria')
            .exec((err, producto) => {
                
                if(!producto) {
                    return res.status(404).json({
                        ok: false,
                        err: {
                            message: 'Producto no encontrado'
                        }
                    });
                }

                res.json({
                    ok: true,
                    producto
                });
            });
});


// Busca producto
app.get('/productos/buscar/:termino', verificaToken,(req, res) => {
    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
            .populate('categoria', 'descripcion')
            .exec((err, productos) => {
                if(err) {
                    return res.status(404).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    productos
                });
            });
            
});


// crear un producto
app.post('/productos', [verificaToken, verificaAdminRole], (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado 

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});


// actualizar un producto
app.put('/productos/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const id = req.params.id;
    const body = req.body;

    let producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    }

    Producto.findByIdAndUpdate(id, producto, {new: true, runValidators: true}, (err, productoDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            }); 
        }

        if(!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            id:id,
            producto: productoDB
        });
    });
});


// eliminar un producto
app.delete('/productos/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const id = req.params.id;

    let prodDisponible = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, prodDisponible, {new: true}, (err, productoBorrado) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            }); 
        }

        if(!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            }); 
        }

        res.json({
            ok: true,
            producto: productoBorrado
        });
    });
});


module.exports = app;