/**
* Servicio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
//	 id: { primaryKey: true }
  	serv: {model: 'Ficha'},
	conceptoServicio: { type: 'string'},
	horaServicio: { type: 'string'},
	fechaServicio: { type: 'string'},
	updatedAt: { type: 'string'},
	createdAt: { type: 'string'},
	precioServicio: { type: 'integer'}
  }
};

