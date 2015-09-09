/**
 * Para manejar la cosa de los días en la agenda diaria
 */

function addDays(theDate, days) {
	    return new Date(theDate.getTime() + days*24*60*60*1000);
}


/**
 * Para ordenar objetos (ej. JSON) con criterio de dos variables
 */

function dynamicSortMultiple() {
     var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/**
 * Para mostrar mensajes a los usuarios
 */

function mensaje(texto){
	$('#guardar-popup').children('p').remove();
	$('#guardar-popup').append('<p>' + texto + '</p>');
	$('#guardar-popup').popup('open');
	setTimeout(function(){
		$('#guardar-popup').popup('close');
	},1500);
}

/**
 * para rellenar el combobox con las razas
 */


function rellenaRazas(razaPerro){
	$.get(prot + ip + colon + port + '/razas?limit=407',function(razas){
		razas.forEach(function(raza){
			$('select#select-razas').selectmenu();
			var option = '<option value="' + raza.nombre + '">' + raza.nombre  + '</option>';
			if (razaPerro && razaPerro == raza.nombre) {
				option = '<option value="' + raza.nombre + '" selected="selected">' + raza.nombre  + '</option>';
			}
			$('select#select-razas').append(option);
		});
		$('select#select-razas').selectmenu('refresh');
		$("select#select-razas").selectmenu('enable');
	}).fail(function(){
		console.log('error al intentar traer las razas :(');
	});
}

/**
TODO: refactorizar para no tener dos funciones
 * para rellenar el combobox con las razas
 */


// function rellenaRazasN(razaPerro){
// 	$.get(prot + ip + colon + port + '/razas?limit=407',function(razas){
// 		razas.forEach(function(raza){
// 			$('select#select-razasN').selectmenu();
// 			var option = '<option value="' + raza.nombre + '">' + raza.nombre  + '</option>';
// 			if (razaPerro && razaPerro == raza.nombre) {
// 				option = '<option value="' + raza.nombre + '" selected="selected">' + raza.nombre  + '</option>';
// 			}
// 			$('select#select-razasN').append(option);
// 		});
// 		$('select#select-razasN').selectmenu('refresh');
// 		$("select#select-razasN").selectmenu('enable');
// 	}).fail(function(){
// 		console.log('error al intentar traer las razas :(');
// 	});
// }
