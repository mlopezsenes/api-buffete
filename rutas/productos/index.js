
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
//tipoMenu= Snack / Principal / Bebida
{
  "tipoMenu": "Snack", 
  "nombre":"Papas Lays 250g",
  "precio": 3.5,
  "imagen": "url imagen"
}
*/

// método GET que devuelve todos los productos.
router.get('/', function(req,res){
	req.db.collection('productos')
    .find()
    .toArray((err, data) => {
        res.json(data);
    });
});

//b.  Devuelve todos los productos del tipo indicado.
router.get('/:tipoMenu',function(req,res){
	    req.db.collection('productos')
    .find({tipoMenu:req.params.tipoMenu})
    .toArray((err, data) => {
        res.json(data);
    });
});

//3. Alta de un producto
router.post('/nuevo',function(req,res){
  console.log(req.body);
  req.db.collection('productos')
    .insert(req.body,function(e){
        if (e)
            console.log(e);
    })
    res.send("Se inserto correctamente");
});

module.exports = router;
