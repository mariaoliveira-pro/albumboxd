import express from 'express';

import {createUser, getUser} from '../db/users.js';


const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const nome = req.body.nome;
        const email = req.body.email;

        const newUser = createUser(nome, email);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar user' })
    }
})

router.get('/users', async (req, res) => {
    const email = req.query.email
    if (!email){
        return res.status(400).json({ erro: 'Falta o parâmetro email.' });
    }
    try {
        const user = getUser(email)
        return res.json(user);
    } catch (error) {
        res.status(404).json({ erro: 'Erro ao fazer o pedido' })
    }
})

export default router;
