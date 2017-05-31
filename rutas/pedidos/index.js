
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
  usuario: mail,
  pedido: [{tipoMenu: "Snak", // Snak / Principal / Bebida
            nombre:"Papas Lays 250g",
            precio: 3,5,
            imagen: "url imagen"},
          {tipoMenu: "Snak", // Snak / Principal / Bebida
            nombre:"Papas Lays 250g",
            precio: 3,5,
            imagen: "url imagen"},
          {tipoMenu: "Snak", // Snak / Principal / Bebida
              nombre:"Papas Lays 250g",
              precio: 3,5,
              imagen: "url imagen"}
          ]

}
*/

// método GET que devuelve todos los pedidos.
router.get('/', function(req,res){
	req.db.collection('pedidos')
    .find()
    .toArray((err, data) => {
        res.json(data);
    });
});

//b.  Devuelve todos los productos del tipo indicado.
router.get('/pedidos/:mail',function(req,res){
	    req.db.collection('productos')
    .find({usuario:req.params.mail})
    .toArray((err, data) => {
        res.json(data);
    });
});

module.exports = router;
