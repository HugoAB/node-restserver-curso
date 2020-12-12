const express = require('express');
const fs = require('fs');
const path = require('path');

const {verificaTokenImg} = require('../middlewares/autenticacion');

const app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg,(req, res) => {
    const {tipo, img} = req.params;

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }

});


module.exports = app;