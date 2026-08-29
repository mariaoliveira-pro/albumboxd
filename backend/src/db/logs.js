import database from "./connection.js";

function createLog(userId, albumID, rating, review){
    const data = new Date().toISOString();

    const inserir = database.prepare('INSERT INTO log (user_id, album_id, data, review, rating) VALUES (?, ?, ?, ?, ?)');

    if (rating === undefined || rating === null) {
        throw new Error('rating é obrigatório');
    }

    const resultado = inserir.run(userId, albumID, data, review ?? null, rating);

    console.log(resultado.lastInsertRowid);

    const pesquisar = database.prepare('SELECT * FROM log WHERE log_id = ?');
    const newLog = pesquisar.get(resultado.lastInsertRowid);

    return newLog;

}

function getLogsByUser(userID){

    const pesquisar = database.prepare(`SELECT l.* , a.titulo, a.artista, a.album_cover_url
                                        FROM log l JOIN album a ON (l.album_id = a.album_id)
                                        WHERE l.data = (
                                            SELECT MAX(l2.data)
                                            FROM log l2
                                            WHERE l2.user_id = l.user_id AND l2.album_id = l.album_id
                                            ) AND l.user_id = ?
                                        ORDER BY l.data DESC`
                                    )

    const resultado = pesquisar.all(userID);

    return resultado;
}


export {createLog, getLogsByUser};

