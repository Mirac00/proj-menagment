require('dotenv').config();
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3000;

const tokenSecret = process.env.TOKEN_SECRET as string;
let refreshToken: string;

app.use(cors());
app.use(express.json());

// Przykładowi użytkownicy
const users = [
  { id: '1', login: 'admin', password: 'admin', firstName: 'Jan', lastName: 'Kowalski', role: 'admin' },
  { id: '2', login: 'dev', password: 'dev', firstName: 'Adam', lastName: 'Nowak', role: 'developer' }
];

app.get('/', (req, res) => {
  res.send('Hello World - simple api with JWT!');
});

app.post('/token', (req, res) => {
  const { login, password } = req.body;

  const user = users.find(u => u.login === login && u.password === password);

  if (!user) {
    return res.status(401).send('Invalid login or password');
  }

  const expTime = 3600; // 1 godzina
  const token = generateToken(user, expTime);
  refreshToken = generateToken(user, 60 * 60); // Zapisanie refreshToken
  res.status(200).send({ token, refreshToken, user });
});

app.post('/refreshToken', (req, res) => {
  const { refreshToken: refreshTokenFromPost } = req.body;
  if (refreshToken !== refreshTokenFromPost) {
    return res.status(400).send('Bad refresh token!');
  }
  const expTime = 3600; // 1 godzina
  const token = generateToken(users[0], expTime); // Użycie pierwszego użytkownika jako przykładu
  refreshToken = generateToken(users[0], 60 * 60);
  setTimeout(() => {
    res.status(200).send({ token, refreshToken });
  }, 3000);
});

app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
  const id = req.params.id;
  const delay = req.params.delay ? +req.params.delay : 1000;
  setTimeout(() => {
    res.status(200).send(`{"message": "protected endpoint ${id}"}`);
  }, delay);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function generateToken(user: any, expirationInSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign({ exp, user }, tokenSecret, { algorithm: 'HS256' });
  return token;
}

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, tokenSecret, (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err.message);
    }
    req.user = decoded.user;
    next();
  });
}
