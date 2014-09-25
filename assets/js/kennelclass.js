/**
The MIT License

Copyright (c) 2014 Carlos Villanueva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


/**
 * variables que pueden resultar utiles
 */

var propietario = 'propietario=';
var telefono = 'telefono=';
var movil = 'movil=';
var email = 'email=';
var nombre = 'nombre=';
var raza = 'raza=';
var color = 'color=';
var edad = 'edad=';
var caracter = 'caracter=';
var problemasMedicos = 'problemasMedicos=';
var imagen = 'imagen=';

var fechaServicio = 'fechaServicio=';
var horaServicio = 'horaServicio=';
var conceptoServicio = 'conceptoServicio=';
var precioServicio = 'precioServicio=';



var create = '/ficha/create?';
var createServicio = '/servicio/create?';
var update = '/ficha/update/';

var and = '&';


var uriImage = '';
var cam = false;

/**
(function() {
	console.log('pues salgo');
})();
*/


/**
 * Para guardar una ficha nueva o una que se ha editado
 */

function save() {
	var rest;
	if (localStorage.id) {
		 rest = update + localStorage.id + '?';
	} else {
		 rest = create; 
      	}
        rest = rest +   propietario + $('#textinput-prop').val() + and +
            		telefono + $('#textinput-tel').val() + and +
            		movil + $('#textinput-mov').val() + and +
            		email + $('#textinput-mail').val() + and +
            		nombre + $('#textinput-nom').val() + and +
            		raza + $('#textinput-raza').val() + and +
            		color + $('#textinput-color').val() + and +
            		edad + $('#textinput-edad').val() + and +
            		caracter + $('#textinput-car').val() + and +
            		problemasMedicos + $('#textarea-prob').val();
	if (uriImage) {
		var ur = uriImage.replace('data:image/jpeg;base64,','');
		var uri1 = encodeURIComponent(ur);
		rest += and + imagen + uri1;
	}
	$.post(rest, function (resp){
		console.log('guardado OK');
		uriImage = '';
	}).fail(function (){
		console.log('guardado NOK');
	});
	resetCam();
}

/**
 * Guardar un servicio prestado a un perro 
 *  y asociarlo a una ficha 
*/


function saveServicio() {
	var rest = createServicio +
		fechaServicio + $('#fecha-servicio').val() + and +
		horaServicio + $('#input-hora').val() + and +
		conceptoServicio + $('#textarea-servicio').val() + and +
		precioServicio + $('#textinput-precio').val();

	$.post(rest, function (response) {
			$.post('/ficha/' + localStorage.id + '/serviciosPrestados/' + response.id, function (res) {
				console.log('' + res);
		}).fail(function() {
			console.log('error com.');
		});
	}).fail(function() {
			console.log('error com.');
		});

}

/**
 * Para la cosa de la búsqueda de las fichas
 */

function buscaFichas() {
	var busca = $('#busqueda-fichas').val();
	$.get('/ficha?where={"nombre":{"contains":"' + busca +'"}}',function (data) {
		$('#ul-fichas').empty();
		data.forEach(function(ficha){	   
	       	        var imagen = ficha.imagen ? '<img src="data:image/jpeg;base64,' +  ficha.imagen + '"/>' : ''; 
			$('#ul-fichas').append('<li id=' + ficha.id  +'><a href="/fichas">' + imagen + '<h2>Nombre: ' + ficha.nombre + '</h2><p>Propietario: ' + ficha.propietario  + '</p><p>email: ' + ficha.email + '</p></a><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop">Dar cita</a></li>');
		$('#ul-fichas').listview('refresh');
		});
	}).fail(function() {
			console.log('error com.');
		});

}

/**
 * para quedarme con la cosa del id de la ficha que estoy trabajando
 */

$('#ul-fichas').on('click', 'li', function() {
	localStorage.id=$(this).attr('id');
	cargaFichas();
});

/**
 * para borrar el ID esto es cuando quiero crear una nueva ficha
 */

function borraID() {
	localStorage.removeItem("id");
}


/**
 * Carga las fichas cuando tenemos un id
 */
 
function cargaFichas() {
	if (localStorage.id) {
		var url = document.location.href;
		$.get('/ficha?id=' + localStorage.id, function (datos) {
				setTimeout(function(){	
					$('#textinput-prop').val(datos.propietario);
					$('#textinput-tel').val(datos.telefono);
					$('#textinput-mov').val(datos.movil);
					$('#textinput-mail').val(datos.email);
					$('#textinput-nom').val(datos.nombre);
					$('#textinput-raza').val(datos.raza);
					$('#textinput-color').val(datos.color);
					$('#textinput-edad').val(datos.edad);
					$('#textinput-car').val(datos.caracter);
					$('#textarea-prob').val(datos.problemasMedicos);
					if (datos.imagen) {
						$('#retrato').append('<img src="data:image/jpeg;base64,' + datos.imagen + '"/>');
					}
				},100);
			}).fail(function() {
				console.log('error com.');
			});
		}
	 else {
		console.log('no existo');
	}
}

/**
 * inicia la cosa de la foto…
 * TODO: mirar a ver de hacerlo cuando se inicia, de esta manera no se crean falsas esperanzas para los exploradores que no lo soportan y nos 
 * ahorramos un click
 */

function foto() {
	try{
		Webcam.set({
			width: 150,
			height: 150,
			dest_width: 150,
			dest_height: 130,
			image_format: 'jpeg',
			jpeg_quality: 90,
			force_flash: false
		    });
		Webcam.attach('#camara');	
		} 
	catch (err) {
		console.log('Algún problema con la cámara ' +  err.message);
	}
	$('#foto').css('display','none');
	$('#hacerFoto').css('display','inline');
	Webcam.on( 'live', function() {
		cam = true;	      
	} );
}

/**
 * Toma la imagen que se ve en la previsualización
 */

function hacerFoto() {
	Webcam.snap( function(data_uri) {
		uriImage = data_uri;
		$('img').remove();
		$('#retrato').append('<img src="'+data_uri+'"/>');
	});
}

/**
 * resetea la cámara para que no esté ahí funcionando cuando salimos de la página de fichas
 */


function resetCam() {
	if (Webcam && cam)  {
		Webcam.reset();
		cam = false;
	}
}



