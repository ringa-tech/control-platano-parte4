var video;
var canvas;

var altoCamara = 720;
var anchoCamara = 720;

var amarillo = {r: 255, g: 255, b: 0};

var distanciaAceptableColor = 190;

var sensibilidadGiro = 1.3;

function mostrarCamara() {
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");

	var opciones = {
		audio: false,
		video: {
			width: anchoCamara, height: altoCamara
		}
	};

	if(navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia(opciones)
		    .then(function(stream) {
		    	video.srcObject = stream;
		    	procesarCamara();
		    })
		    .catch(function(err) {
		    	console.log("Oops, hubo un error", err);
		    })
	} else {
		console.log("No existe la funcion getUserMedia... oops :( ");
	}
}

function procesarCamara() {
	var ctx = canvas.getContext("2d");

	ctx.drawImage(video, 0, 0, anchoCamara, altoCamara, 0, 0, canvas.width, canvas.height);

	var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var pixeles = imgData.data;
	//console.log(pixeles);

	//var pixelMasAmarillo = null;
	//var menorDistancia = null;

	/*var sumaX = 0;
	var sumaY = 0;
	var cuenta = 0;*/

	var platanetes = [];

	for (var p=0; p < pixeles.length; p += 4) {
		var rojo = pixeles[p];
		var verde = pixeles[p+1];
		var azul = pixeles[p+2];
		var alpha = pixeles[p+3];

		var distancia = Math.sqrt(
			Math.pow(amarillo.r-rojo, 2) +
			Math.pow(amarillo.g-verde,2) +
			Math.pow(amarillo.b-azul, 2)
		);

		if (distancia < distanciaAceptableColor) {
			//pintar el pixel de rojo
			//pixeles[p] = 255; //r
			//pixeles[p+1] = 0; //g
			//pixeles[p+2] = 0; //b

			var y = Math.floor(p / 4 / canvas.width);
			var x = (p/4) % canvas.width;

			//Agrupacion
			if (platanetes.length == 0) {
				//Es mi primer platanete, hola mundo
				var platanete = new Platanete(x, y);
				platanetes.push(platanete);
			} else {
				//Revisar si esta cerca. Si si, me uno a el
				//Si no, creo uno nuevo

				var encontrado = false;
				for (var pl=0; pl < platanetes.length; pl++) {
					if (platanetes[pl].estaCerca(x, y)) {
						platanetes[pl].agregarPixel(x, y);
						encontrado = true;
						break;
					}
				}

				if (!encontrado) {
					var platanete = new Platanete(x, y);
					platanetes.push(platanete);
				}
			}

			/*sumaX += x;
			sumaY += y;
			cuenta++;*/
		}

		/*if (menorDistancia == null || distancia < menorDistancia) {
			menorDistancia = distancia;

			var y = Math.floor(p / 4 / canvas.width);
			var x = (p/4) % canvas.width;

			pixelMasAmarillo = {x: x, y: y};
		}*/
	}

	ctx.putImageData(imgData, 0, 0);

	platanetes = unirPlatanetes(platanetes);

	var masGrande = null;
	var mayorTamano = -1;

	for (var pl=0; pl < platanetes.length; pl++) {
		var width = platanetes[pl].xMaxima - platanetes[pl].xMinima;
		var height = platanetes[pl].yMaxima - platanetes[pl].yMinima;
		var area = width * height;

		if (area > 1500) {
			if (masGrande === null || area > mayorTamano) {
				masGrande = platanetes[pl];
				mayorTamano = area;
			}
		    //platanetes[pl].dibujar(ctx);
		}
	}

	if (masGrande !== null) {
		masGrande.dibujar(ctx);

		document.getElementById("info").innerHTML = masGrande.grados;
		var base = 270;
		var nuevosGrados = base + (masGrande.grados*-1) * sensibilidadGiro;
		document.getElementById("carrito")
		    .style.transform="rotate(" + nuevosGrados + "deg)";

	    var ancho = masGrande.xMaxima - masGrande.xMinima;
	    enviarMovimiento(masGrande.grados, masGrande.yMinima, ancho);
	}

	setTimeout(procesarCamara, 20);
}

/**
 * Esta funcion tiene como objetivo recibir un arreglo de objetos "Platanete" que pueden tener
 * intersecciones entre ellos (rectangulos dentro de otros rectangulos, o con cualquier interseccion)
 *
 * Regresa un arreglo en donde, si encontro intersecciones, une esos objetos.
 *
 * Es decir puede regresar el mismo arreglo, o uno con menos objetos (pero mas grandes)
 *
 * La verdad no tiene que ser recursivo pero asi se me ocurrio en el momento HOH
 */
function unirPlatanetes(platanetes) {
	var salir = false;

	//Comparamos todos contra todos
	for (var p1=0; p1 < platanetes.length; p1++)  {
		for (var p2=0; p2 < platanetes.length; p2++) {

			if (p1 == p2) continue; //Si es el mismo, no lo consideres, y ya

			var platanete1 = platanetes[p1];
			var platanete2 = platanetes[p2];

			//Intersectan?
			var intersectan = platanete1.xMinima < platanete2.xMaxima &&
				platanete1.xMaxima > platanete2.xMinima &&
			    platanete1.yMinima < platanete2.yMaxima && 
			    platanete1.yMaxima > platanete2.yMinima;

		    if (intersectan) {
		    	//Sip... pasar los pixeles del p2 al p1
		    	for (var p=0; p < platanete2.pixeles.length; p++) {
		    		platanete1.agregarPixel(
		    			platanete2.pixeles[p].x,
		    			platanete2.pixeles[p].y
	    			);
		    	}
		    	//borrar el p2
		    	platanetes.splice(p2, 1);
		    	salir = true;
		    	break;
		    }

		}

		if (salir) {
			break;
		}
	}

	//Si encontre una interseccion, reprocesemos todo de nuevo
	//con el arreglo modificado
	if (salir) {
		return unirPlatanetes(platanetes);
	} else {
		//Ya no hubo intersecciones, salir
		return platanetes;
	}
}

var ultimoUrl = null;

function enviarMovimiento(grados, yMinima, ancho) {
	var movimiento = "0"; //0 = no hay mov. -1 mov izq, 1 mov der
	if (grados >= 18) {
		movimiento = "-1";
	} else if (grados <= -18) {
		movimiento = "1";
	}

	var brincar = "0";
	if (yMinima <= 30) {
		brincar = "1";
	}

	var acelerar = "0";
	if (ancho >= 240) {
		acelerar = "1";
	}

	var url = "http://localhost:3000?movimiento=" + movimiento + 
	    "&brincar=" + brincar + "&acelerar=" + acelerar;

	if (ultimoUrl === null || url !== ultimoUrl) {
		ultimoUrl = url;

		$.get(url, function(response) {
			console.log(response);
		});
	}
}

//Hola. Realmente estas leyendo el codigo?
//Si no te queda claro algo dejame un comentario. Y si todo te quedo claro, tambien!