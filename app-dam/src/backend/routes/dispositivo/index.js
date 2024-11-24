const express = require('express')

const routerDispositivo = express.Router()

const { getDatabaseInstance } = require('../../mysql-connector');

routerDispositivo.get('/', function(req, res, next) {
    try {
        // Reutilizamos la conexión
        const dbInstance = getDatabaseInstance();
        const dbConnection = dbInstance.connection;

        // Ejecutamos una query para obtener la lista de dispositivos
        devices = dbConnection.query('SELECT * FROM `Dispositivos`', function (error, results) {
            if (error) throw error;
            res.send(JSON.stringify(results)).status(200);
        });
    } catch (error) {
        console.error('Ocurrió un error en la obtención de dispositivos', error);
        res.status(500);
        res.send({ error: "internal server error" });
    }
})

module.exports = routerDispositivo