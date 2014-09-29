/**
 * ServicioController
 *
 * @description :: Server-side logic for managing servicios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	buscaAhora: function(req, res) {
		var fecha = req.param('fecha');
		var hora = req.param('hora');
		Servicio.find().where({
			fechaServicio:  fecha
		//	horaServicio: { '>': hora }
		})		
		.exec(function (err, servicios) {
		if (err) {
			res.send(400);
		} else {
			res.send(servicios);
		}
		});
	},
	eliminaFicha: function(req, res) {
		var id = 'ObjectId("' + req.param('id') + '")'; 	
		Servicio.find().where({
			serv : req.param('id')
		})
		.exec(function (err, servicios) {
			if (err) {
				res.send(400);
			} else {
				servicios.forEach(function(servicio){
					Servicio.destroy({id:servicio.id}).exec(function (err){
						if(err){
							res.send(400);
						} else {
							console.log('datos eliminados');
						}
					});
				});
				res.send(servicios);
			}
		});
	}
};

