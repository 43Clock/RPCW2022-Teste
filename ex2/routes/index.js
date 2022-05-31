const { default: axios } = require('axios');
var express = require('express');
const { token } = require('morgan');
var router = express.Router();
var tokenApi = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxMzQzMiwiZXhwIjoxNjU0MDQyMjMyfQ.YjrUfkk6q8CtsxxryPaJYTzSEbVbNMBvz1MSBERItIBl-ucmjESbhLydl6RfzUqHT5M4vXdtVhruxhub6dKTLlNEOSDCppYrnc0AM3IQR-6oHnGpRZcz-jB8OKyJeu_ABcw6XILI_9vq7wawM9CwdgAe7_sCNsLwSv0_HASne_sspaWpAmmjY4Xk2WATglNEwXuWmVioNJKz1IeZVvoBlbDtmbdNYjof2Hw5NsmILsvbFYzJnQwrscTGt-DvINfSnIgc1OZdK8yEm4oRatu07wySh0NEoojYFVX_3v_qBsKTHd2tkLswpSW47K02etNT22cSAOvmvq6BM1Dt_7ycQA"

/* GET home page. */
router.get('/', function(req, res) {
    res.render("index")
});

router.get("/classes",function(req,res){
  params = {
    token:tokenApi,
    nivel: 1,
    estrutura:"arvore"
  }
  axios.get("http://clav-api.di.uminho.pt/v2/classes",{params:params})
      .then(data=>{
        console.log(data.data[0])
        res.render("classes",{classes:data.data})
      })
})

router.get("/classes/:id",function(req,res) {
  let params = {
      token:tokenApi
  }
  axios.get("http://clav-api.di.uminho.pt/v2/classes/"+req.params.id,{params:params})
      .then(data=>{
        if (data.data.nivel != 3){
          res.render("classe",{data:data.data})
        } else {
            axios.get("http://clav-api.di.uminho.pt/v2/classes/"+req.params.id+"/procRel",{params:params})
                .then(rel=>{
                  res.render("classe3",{data:data.data})
                })
                .catch(erro=>res.render("error",{error:erro}))


        }
      })
      .catch(erro=>res.render("error",{error:erro}))
})

router.get("/termos",function(req,res){
  let params = {
    token:tokenApi
  }
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice",{params:params})
      .then(data=>{
        res.render("termos",{data:data.data})
      })
      .catch(erro=>res.render("error",{error:erro}))
})

module.exports = router;
