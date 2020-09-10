import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp({
  credential:admin.credential.cert('generarClave.json'),
  databaseURL: ''
});

const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

app.post('/register', (req, res) => {
  const body = req.body;
  res.json({ body });
});

export const api = functions.https.onRequest( app );