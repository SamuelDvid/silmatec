//Librerias
const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

//Cargar la clave
const keyPath = path.join(__dirname, 'key.json');
// const sessionClient = new dialogflow.SessionsClient({keyFilename:keyPath});
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const sessionClient = new dialogflow.SessionsClient({
  credentials
});

const projectId = require('./key.json').project_id

//Ruta para procesar mensajes 
app.post('/send-message', async(req, res) => {
    const message = req.body.message;
    console.log("Mensaje recibido:", message); // <-- Esto
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'es', // o 'en-US' si tu agente está en inglés
      },
    },
  };



    try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log('Respuesta de Dialogflow:', JSON.stringify(result, null, 2));
    res.send({ reply: result.fulfillmentText });
    } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send({ error: 'Error al comunicarse con Dialogflow' });
    }


    })

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});