var mongoose = require('mongoose')
var Cidade = require('../models/cidade')

module.exports.getAll = () => {
    return Cidade
        .find({},{_id:0,id:1,nome:1,distrito:1})
        .exec()
}

module.exports.getByDistrito = (distrito) => {
    return Cidade
        .find({"distrito":{$regex:distrito+"$"}},{_id:0,id:1,nome:1})
        .sort({nome:1})
        .exec()
}


module.exports.lookUp = (id) => {
    return Cidade
        .findOne({id:id})
        .exec()
}
