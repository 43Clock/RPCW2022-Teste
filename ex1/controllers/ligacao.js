var mongoose = require('mongoose')
var Ligacao = require('../models/ligacao')


module.exports.getAllWithOrigem = (origem) => {
    return Ligacao
        .find({origem:origem},{_id:0,id:1,destino:1})
        .sort({nome:1})
        .exec()
}

module.exports.getGreaterDistance =  (distance) => {
    return Ligacao
        .find({"distância":{$gte:distance}},{_id:0,id:1,origem:1,destino:1})
        .exec()
}
