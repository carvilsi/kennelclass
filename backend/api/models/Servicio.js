/**
* Servicio.js
*
* @description :: Son los servicios que se le prestan al cliente canino
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	serv: {model: 'Ficha'},
	conceptoServicio: { type: 'string'},
	horaServicio: { type: 'string'},
	fechaServicio: { type: 'date'},
	updatedAt: { type: 'string'},
	createdAt: { type: 'string'},
	precioServicio: {
            type: 'integer',
            required: false
            }
  }
};
