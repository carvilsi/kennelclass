/**
The MIT License

Copyright (c) 2014 Carlos Villanueva

carvilsi@gmail.com

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
var updateServicio = '/servicio/update/';
var update = '/ficha/update/';
var deleteFicha = '/ficha/destroy/';

var and = '&';


var uriImage = '';
var cam = false;

var dia = 0;
var fichaGuardada = 'Ficha guardada';

var filtroServicioID = 2;

// ip y puerto donde se encuentra el backend

var ip='localhost';

var port=1337;

var prot = 'http://';

var colon = ':';

(function () {



    buscaServicios();
    localStorage.clear();

})();



/**
 * Para guardar una ficha nueva o una que se ha editado
 */

function save() {
    var rest;
    if (localStorage.id) {
        rest = prot + ip + colon + port +  update + localStorage.id + '?';
    } else {
        rest = prot + ip + colon + port + create;
    }

    rest = rest + propietario + $('#textinput-prop').val() + and +
        telefono + $('#textinput-tel').val() + and +
        movil + $('#textinput-mov').val() + and +
        email + $('#textinput-mail').val() + and +
        nombre + $('#textinput-nom').val() + and +
        raza + $('#select-razas').val() + and +
        color + $('#textinput-color').val() + and +
        edad + $('#textinput-edad').val() + and +
        caracter + $('#textinput-car').val() + and +
        problemasMedicos + $('#textarea-prob').val();
    if (uriImage) {
        var ur = uriImage.replace('data:image/jpeg;base64,', '');
        var uri1 = encodeURIComponent(ur);
        rest += and + imagen + uri1;
    }
    $.post(rest, function (resp) {
        uriImage = '';
        mensaje('Ficha guardada OK :)');
    }).fail(function () {
        mensaje('Ficha guardada NOK :(');
    });
    resetCam();
    setTimeout(function () {
        recargaInicio();
    }, 100);
}

/**
 * elimina una ficha
 */

function borraFicha() {
    var rest;
    if (localStorage.id) {
        $.get(prot + ip + colon + port + '/servicio/elimina?id=' + localStorage.id, function (res) {
            rest = prot + ip + colon + port + deleteFicha + localStorage.id;
            $.get(rest, function (res) {
                mensaje('Ficha eliminada OK :)');
                borraID();
                buscaServicios();
            }).fail(function () {
                mensaje('error al intentar eliminar la ficha NOK :/');
            });
        }).fail(function () {
            console.log('error al intantar eliminar servicios asociados a la ficha');
        });

    }
}

/**
 * Guardar un servicio prestado a un perro
 *  y asociarlo a una ficha
 *
 */


function guardaServicio(v) {
    var rest;
    var precio = $('#textinput-precio' + v).val() ? $('#textinput-precio' + v).val() : 0;
    if (localStorage.idServicio && !localStorage.id) {
        try {
            rest = prot + ip + colon + port + updateServicio + localStorage.idServicio + '?' +
                fechaServicio + $('#fecha-servicio' + v).val() + and +
                horaServicio + $('#input-hora' + v).val() + and +
                conceptoServicio + $('#textarea-servicio' + v).val() + and +
                precioServicio + precio;
            $.post(rest, function (res) {
                setTimeout(function () {
                    mensaje('Servicio actualizado OK :)');
                }, 100);
                if (!v) {
                    buscaServicios();
                } else {
                    refrescaTablaServicios();
                }
            }).fail(function () {
                console.log('error comm.');
            });
        } catch (e) {
            console.log('error com');
        } finally {
            localStorage.clear();
        }
    } else {
        if (v && localStorage.idServicio) {
            rest = prot + ip + colon + port +  updateServicio + localStorage.idServicio + '?' +
                fechaServicio + $('#fecha-servicio' + v).val() + and +
                horaServicio + $('#input-hora' + v).val() + and +
                conceptoServicio + $('#textarea-servicio' + v).val() + and +
                precioServicio + precio;
        } else {
            rest = prot + ip + colon + port +  createServicio +
                fechaServicio + $('#fecha-servicio' + v).val() + and +
                horaServicio + $('#input-hora' + v).val() + and +
                conceptoServicio + $('#textarea-servicio' + v).val() + and +
                precioServicio + precio;
        }

        $.post(rest, function (response) {
            $.post('http://' + ip + ':' + port + '/ficha/' + localStorage.id + '/serviciosPrestados/' + response.id, function (res) {
                setTimeout(function () {
                    mensaje('Servicio guardado OK :)');
                }, 100);
                if (!v) {
                    buscaServicios();
                    localStorage.clear();
                } else {
                    refrescaTablaServicios();
                    localStorage.removeItem('idServicio');
                }
            }).fail(function () {
                mensaje('Servicio no asociado NOK :/');
            });
        }).fail(function () {
            mensaje('Servicio no guardado NOK :/');
        });
    }
}


/**
 * Para la cosa de la búsqueda de las fichas
 */

function buscaFichas() {
    var busca = $('#busqueda-fichas').val();
    $.get('http://' + ip + ':' + port + '/ficha?where={"nombre":{"contains":"' + busca + '"}}&limit=50', function (data) {
        $('#ul-fichas').listview().empty();
        data.forEach(function (ficha) {
            var imagen = ficha.imagen ? '<img src="data:image/jpeg;base64,' + ficha.imagen + '"/>' : '';
            $('#ul-fichas').append('<li id=' + ficha.id + '><a href="#ficha" style="padding-right: 80px;">' + imagen +
                '<h1>Nombre: <strong>' + ficha.nombre +
                '</strong></h1><p>Due&ntilde;o: <strong>' + ficha.propietario +
                '</strong></h1><p>Raza: <strong>' + ficha.raza +
                '</strong></p></a><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop">Dar cita</a></li>');
            $('#ul-fichas').listview('refresh');
        });
        window.scrollTo(0, document.body.scrollHeight);
    }).fail(function () {
        console.log('error com.');
    });
}

/**
 * para buscar los servicios de un día concreto
 * con respecto a la fecha actual
 */

function buscaServicios() {
    var hoy = new Date();
    hoy = dia == 0 ? hoy : addDays(hoy, dia);
    var avui = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
    $.get(prot + ip + colon + port + '/servicio/buscaDia?fecha=' + avui + '&filtro=' + filtroServicioID, function (data) {
        $('#ul-servicios').empty();
        data.forEach(function (servicio) {
            var color = servicio.precioServicio == 0 ? 'style="color:red"' : '';
            $('#ul-servicios').append('<li id="' + servicio.id + '"><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop"><h1 ' + color + '>' + servicio.horaServicio +
                '  :  ' + servicio.conceptoServicio +
                '</h1><p>Nombre: ' + servicio.serv.nombre + '</p><a servID="' + servicio.serv.id +
                '" href="#ficha">Ficha</a></li>');
            $('#ul-servicios').listview('refresh');
        });
        $('#cabecera-citas').text(avui);
    }).fail(function () {
        console.log('error com.');
    });
}


/**
 * para quedarme con la cosa del id de la ficha que estoy trabajando
 */


$(document).on('click','#ul-fichas li',function(event){
  localStorage.id = $(this).attr('id');
  cargaFichas();
});

/**
 * para quedarme con la cosa del id de la ficha asociada al servicio que estoy trabajando
 */

$(document).on('click','#ul-servicios li a', function(event){
  if ($(this).attr('servID')) {
      localStorage.id = $(this).attr('servID');
      cargaFichas();
  }
});


/**
 * para quedarme con la cosa del id del servicio que estoy trabajando
 */

$(document).on('click', '#ul-servicios li', function(){
  localStorage.idServicio = $(this).attr('id');
  cargaServicio('');
});


/**
 *Para poder filtrar la búsqueda de los servicios
 **/


$(document).on('change', "input[type='radio']", function(event, ui){
  filtroServicioID = $(this).attr('value');
  buscaServicios();
});


/**
 * Para buscar servicios un día menos
 */

$(document).on('click', '#unDiaMenos', function(){
    dia -= 1;
    buscaServicios();
});

/**
 * Para buscar servicios en el día de hoy
 */

$(document).on('click', '#diaHoy', function(){
    dia = 0;
    buscaServicios();
});

/**
 * Para buscar servicios un día más
 */

$(document).on('click', '#unDiaMas', function(){
  dia += 1;
  buscaServicios();
});

/**
 * para borrar el ID esto es cuando quiero crear una nueva ficha
 * también limpiamos la lista
 */

function borraID() {
    localStorage.clear();
    limpiarLista();
    resetCam();
}

function nuevaFicha() {
    localStorage.clear();
    limpiarLista();
    $('#ficha_borra_bttn').css('display', 'none');
    $('#ficha_dar_cita_bttn').css('display', 'none');
    setTimeout(function () {
        rellenaRazas('mestizo');
    }, 200);
}


/**
 * Carga las fichas cuando tenemos un id
 */


function cargaFichas() {
    if (localStorage.id) {
      $('#ficha_borra_bttn').css('display', 'block');
      $('#ficha_dar_cita_bttn').css('display', 'block');
        var url = document.location.href;
        $.get(prot + ip + colon + port + '/ficha?id=' + localStorage.id, function (datos) {
          console.log(datos);
            setTimeout(function () {
                $('#textinput-prop').val(datos.propietario);
                $('#textinput-tel').val(datos.telefono);
                $('#textinput-mov').val(datos.movil);
                $('#textinput-mail').val(datos.email);
                $('#textinput-nom').val(datos.nombre);
                $('#textinput-color').val(datos.color);
                $('#textinput-edad').val(datos.edad);
                $('#textinput-car').val(datos.caracter);
                $('#textarea-prob').val(datos.problemasMedicos);
                $('img').remove();
                if (datos.imagen) {
                    $('#retrato').append('<img src="data:image/jpeg;base64,' + datos.imagen + '"/>');
                }
                if ($('#tabla-servicios tbody')) {
                    $('#tabla-servicios tbody').remove();
                }
                if (datos.serviciosPrestados.length != 0) {
                    var ordenados = datos.serviciosPrestados.sort(dynamicSortMultiple("-fechaServicio", "horaServicio"));
                    $('#div-servicios').css('display', 'inline');
                    $('#tabla-servicios').append('<tbody>');
                    datos.serviciosPrestados.forEach(function (servicio) {
                        var fecha = new Date(servicio.fechaServicio);
                        var precio = servicio.precioServicio ? servicio.precioServicio : 'SIN COBRAR';
                        $('#tabla-servicios').append('<tr onclick="tocameFila($(this));" id="' + servicio.id + '"><td>' + fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2) + '</td><td>' +
                            servicio.horaServicio + '</td><td><a href="#citaFicha" data-rel="popup" data-position-to="window" data-transition="pop">' +
                            servicio.conceptoServicio + '</a></td><th>' +
                            precio + '</th></tr>');
                    });
                    $('#tabla-servicios').append('</tbody>');
                }
            }, 200);
            rellenaRazas(datos.raza);
        }).fail(function () {
            console.log('error com.');
        });
    } else {
        console.log('Error en localStorage :/');
    }
}

/**
 *Para refrescar la lista de servicios prestados una vez que se edita en
 *la página de Fichas perrucánidas
 *No es la mejor práctica que me gustaría aplicar para refrescar, seguiremos investigando.
 */

function refrescaTablaServicios() {
    $.get(prot + ip + colon + port + '/ficha?id=' + localStorage.id, function (datos) {
        if (datos.serviciosPrestados.length != 0) {
            if ($('#tabla-servicios tbody')) {
                $('#tabla-servicios tbody').remove();
            } else {
                $('#tabla-servicios').css('display', 'inline');
            }
            var ordenados = datos.serviciosPrestados.sort(dynamicSortMultiple("-fechaServicio", "horaServicio"));
            $('#tabla-servicios').append('<tbody>');
            datos.serviciosPrestados.forEach(function (servicio) {
                var fecha = new Date(servicio.fechaServicio);
                var precio = servicio.precioServicio ? servicio.precioServicio : 'SIN COBRAR';
                $('#tabla-servicios').append('<tr onclick="tocameFila($(this));" id="' + servicio.id + '"><td>' + fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2) + '</td><td>' +
                    servicio.horaServicio + '</td><td><a href="#citaFicha" data-rel="popup" data-position-to="window" data-transition="pop">' +
                    servicio.conceptoServicio + '</a></td><th>' +
                    precio + '</th></tr>');
            });
            $('#tabla-servicios').append('</tbody>');
        }
    }).fail(function () {
        console.log('err comm. :()');
    });
}

function tocameFila(esto) {
    localStorage.idServicio = esto.attr('id');
    cargaServicio('Ficha');
}

/**
 * inicia la cosa de la foto…
 * TODO: mirar a ver de hacerlo cuando se inicia, de esta manera no se crean falsas esperanzas para los exploradores que no lo soportan y nos
 * ahorramos un click
 */

function foto() {
    try {
        Webcam.set({
            width: 150,
            height: 150,
            dest_width: 150,
            dest_height: 130,
            image_format: 'jpeg',
            jpeg_quality: 90,
            force_flash: false
        });
        if (Webcam.cameraIDs.length > 1) {
            Webcam.cameraID = 1;
        }
        Webcam.attach('#camara');
    } catch (err) {
        console.log('Algún problema con la cámara ' + err.message);
    }
    $('#foto').css('display', 'none');
    $('#hacerFoto').css('display', 'inline');
    Webcam.on('live', function () {
        cam = true;
    });
}

/**
 * Toma la imagen que se ve en la previsualización
 */

function hacerFoto() {
    Webcam.snap(function (data_uri) {
        uriImage = data_uri;
        $('img').remove();
        $('#retrato').append('<img src="' + data_uri + '"/>');
    });
}

/**
 * resetea la cámara para que no esté ahí funcionando cuando salimos de la página de fichas
 */


function resetCam() {
    if (Webcam && cam) {
        Webcam.reset();
        cam = false;
    }
}

/**
 * Limpia la lista de fichas en la página principal
 */
function limpiarLista() {
    $('#ul-fichas').listview().empty().listview("refresh");
}

function cargaServicio(tipo) {
    if (localStorage.idServicio) {
        $.get(prot + ip + colon + port + '/servicio?id=' + localStorage.idServicio, function (servicio) {
            var fecha = new Date(servicio.fechaServicio);
            $('#fecha-servicio' + tipo).val(fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2));
            $('#input-hora' + tipo).val(servicio.horaServicio);
            $('#textarea-servicio' + tipo).val(servicio.conceptoServicio);
            $('#textinput-precio' + tipo).val(servicio.precioServicio);
            $('#botonBorrarServicio' + tipo).css('display', 'inline');
        }).fail(function () {
            console.log('error comm');
        });
    }
}



function recargaInicio() {
    borraID();
    buscaServicios();
}

function borraServicio(tipo) {
    try {
        $.get(prot + ip + colon + port + '/servicio/destroy/' + localStorage.idServicio, function (respuesta) {
            if (!tipo) {
                borraID();
                buscaServicios();
            } else {
                refrescaTablaServicios();
            }
        }).fail(function () {
            mensaje("Servicio eliminado NOK :(");
            console.log('error comm');
        });
    } catch (e) {
        console.log('error comm.');
    } finally {
        $('#botonBorrarServicio' + tipo).css('display', 'none');
    }
}



/**
    Evitar que los FORMS hagan de las suyas
*/


$('#formulario').submit(function (event) {
    event.preventDefault();
});

/**
intentando el inicio de sesionIniciada
*/


// $('#botonLogin').click(function () {
//     console.log('Llego o que cojones');
//     $.ajax({
//         type: "POST",
//         url: 'http://' + ip + ':' + port + '/auth/login',
//         data: {
//             email: $('#nombredeusuario').val(),
//             password: $('#clave').val()
//         },
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (response) {
//           console.log('JODEEER');
//           window.location('/inicio');
//             console.log('Algo: ' + response);
//             localStorage.jwt = response.token;
//             limpiaLogin();
//             sesionIniciada();
//             dameUsuarios();
//         },
//         dataType: 'json'
//     });
// });
