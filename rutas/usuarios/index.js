express = require('express');
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
  "clave": "clave"
}
*/
//3. Alta de un usuario
router.post('/nuevo',function(req,res){
  console.log(req.body);
    req.db.collection('usuarios')
    .insert(req.body,function(e){
        if (e)
            console.log(e);
    })
    res.send("Se inserto correctamente");
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
