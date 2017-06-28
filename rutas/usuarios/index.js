express = require('express');
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};



router = express.Router({mergedparams : false});//{mergedparams : false}
router.use(cors(corsOptions));


/*
//Estructura usuario:
{
  "_id": "592e385747b55105cca8a184",
  "nombre": "nombre",
  "apellido": "apellido",
  "dni": 99000111,
  "mail": "a@a.com",
  "clave": "8927bd748f26a7258a01e318a7e1e7585458a228" //la clave es 'clave'
}
*/
//3. Alta de un usuario
router.post('/nuevo',function(req,res){
  console.log(req.body);
    var usuario = req.body;
    usuario.clave = sha1(req.body.clave);
    req.db.collection('usuarios')
    .insert(usuario,function(e){
        if (e)
            console.log(e);
    })
    res.send({mensaje:"Se inserto correctamente"});
});



//4.a listo todos los usuarios
router.get('/',function(req,res){
	req.db.collection('usuarios')
    .find()
    .toArray((err, data) => {
        res.json(data);
    });
});

// busco el usuario con el mail brindado
router.get('/:mail',function(req,res){
    console.log(req.params.mail);
	    req.db.collection('usuarios')
    .find({mail:req.params.mail})
    .toArray((err, data) => {
        res.json(data);
    });
});

// comparo mail con clave
router.get('/:mail/:clave',function(req,res){
    //console.log(req.params.mail);
    //console.log(req.params.clave);
      req.db.collection('usuarios')
    .find({mail:req.params.mail})
    .toArray((err, data) => {
      var result = data[0];
        if (data.length != 0){
          if (req.params.mail == result.mail && sha1(req.params.clave) == result.clave) {
            res.json({codigo: 200,mensaje:'Validado'});  
          } else {
            res.json({codigo: 400,mensaje:'mail o clave incorrectos'})
          }

          } else { res.json({codigo: 500,mensaje:'mail o clave incorrectos.'})}
        
    });
});

/*router.put('/',function(req,res){
    var objetoUsuario =req.body;
    var idUsuario=req.body._id;
    delete objetoUsuario._id
	req.db.collection('usuarios')
	.update({ _id: req.ObjectID(idUsuario)},{ $set : objetoUsuario }, function (err, result) {
        res.send(
            (err === null) ? {msg: 'Se actualizó el usuario'} : {msg: err}
        );
    });
});
*/
router.delete('/',function(req,res){
    req.db.collection('usuarios')
    .remove({ _id: req.ObjectID(req.body._id)}, function (err, result) {
        res.send(
            (err === null) ? {msg: 'Se eliminó correctamente'} : {msg: err}
        );
    });
});


module.exports = router;
