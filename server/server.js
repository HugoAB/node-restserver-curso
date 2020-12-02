require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// parse form
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

// habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// rutas
app.use(require('./routes/index'));

// conectar a mongodb
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},
(err, res) => {
    if(err) {
        throw err;
    } else {
        console.log('Base de Datos ONLINE');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})

