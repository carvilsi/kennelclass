/**
 * ServicioController
 *
 * @description :: Server-side logic for managing servicios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    //    Esta es la llamda para sacar los servicios de hasOwnProperty
    //    http://localhost:1337/servicio/buscaDia?fecha=2014-12-01&filtro=0
    // ["todos los servicios, cobrados o no" == 0, "Los servicios cobrados" == 1, "los servicios que faltan por cobrarse" == 2]
    //    

    buscaAhora: function (req, res) {
        var fecha = req.param('fecha');
        var filtro = req.param('filtro');
        if (filtro == 0) {
            Servicio.find().where({
                fechaServicio: new Date(fecha)
            })
                .populate('serv')
                .sort('horaServicio asc')
                .exec(function (err, servicios) {
                    if (err) {
                        res.send(400);
                    } else {
                        res.send(servicios);
                    }
                });
        }
        if (filtro == 1) {
            Servicio.find().where({
                fechaServicio: new Date(fecha)
            }).where({
                precioServicio: {
                    "!": 0
                }
            })
                .populate('serv')
                .sort('horaServicio asc')
                .exec(function (err, servicios) {
                    if (err) {
                        res.send(400);
                    } else {
                        res.send(servicios);
                    }
                });
        }
        if (filtro == 2) {
            Servicio.find().where({
                fechaServicio: new Date(fecha)
            }).where({
                precioServicio: 0
            })
                .populate('serv')
                .sort('horaServicio asc')
                .exec(function (err, servicios) {
                    if (err) {
                        res.send(400);
                    } else {
                        res.send(servicios);
                    }
                });
        }
    },
    eliminaFicha: function (req, res) {
        var id = 'ObjectId("' + req.param('id') + '")';
        Servicio.find().where({
            serv: req.param('id')
        }).exec(function (err, servicios) {
                if (err) {
                    res.send(400);
                } else {
                    servicios.forEach(function (servicio) {
                        Servicio.destroy({
                            id: servicio.id
                        }).exec(function (err) {
                            if (err) {
                                res.send(400);
                            } else {
                                console.log('datos eliminados');
                            }
                        });
                    });
                    res.send(servicios);
                }
            });
    },

    //    Esta es la llamada que funciona
    //    http://localhost:1337/servicio/busca?fechaInicio=2013-11-10&fechaFin=2015-11-07

    buscaEntre: function (req, res) {
        var fechaInicio = req.param('fechaInicio');
        var fechaFin = req.param('fechaFin');
        Servicio.find().where({
            "fechaServicio": {
                ">": new Date(fechaInicio),
                "<": new Date(fechaFin)
            }
        }).exec(function (err, servicios) {
                if (err) {
                    console.error(err);
                    res.send(400);
                } else {
                    res.send(servicios);
                }
            });
    }
};