const dialogflow = require('@google-cloud/dialogflow'); // Importa la librería de Dialogflow
const { text } = require('body-parser');
const { v4 : uuidv4 } = require('uuid'); // Importa uuidv4 para generar IDs únicos

module.exports = async (req, res) => {
  try {
    const { message } = req.body;
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    const dialogflow = require('@google-cloud/dialogflow');
    const uuid = require('uuid');

    const sessionClient = new dialogflow.SessionsClient({ credentials });
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'es',
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.status(200).json({ reply: result.fulfillmentText });

  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: 'Error al comunicarse con Dialogflow', detail: error.message });
  }
};
