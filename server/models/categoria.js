const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }
});


module.exports = mongoose.model('Categoria', categoriaSchema);