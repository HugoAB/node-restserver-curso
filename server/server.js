require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse form
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('get usarios');
});


app.post('/usuario', (req, res) => {
    const body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }
});


app.put('/usuario/:id', (req, res) => {
    const id = req.params.id;
    res.json({id:id});
});


app.delete('/usuario', (req, res) => {
    res.json('delete usarios');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})