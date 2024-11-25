const express = require('express');

const routerMediciones = express.Router();

const { getDatabaseInstance } = require('../../mysql-connector');

routerMediciones.get('/:dispositivoId', function (req, res, next) {
    const dispositivoId = req.params.dispositivoId;
    try {
        // Reutilizamos la conexión
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener la lista de mediciones por dispositivo
        const query = 'SELECT * FROM `Mediciones` WHERE dispositivoId =' + dispositivoId + ' ORDER BY fecha DESC';
        mediciones = dbConnection.query(query, function (error, results) {
            if (error) {
                console.error('Error obteniendo datos:', JSON.stringify(error));
                res.status(500);
                res.send({ error: 'internal server error' });
            } else {
                res.send(JSON.stringify(results)).status(200);
            }
        });
    } catch (error) {
        console.error('Ocurrió un error en la obtención de mediciones', error);
        res.status(500);
        res.send({ error: 'internal server error' });
    }
});

routerMediciones.post('/', function (req, res, next) {
    const medicion = req.body
    try {
        // Reutilizamos la conexión
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos la query
        mediciones = dbConnection.query('INSERT INTO `Mediciones` SET ?', medicion, function (error) {
            if (error) {
                console.error('Error insertando datos:', JSON.stringify(medicion));
                res.status(500);
                res.send({ error: 'internal server error' });
            } else {
                console.log(`Medición ${JSON.stringify(medicion)} creada correctamente.`)
                res.send('').status(200);
            }
        });
    } catch (error) {
        console.error(`Ocurrió un error en la creación de la medición ${JSON.stringify(medicion)}`, error);
        res.status(500);
        res.send({ error: 'internal server error' });
    }
});

module.exports = routerMediciones;
