/**
* Razas.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  	// no queremos que genere ni id ni campos como cratedAt updatedAt
	  
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
  attributes: {
	nombre: {type: 'string'}
  }
};

