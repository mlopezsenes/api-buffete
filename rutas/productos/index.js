
var express = require('express');
var cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var router = express.Router({mergedparams : true});//

router.use(cors(corsOptions));

//Estructura menues
//tipoMenu= Snack / Principal / Bebida
var menuesJson = [{
                                     "tipoMenu": "Snack",
                                     "nombre":"Peps 250g",
                                     "precio": 13.5,
                                     "imagen": "https://www.iconfinder.com/data/icons/shopping-hand-drawn-1/128/21-256.png"
                                   },
                                   {
                                     "tipoMenu": "Snack",
                                     "nombre":"Papas Lays 250g",
                                     "precio": 35,
                                     "imagen": "http://www.pepsico.com.uy/Uruguay/images/content/marcas/logos/logo_lays_New.png"
                                   },
                                   {
                                     "tipoMenu": "Snack",
                                     "nombre":"Papas Lays 350g",
                                     "precio": 45,
                                     "imagen": "http://www.pepsico.com.uy/Uruguay/images/content/marcas/logos/logo_lays_New.png"
                                   },
                                   {
                                     "tipoMenu": "Principal",
                                     "nombre":"Porcion de Pizza",
                                     "precio": 13.5,
                                     "imagen": "http://icon-icons.com/icons2/281/PNG/256/Pizza-icon_30282.png"
                                   },
                                   {
                                     "tipoMenu": "Bebida",
                                     "nombre":"Coca-cola 500",
                                     "precio": 20,
                                     "imagen": "https://dtgxwmigmg3gc.cloudfront.net/files/53a92433e1272f2374001200-icon-256x256.png"
                                   },
                                   {
                                     "tipoMenu": "Bebida",
                                     "nombre":"Coca-cola Cero 500",
                                     "precio": 20,
                                     "imagen": "https://dtgxwmigmg3gc.cloudfront.net/files/53a978b5e1272f237401a28a-icon-256x256.png"
                                   },
                                   {
                                     "tipoMenu": "Bebida",
                                     "nombre":"Coca-cola Light 500",
                                     "precio": 20,
                                     "imagen": "https://dtgxwmigmg3gc.cloudfront.net/files/53a92429e1272f237300154e-icon-256x256.png"
                                   }
                                 ];

var menues = menuesJson;


// método GET que devuelve todos los productos.
router.get('/', function(req,res){
	/*req.db.collection('productos')
    .find()
    .toArray((err, data) => {
        res.json(data);
    });*/
    res.json(menues);
});

//b.  Devuelve todos los productos del tipo indicado.
router.get('/:tipoMenu',function(req,res){
	    /*req.db.collection('productos')
    .find({tipoMenu:req.params.tipoMenu})
    .toArray((err, data) => {
        res.json(data);
    });*/
    console.log(menues[1]);
    var retorno = [];
    for (var i = 0; i < menues.length; i++) {
      console.log(menues[i]);
      if (menues[i].tipoMenu == req.params.tipoMenu){
        console.log(menues[i]);
        retorno.push(menues[i]);
      }
    }

    console.log(retorno);
    res.json(retorno);
});

//3. Alta de un producto
router.post('/nuevo',function(req,res){
  /*console.log(req.body);
  req.db.collection('productos')
    .insert(req.body,function(e){
        if (e)
            console.log(e);
    })*/

    res.send("Se inserto correctamente");
});

module.exports = router;
