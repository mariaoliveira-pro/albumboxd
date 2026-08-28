import searchMusicBrainz from './musicbrainz/search.js';
import searchAlbum from './db/albums.js';
import createLog from './db/logs.js';

async function testar() {
    // 1. Pesquisar no MusicBrainz — devolve uma lista de álbuns já formatados (com mbid, titulo, artista...)
    const resultados = await searchMusicBrainz('Lonerism');
    const albumEscolhido = resultados[0];

    // 2. Garantir que existe na BD local, e obter o album_id (não o mbid!)
    const albumNaBD = searchAlbum(albumEscolhido);
    console.log('Álbum na BD:', albumNaBD);

    // 3. Criar o log, usando albumNaBD.album_id — o número local, vindo do passo anterior
    const log = createLog(1, albumNaBD.album_id, 5, 'Álbum incrível.');
    console.log('Log criado:', log);
}

testar();
