import express from 'express';
import cors from 'cors';

import logsRouter from './routes/logs.js';
import searchRouter from './routes/search.js';
import userRouter from './routes/users.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use(searchRouter);
app.use(logsRouter);
app.use(userRouter);


const porta = 3000;

app.get('/', (req, res) => {
    res.send('Olá, musicboxd!');
});

app.listen(porta, () => {
    console.log(`Servidor a correr em http://localhost:${porta}`);
});


