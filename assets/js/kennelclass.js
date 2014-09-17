/**
 * Carlos Villanueva carvilsi@gmail.com
 * GNU
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

var fechaServicio = 'fechaServicio=';
var horaServicio = 'horaServicio=';
var conceptoServicio = 'conceptoServicio=';
var precioServicio = 'precioServicio=';



var create = '/ficha/create?';
var createServicio = '/servicio/create?';
var update = '/ficha/update/';

var and = '&';

/**
 * Para guardar una ficha nueva
 */

function save() {
        console.log('intentando guardar en bbdd');
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
    console.log(rest);
        var socket = io.connect();
        socket.request(rest,{},function(response) {
            jQuery(document).ready(function() {
                jQuery.each(response, function(key, player) {
                    console.log(player);
                });
            });
        });
}

/**
 * Guardar un servicio prestado a un perro 
 *  y asociarlo a una ficha 
*/


function saveServicio() {
	console.log('A la cosa de intentar guardar los servicio en la bbdd');
	

	var rest = createServicio +
		fechaServicio + $('#fecha-servicio').val() + and +
		horaServicio + $('#input-hora').val() + and +
		conceptoServicio + $('#textarea-servicio').val() + and +
		precioServicio + $('#textinput-precio').val();

	console.log(rest);
	$.post(rest, function (response) {
		$.post('/ficha/' + localStorage.id + '/serviciosPrestados/' + response.id, function (res) {
		});
	});
}

/**
 * Para la cosa de la búsqueda de las fichas
 */

function buscaFichas() {
	var busca = $('#busqueda-fichas').val();
	console.log(busca);
	$.get('/ficha?where={"nombre":{"contains":"' + busca +'"}}',function (data) {
		console.log(data);	
		$('#ul-fichas').empty();
		data.forEach(function(ficha){	    
			$('#ul-fichas').append('<li id=' + ficha.id  +'><a href="/fichas"><h2>Nombre: ' + ficha.nombre + '</h2><p>Propietario: ' + ficha.propietario  + '</p><p>email: ' + ficha.email + '</p></a><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop">Dar cita</a></li>');
		$('#ul-fichas').listview('refresh');
		});
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

function cargaFichas() {
	if (localStorage.id) {
		var url = document.location.href;
		$.get('/ficha?id=' + localStorage.id, function (datos) {
				console.log(datos);
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
			});
		}
	 else {
		console.log('no existo');
	}
}

/**
 * $(window).load(function(){ 
	console.log('La jodida ostias');
        console.log(document.location.href);
	var url = document.location.href;
	if (url.indexOf("fichas") != -1) {
		console.log('si que estoy en fichas');
	} 
}) */
