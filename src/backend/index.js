//=======[ Settings, Imports & Data ]==========================================

const PORT = 3000;

const cors = require('cors');

const express = require('express');
const app = express();
const { getDatabaseInstance } = require('./mysql-connector');
const routerDispositivos = require('./routes/dispositivo');
const routerMediciones = require('./routes/mediciones');
const routerLogRiegos = require('./routes/log_riegos');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions));

// Iniciar la conexión unos segundos después para evitar error al levantar con docker compose.
setTimeout(() => {
    try {
        const dbInstance = getDatabaseInstance();
        dbInstance.connect();
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}, 5000); // 5000 ms = 5 segundos

app.use('/dispositivos', routerDispositivos);
app.use('/mediciones', routerMediciones);
app.use('/log_riegos', routerLogRiegos);

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'DAM server activo'}).status(200);
});

app.listen(PORT, function (req, res) {
    console.log(`NodeJS API running correctly in port ${PORT}`);
});

//=======[ End of file ]=======================================================
