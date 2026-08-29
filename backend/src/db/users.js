import database from "./connection.js";

function createUser(nome, email){
    const inserir = database.prepare('INSERT INTO users (nome, email) VALUES (?, ?)');

    if (email === undefined || email === null){
        throw new Error('email é obrigatório');
    }

    if (nome === undefined || nome === null){
        throw new Error('nome é obrigatório');
    }

    const resultado = inserir.run(nome, email);

    console.log(resultado.lastInsertRowid);

    const pesquisar = database.prepare('SELECT * FROM users WHERE user_id = ?');
    const newUser = pesquisar.get(resultado.lastInsertRowid);

    return newUser;
}


function getUser(email){
    const pesquisar = database.prepare(`SELECT * FROM users where email = ?`);

    if (email === undefined || email === null){
        throw new Error('email é obrigatório');
    }

    const user = pesquisar.get(email);

    if (!user){
        throw new Error("este email não está registado")
    }

    return user;
}

export {createUser, getUser}
