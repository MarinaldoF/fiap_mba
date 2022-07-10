const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nomeBanco: {type: String},
    tipoConta: {type: String},
    nomeProprietario: {type: String},
    limiteCredito: {type: Number},
    apikey: {type: String},
});

module.exports = mongoose.model('financeiro', schema);