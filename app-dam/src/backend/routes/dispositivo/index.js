const express = require('express');

const routerDispositivo = express.Router();

const { getDatabaseInstance } = require('../../mysql-connector');

routerDispositivo.get('/', function (req, res, next) {
    try {
        // Reutilizamos la conexión
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener la lista de dispositivos
        devices = dbConnection.query('SELECT * FROM `Dispositivos`', function (error, results) {
            if (error) {
                console.error('Error obteniendo datos:', JSON.stringify(error));
                res.status(500);
                res.send({ error: 'internal server error' });
            } else {
                res.send(JSON.stringify(results)).status(200);
            }
        });
    } catch (error) {
        console.error('Ocurrió un error en la obtención de dispositivos', error);
        res.status(500);
        res.send({ error: 'internal server error' });
    }
});

routerDispositivo.get('/:id', function (req, res, next) {
    const dispositivoId = req.params.id;
    try {
        // Reutilizamos la conexión
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener el detalle de un dispositivo por id
        const queryDispositivo = 'SELECT * FROM `Dispositivos` WHERE dispositivoId =' + dispositivoId;
        devices = dbConnection.query(queryDispositivo, function (errorD, resultsDispositivos) {
            if (errorD) {
                console.error('Error obteniendo datos:', JSON.stringify(errorD));
                res.status(500);
                res.send({ error: 'internal server error' });
            } else {
                // Ejecutamos una query para obtener la lista de mediciones por dispositivo ordenada por fecha de mayor a menor
                const queryMediciones = 'SELECT * FROM `Mediciones` WHERE dispositivoId =' + dispositivoId + ' ORDER BY fecha DESC';
                mediciones = dbConnection.query(queryMediciones, function (errorM, resultsMediciones) {
                    if (errorM) {
                        console.error('Error obteniendo datos:', JSON.stringify(errorM));
                        res.status(500);
                        res.send({ error: 'internal server error' });
                    } else {
                        if (resultsDispositivos.length > 0) {
                            let dispositivo = resultsDispositivos[0];
                            dispositivo.humedadActual = resultsMediciones[0].valor;
                            res.send(JSON.stringify(dispositivo)).status(200);
                        } else {
                            res.send(JSON.stringify({})).status(404);
                        }
                    }
                });
            }
        });
    } catch (error) {
        console.error('Ocurrió un error en la obtención de dispositivos', error);
        res.status(500);
        res.send({ error: 'internal server error' });
    }
});

module.exports = routerDispositivo;
