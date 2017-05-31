var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var rutas = require('./rutas');
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
	console.log(Date());
	next();
});

MongoClient.connect('mongodb://localhost:27017/buffete', function(err, db) {
  if (err)
        throw err;
    app.use((req, res, next) => {
        req.db = db;
				req.ObjectID=ObjectID;
        next();
    });

   db.collection('usuarios').drop();
   db.collection('usuarios').insert({
																	   "nombre": "nombre",
																	   "apellido": "apellido",
																	   "dni": 99333111,
																	   "mail": "a@a.com",
																	   "clave": "clave"
																	 }
																);
	db.collection('productos').drop();
  db.collection('productos').insert([{
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
																	 ]
																	 );


	app.use('/',rutas);
	//como es async , lo hago aca
	app.listen(3000,function(){
		console.log('Servidor funcionando en el puerto 3000')
	});
});
