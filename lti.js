var config = require("config");
var consumer_key = config.lti.key;
var consumer_secret = config.lti.secret;
var lti = require('ims-lti');
var Promise = require('bluebird');
//var db = require("../../models");


/**
 * Valida el request https que llega de Coursera (parámetros, signatura y que no se haya procesado antes)
 * Genera un registro del usuario, para su posterior calificación.
 */
function registrarIngeso(req) {
    return new Promise(function (resolve, reject) {
        var provider = new lti.Provider(consumer_key, consumer_secret);
        provider.valid_request(req, function (err, is_valid) {
            var body = req.body;
            if (!is_valid || !provider.outcome_service) return reject(new Error("El envío de los parámetros desde Coursera no coincide."));
            if (!body.custom_examen) return reject(new Error('Es necesario indicar el id del examen en los parámetros de personalización de la actividad. Por ejemplo, llave: examen y valor: 1'));

            var actividad = body.resource_link_title;
            var nombre = body.lis_person_name_full;
            var userId = body.user_id;
            var examenId = body.custom_examen;
            var serviceUrl = body.lis_outcome_service_url;
            var sourcedId = body.lis_result_sourcedid;
            var respuestaExamen = {
                    ExamenId: examenId,
                    EstudianteId: userId,
                    lis_outcome_service_url: serviceUrl,
                    lis_result_sourcedid: sourcedId,
                    actividad: actividad
                };

            return respuestaExamen;
            });
    });
}




function calificar(userId, examenId, nota) {


    return db.Respuesta.findOne({
        where: {
            ExamenId: examenId,
            EstudianteId: userId
        }
    }).then(function (respuesta) {

        if (nota < 0 || nota > 1) throw new Error("La nota debe ser un número entre 0 y 1");
        if (!respuesta) throw new Error("El usuario no se ha registrado para resolver el examen");

        var body = {
            lis_outcome_service_url: respuesta.lis_outcome_service_url,
            lis_result_sourcedid: respuesta.lis_result_sourcedid
        };

        return sendResultToCoursera(body, nota);
    });
}

function sendResultToCoursera(body, nota) {
    return new Promise(function (resolve, reject) {
        var provider = new lti.Provider(consumer_key, consumer_secret);
        provider.parse_request(null, body);
        provider.outcome_service.send_replace_result(nota, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    registrarIngeso: registrarIngeso,
    calificar: calificar
};
