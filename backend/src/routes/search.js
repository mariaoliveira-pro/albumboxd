import express from 'express';

import searchMusicBrainz from '../musicbrainz/search.js';

const router = express.Router();

router.get('/search', async (req, res) => {
    const album = req.query.album;
    if (!album) {
        return res.status(400).json({ erro: 'Falta o parâmetro album.' });
    }
    try {
        const resultados = await searchMusicBrainz(album);
        return res.json(resultados);
    } catch (error) {
        res.status(500).json({ erro: 'A conexão ao servidor falhou.' })
        console.error(error)
    }
});

export default router;
