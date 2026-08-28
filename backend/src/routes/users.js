import express from 'express';

import createUser from '../db/users.js';


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

export default router;
