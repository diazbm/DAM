const express = require('express');

const routerLogRiegos = express.Router();

const { getDatabaseInstance } = require('../../mysql-connector');

routerLogRiegos.get('/', function (req, res, next) {
    try {
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener la lista de logs de riego
        logRiegos = dbConnection.query('SELECT * FROM `Log_Riegos` ORDER BY fecha DESC', function (error, results) {
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

routerLogRiegos.get('/:id', function (req, res, next) {
    const electroValvulaId = req.params.id
    try {
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener los logs de riego de una electrovalvula en particular
        const query = 'SELECT * FROM `Log_Riegos` WHERE electrovalvulaId =' + electroValvulaId + ' ORDER BY fecha DESC'
        logRiegos = dbConnection.query(query, function (error, results) {
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

routerLogRiegos.post('/', function (req, res, next) {
    const logRiego = req.body
    try {
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos la query
        logRiegos = dbConnection.query('INSERT INTO `Log_Riegos` SET ?', logRiego, function (error) {
            if (error) {
                console.error('Error insertando datos:', JSON.stringify(logRiego));
                res.status(500);
                res.send({ error: 'internal server error' });
            } else {
                console.log(`Log de riego ${JSON.stringify(logRiego)} creada correctamente.`);
                res.send('').status(200);
            }
        });
    } catch (error) {
        console.error(`Ocurrió un error en la creación de la medición ${JSON.stringify(medicion)}`, error);
        res.status(500);
        res.send({ error: 'internal server error' });
    }
});

module.exports = routerLogRiegos;
