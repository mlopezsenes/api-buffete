
var express = require('express');
var cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var router = express.Router({mergedparams : true});//

router.use(cors(corsOptions));
/*
//Estructura menues
{
  "usuario": a@a.com,
  "pedido": [{"tipoMenu": "Snack",
            "nombre":"Papas Lays 250g",
            "precio": 3.5,
            "imagen": "url imagen"},
          {"tipoMenu": "Snack",
            "nombre":"Papas Lays 250g",
            "precio": 30.5,
            "imagen": "url imagen"},
          {"tipoMenu": "Snak",
              "nombre":"Papas Lays 250g",
              "precio": 3.5,
              "imagen": "url imagen"}
          ]

}
*/

// método GET que devuelve todos los pedidos.
router.get('/', function(req,res){
	/*req.db.collection('pedidos')
    .find()
    .toArray((err, data) => {
        res.json(data);
    });*/
});

//b.  Devuelve todos los productos del tipo indicado.
router.get('/:mail',function(req,res){
	   /* req.db.collection('pedidos')
    .find({usuario:req.params.mail})
    .toArray((err, data) => {
      console.log(data);
        res.json(data);
    });*/
});

//3. Alta de un pedido
router.post('/nuevo',function(req,res){
  console.log(req.body);
  /*
  req.db.collection('pedidos')
    .insert(req.body,function(e){
        if (e)
            console.log(e);
    })*/
    res.json({"mensaje":"Se inserto correctamente"});

});

module.exports = router;
