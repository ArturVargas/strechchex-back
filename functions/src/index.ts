import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
const serviceAccount = require("./strechAppKey.json");

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL: 'https://strech-app.firebaseio.com'
});

const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World..!!' });
});

app.get('/test-exercises', async (req, res) => {
  const exeList = await db.collection('exercices').doc('testExercises');
  const list = (await exeList.get()).data();
  res.json({ list });
});

app.get('/strech-profile', (req, res) => {
  res.json({ exercises: 'Recibe si el día es par o impar, regresa los ejercicios del dia' });
});

app.post('/calendar', (req, res) => {
  const params = req.body;
  // crea el evento o recordatorio en google calendar del usuario.
  // envia la notificacion
  res.json({ params });
});

app.post('/profile', (req, res) => {
  const params = req.body;
  res.json({ message: `Recibe Areas a trabajar, setea fecha de comienzo del reto, setea bandera en false (challenge finished) ${params}` });
});

app.post('/register', (req, res) => {
  const params = req.body;
  // recibe nombre de usuario, uid, fecha de creacion.
  res.json({ params });
});

export const api = functions.https.onRequest( app );