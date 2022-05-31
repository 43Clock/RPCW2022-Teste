var express = require('express');
var router = express.Router();
var Cidade = require("../controllers/cidade");
var Ligacao = require("../controllers/ligacao");


/* GET users listing. */
router.get('/cidades', function(req, res, next) {
  if(req.query["distrito"]){
    Cidade.getByDistrito(req.query["distrito"])
        .then(data=>res.status(200).jsonp(data))
        .catch(erro => res.status(501).jsonp({error:erro}))
  }else{
    Cidade.getAll()
          .then(data=>res.status(200).jsonp(data))
          .catch(erro => res.status(501).jsonp({error:erro}))
  }
});

router.get('/cidades/nomes', function(req, res, next) {
    Cidade.getAll()
          .then(data=>{
            var cidades = new Set()
            data.forEach(ele=>cidades.add(ele.nome))
            let lista = Array.from(cidades).sort()
            res.status(200).jsonp(lista)
          })
          .catch(erro => res.status(502).jsonp({error:erro}))
});

router.get('/cidades/:id', function(req,res,next){
  Cidade.lookUp(req.params.id)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(503).jsonp({error:erro}))
})

router.get('/distritos', function(req,res,next){
  Cidade.getAll()
      .then(data => {
        var distrito = {}
        data.forEach(ele =>{
          if(!(ele.distrito in distrito))
              distrito[ele.distrito] = []
          distrito[ele.distrito].push({"id":ele.id,"nome":ele.nome})
        })
        var resultado = []
        for(k in distrito){
          temp = {}
          temp.distrito=k
          temp.listaDeCidades=distrito[k]
          resultado.push(temp)
        }
        res.status(200).jsonp(resultado)
      })
      .catch(erro => res.status(504).jsonp({error:erro}))
})

router.get('/ligacoes', function(req,res,next){
  if(req.query["origem"]){
    Cidade.getAll()
          .then(allCidades => {
            var cidades = {}
            allCidades.forEach(cidade=>cidades[cidade.id]=cidade.nome)
            Ligacao.getAllWithOrigem(req.query["origem"])
              .then(data=>{
                let lig = []
                data.forEach(ele => {
                  temp = {}
                  temp.id = ele.id
                  temp.destino = ele.destino
                  temp.cidadeDestino = cidades[ele.destino]
                  lig.push(temp)
                })
                res.status(200).jsonp(lig)
                })
              .catch(erro => res.status(506).jsonp({error:erro}))
              
          })
        .catch(erro => res.status(505).jsonp({error:erro}))
  }
  if(req.query["dist"]){
    Cidade.getAll()
    .then(allCidades => {
      var cidades = {}
      allCidades.forEach(cidade=>cidades[cidade.id]=cidade.nome)
      Ligacao.getGreaterDistance(req.query["dist"])
        .then(data=>{
          let lig = []
          data.forEach(ele => {
            temp = {}
            temp.id = ele.id
            temp.origem = ele.origem
            temp.cidadeOrigem = cidades[ele.origem]
            temp.destino = ele.destino
            temp.cidadeDestino = cidades[ele.destino]
            lig.push(temp)
          })
          res.status(200).jsonp(lig)
          })
        .catch(erro => res.status(506).jsonp({error:erro}))
        
    })
  .catch(erro => res.status(505).jsonp({error:erro}))
  }
})

module.exports = router;
