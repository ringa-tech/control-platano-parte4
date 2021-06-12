var express = require('express');
var app = express();
var spawn = require('child_process').spawn;

//Comencemos abriendo el programa
var net = spawn('../net/NetApp/bin/Debug/NetApp.exe');

net.stdout.on('data', function(data) {
	console.log("Recibi de .NET este mensaje: " + data.toString());
});

app.get('/', function(req, res) {
	console.log("Recibi una solicitud " + req.query.movimiento + ", " + req.query.brincar);
	net.stdin.write(req.query.movimiento + "," 
		+ req.query.brincar + "," + req.query.acelerar 
		+ "\r\n");
	res.send("Hola amigo");
});

app.use(express.static('public'));

app.listen(3000, function() {
	console.log("Se levanto el servidor");
});