const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nome: {type: String},
    email: {type: String, unique: true},
    senha: {type: String},
    telefone: {type: String},
    apikey: {type: String, unique: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("usuario", schema);