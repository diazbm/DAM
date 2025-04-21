//=======[ Settings, Imports & Data ]==========================================

const PORT = 3000;

const cors = require('cors');

const express = require('express');
const app = express();
const { getDatabaseInstance } = require('./mysql-connector');
const routerDispositivos = require('./routes/dispositivo');
const routerMediciones = require('./routes/mediciones');
const routerLogRiegos = require('./routes/log_riegos');
const mqtt = require('mqtt'); // Importar MQTT

//=======[ MQTT Settings ]=====================================================
const MQTT_BROKER_URL = 'mqtts://a2p4ghqfma1oc5-ats.iot.us-east-1.amazonaws.com:8883';
const MQTT_TOPIC = 'sdk/test/js';

// Certificados para la conexión MQTT (extraídos de app_main.c)
const AWS_ROOT_CA_PEM = `-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----`;

const CLIENT_CERT_PEM = `-----BEGIN CERTIFICATE-----
MIIDWTCCAkGgAwIBAgIUUSB629aW1DmMLUEWjtfprLW1LzUwDQYJKoZIhvcNAQEL
BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g
SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTI1MDQwNzAxNDE0
N1oXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0
ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOEBbFS2neWbE6vTMnKO
UbEqPID9T1yvWVDiQq8Uch7eZUdoGbBKTOxzaup5JwoZNASLv0CwgFyJtIjAkoqx
xSxxJ9Ddv+B3V/sk7z/rz8zfzpP71+sIuYXpVXBndppb+C8ANuqrpDp5APMDeasy
IeYDbzz5DJvLBOMpfXYHn+TsxvEkcfRevhCSgV4TjNhH9klrZM0JbsJHZLEfzxcG
vExRSJuwQXTqks+J42gn1MiciW6P0zFFvIgEyHRKsIc4OroOiJwO7Fdtizb4y+Z1
HBeuhpjN37rke+HEfIkAti5Q00scxltlhHn6c1hho0ms4iXroO44vR2NM3Ot/lXW
QhkCAwEAAaNgMF4wHwYDVR0jBBgwFoAUZt967TWDWEzWORgrtheZSYqQC0IwHQYD
VR0OBBYEFKdULlLWlR/nN93qkjwx9Vhi6xyOMAwGA1UdEwEB/wQCMAAwDgYDVR0P
AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQBu0lYcyjw9q2CUW3LuF5geXBaS
FlSfHl5iDi5lryl9muWcTaPRkTdlCgI5ZwTPPELGvKokW8hl60x4SGSTNbnwQAaJ
weHuWFvnca8hNcORPPzJp9EuU4O3OB7CoLT3hb2equk+42AWPv6m21JV0N7OvK2j
15qos2NslLnvIUMFLZ2ilSifsSeO1VVo+O1DPvKs2Ah1+fuom+0MkWddGm9pZo8/
JR0wOhbc5FdeYXJj/jyJxXm3VlvrXRHK0dgOJ8VVZqgY3LYLOK+UObRG3cu3CbLR
q7z9fiNVJT0inlEye87Sn0GQW02IBfPKkw92bi21qlA9WcXTw8+S4g0VB+1p
-----END CERTIFICATE-----`;

const CLIENT_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA4QFsVLad5ZsTq9Myco5RsSo8gP1PXK9ZUOJCrxRyHt5lR2gZ
sEpM7HNq6nknChk0BIu/QLCAXIm0iMCSirHFLHEn0N2/4HdX+yTvP+vPzN/Ok/vX
6wi5helVcGd2mlv4LwA26qukOnkA8wN5qzIh5gNvPPkMm8sE4yl9dgef5OzG8SRx
9F6+EJKBXhOM2Ef2SWtkzQluwkdksR/PFwa8TFFIm7BBdOqSz4njaCfUyJyJbo/T
MUW8iATIdEqwhzg6ug6InA7sV22LNvjL5nUcF66GmM3fuuR74cR8iQC2LlDTSxzG
W2WEefpzWGGjSaziJeug7ji9HY0zc63+VdZCGQIDAQABAoIBABjcOGTvvGhnBvhg
IF3J3brOaNrzofYipaKrLST9BFLmzZfjJ5tzyiYB5pk7g5W5DSdHbX0vQy92Q40s
gcRzOc7cPcL1DUM2zHDCNvEAE/iV7dQp6kRctWrXSgpeVBtf9/7xbh/lkQKo5fLz
uliw9E/ep0a8WalI+CRFLEiDNSZs0dE7AAeeFj9Udw69QNJEQ5cIRNgAdfdbdzCg
fU1VuWiGiO+ibhY9YBa5BYOal70LStWQiAIUQCFlixVCN+WUn0nmSH4VLbrf3Y2S
AvfsgxfNejYzAD7ytVwPzoAmtSS1d+WASOR4i0W7g6eFwEKgHwyh8WK7TlBVwtxL
drUqJwECgYEA8FF1TYsxhHHNk9ifCWiLdON+w+8MVOGq4XMsLPbAH7+CTJiKH+qF
Uy809Y/ocEWnOsQyn5tk+t3FiCMKDArydLT0+RK4zusqFlKCPrY7kobfTfVHo7qT
wlI2ucIMbkmrLpiU9Gb0HYkIIPHMCw5K8Q9rkmuIuTDPlj2+8+1VnPkCgYEA77Aq
acoUF86LAP6ISr7JD7A+cUVRfiX/GKVNrtwcp7aQWxLnbCZToWmihfOtwaW+5sOz
O8QctbpPNuKDLHcFkyl+lteEJxurj0lhJKXv9vDGqj5MM80EmKdyhKlI34NChicE
LrKZFCG+MjEUPb9Gls1IKTbmJBwc2fuNbXLUtiECgYAWURo5l0GD8SWMI0OxlfnN
Ywr0mxBkGYjK4u0pR8jTqe8pucip6hdzgCDE5RZKxs0e0fV5iO65tTqQx+A4+hNF
70AImUp8PK5t4D+kHzwtAUVfcfWzKLJsC0J1waVx4Hl7HERI5f6pd34/wPSX2j3v
YOU2dbH+sJ+2bgl7kYCv0QKBgQCIOSgxzb7TtPh9jSvqxznAZ9tlRw9E0dWErVZU
PhcvHmw2xqyuY63+O+o5lT+4ojm4L5trKU9j3UpuGBiTKeYKOHgQxNX/4BMGMZ87
U+/o+fj/Ar8OZcPp+qj0Sr33AkPJuN0AqVKlBXRyVEB7w30b8fnEKsZr2WpwXS6I
+M154QKBgGL7kfyLppsxXHlwvz/ZYP4MTPJ2J5ENCTAVw3ADoVcvnnDftlvTbW1Y
5Dc41YSxzUEty9rc4xeIPYzn9pyb6xS+1iv3dmlVdlIKQq9nZROHz0hny2CxFgsI
Hu+ct7Q4jkUTfKUh5FGKfHYSyzPgyrwxrAR6yShMBb698kbLysZA
-----END RSA PRIVATE KEY-----`;

// Opciones de conexión MQTT con certificados
const MQTT_OPTIONS = {
  clientId: 'sdk-nodejs-v2', // ID de cliente específico que funciona con AWS IoT
  protocol: 'mqtts',
  port: 8883,
  // Opciones de TLS con los certificados
  cert: CLIENT_CERT_PEM,
  key: CLIENT_KEY_PEM,
  ca: AWS_ROOT_CA_PEM,
  rejectUnauthorized: true // Ahora sí validamos el certificado del servidor
};
//=============================================================================

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

//=======[ MQTT Connection ]===================================================
console.log(`Intentando conectar al broker MQTT de AWS IoT: ${MQTT_BROKER_URL}`);
console.log(`Con ID de cliente: ${MQTT_OPTIONS.clientId}`);

try {
  // Crear el cliente con las opciones que incluyen los certificados
  const client = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

  client.on('connect', () => {
    console.log('✅ Conectado exitosamente al broker MQTT de AWS IoT!');
    client.subscribe(MQTT_TOPIC, (err) => {
      if (!err) {
        console.log(`✅ Suscrito al tópico: ${MQTT_TOPIC}`);
        // Publicar un mensaje de prueba
        client.publish(MQTT_TOPIC, JSON.stringify({
          message: 'Conexión de backend establecida',
          timestamp: new Date().toISOString()
        }));
      } else {
        console.error(`❌ Error al suscribirse al tópico ${MQTT_TOPIC}:`, err);
      }
    });
  });

  client.on('message', (topic, message) => {
    // message es un Buffer, convertirlo a string
    console.log(`📩 Mensaje recibido en [${topic}]: ${message.toString()}`);
    // Aquí puedes añadir lógica para procesar el mensaje (e.g., parsear JSON, guardar en DB)
    try {
        const data = JSON.parse(message.toString());
        console.log('   Datos parseados:', data);
        
        // Si el mensaje contiene temperatura y humedad, podemos procesarlo
        if (data.temperatura !== undefined && data.humedad !== undefined) {
            console.log(`   🌡️ Temperatura: ${data.temperatura}°C, 💧 Humedad: ${data.humedad}%`);
            
            // Aquí podrías agregar código para guardar los datos en la base de datos
            // Por ejemplo:
            /*
            const dbInstance = getDatabaseInstance();
            const sql = `INSERT INTO mediciones (fecha, valor, tipo, dispositivoId) 
                         VALUES (NOW(), ?, ?, ?)`;
            dbInstance.query(sql, [data.temperatura, 'temperatura', 1], (err, result) => {
                if (err) {
                    console.error('Error guardando temperatura en DB:', err);
                } else {
                    console.log('Temperatura guardada en DB, ID:', result.insertId);
                }
            });
            
            dbInstance.query(sql, [data.humedad, 'humedad', 1], (err, result) => {
                if (err) {
                    console.error('Error guardando humedad en DB:', err);
                } else {
                    console.log('Humedad guardada en DB, ID:', result.insertId);
                }
            });
            */
        }
    } catch (e) {
        console.error('   Error al parsear JSON del mensaje:', e);
    }
  });

  client.on('error', (err) => {
    console.error('❌ Error de conexión MQTT:', err);
  });

  client.on('close', () => {
    console.log('🔌 Conexión MQTT cerrada.');
  });

  client.on('offline', () => {
    console.log('⚠️ Cliente MQTT desconectado (offline).');
  });

  client.on('reconnect', () => {
    console.log('🔄 Intentando reconectar al broker MQTT...');
  });

} catch (error) {
    console.error('❌ Error al inicializar el cliente MQTT:', error);
}
//=============================================================================

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'DAM server activo'}).status(200);
});

app.listen(PORT, function (req, res) {
    console.log(`NodeJS API running correctly in port ${PORT}`);
});

//=======[ End of file ]=======================================================
