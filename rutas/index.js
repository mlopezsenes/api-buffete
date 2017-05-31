var express = require('express');
var router = express.Router({mergedparams : true});

var productos = require('./productos');
var usuarios = require('./usuarios');
var pedidos = require('./pedidos');

router.use('/productos', productos);
router.use('/usuarios', usuarios);
router.use('/pedidos', pedidos);


module.exports = router;
