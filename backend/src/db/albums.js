import database from './connection.js';

function searchAlbum(album){
    const pesquisa = database.prepare("SELECT * FROM album WHERE mbid = ?");

    const temp = pesquisa.get(album.mbid);

    if (!temp){
        // colocar o album na database
        const inserir = database.prepare('INSERT INTO album (mbid, titulo, artista, data_lancamento, album_cover_url) VALUES (?, ?, ?, ?, ?)');
        const resultado = inserir.run(album.mbid, album.titulo, album.artista, album.data_lancamento, album.album_cover_url);
        console.log(resultado.lastInsertRowid);
        const albumInserido = pesquisa.get(album.mbid);
        return albumInserido;
    } else {
        return temp;
    }
}

export default searchAlbum;
