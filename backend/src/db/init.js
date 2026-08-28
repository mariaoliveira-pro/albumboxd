import database from "./connection.js";

database.exec(`
    CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
    ) STRICT;

    CREATE TABLE IF NOT EXISTS album(
        album_id INTEGER PRIMARY KEY,
        mbid TEXT NOT NULL UNIQUE,
        titulo TEXT NOT NULL,
        artista TEXT NOT NULL,
        data_lancamento TEXT,
        album_cover_url TEXT
    ) STRICT;

    CREATE TABLE IF NOT EXISTS log(
        log_id INTEGER PRIMARY KEY,
        user_id INT,
        album_id INT,
        data TEXT NOT NULL,
        review TEXT,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (album_id) REFERENCES album(album_id)
    ) STRICT;
`);


const select = database.prepare('SELECT * FROM users WHERE email = ?');

const teste = select.get('teste@gmail.com');

if (!teste){
    const insert = database.prepare('INSERT INTO users (nome, email) VALUES (?,?)');
    insert.run('teste', 'teste@gmail.com');
    console.log('Utilizador de teste criado.');
} else {
    console.log('Utilizador de teste já existia');
}

//cria as tabelas e um user de teste
