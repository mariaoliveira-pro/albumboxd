import express from 'express';

import {createLog, getLogsByUser} from '../db/logs.js';
import searchAlbum from '../db/albums.js';

const router = express.Router();

router.post('/logs', async (req, res) => {
    try {
        const album = req.body.album;
        const rating = req.body.rating;
        const review = req.body.review;
        const albumNaBD = searchAlbum(album);
        const user_id = 1;

        const log = createLog(user_id, albumNaBD.album_id, rating, review);
        res.status(201).json(log)

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao postar log' })
    }

})

router.get('/logs', async (req, res) => {
    try {
        const user_id = 1;
        const userLogs = getLogsByUser(user_id);
        return res.json(userLogs);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer o pedido' })
    }
})

export default router;
