const baseUrl = 'http://localhost:3000';

// Muda estes dois valores para testares com outro álbum ou outro resultado da pesquisa
const nomeAlbum = 'Currents';
const indiceEscolhido = 0;

async function testarRaiz() {
    const resposta = await fetch(baseUrl + '/');
    const texto = await resposta.text();
    console.log('GET / ->', texto);
}

async function testarSearch(nome) {
    const resposta = await fetch(`${baseUrl}/search?album=${encodeURIComponent(nome)}`);
    const resultados = await resposta.json();

    if (!Array.isArray(resultados)) {
        console.log(`GET /search?album=${nome} -> falhou:`, resultados);
        return null;
    }

    console.log(`GET /search?album=${nome} -> ${resultados.length} resultado(s):`);
    resultados.forEach((item, indice) => {
        console.log(`  [${indice}] ${item.titulo} — ${item.artista} (${item.data_lancamento})`);
    });

    return resultados;
}

async function testarPostLog(album, rating, review) {
    const resposta = await fetch(`${baseUrl}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ album, rating, review })
    });
    const log = await resposta.json();
    console.log(`POST /logs (status ${resposta.status}) ->`, log);
    return log;
}

async function testarGetLogs() {
    const resposta = await fetch(`${baseUrl}/logs`);
    const logs = await resposta.json();
    console.log(`GET /logs -> ${logs.length} log(s)`);
    console.log(logs);
}

async function testarPostUsers(nome, email){
    const resposta = await fetch(`${baseUrl}/users`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    });
    const user = await resposta.json();
    console.log(`POST /users (status ${resposta.status}) ->`, user);
    return user;
}

async function testarGetUser(email) {
    const query = email !== undefined ? `?email=${encodeURIComponent(email)}` : '';
    const resposta = await fetch(`${baseUrl}/users${query}`);
    const resultado = await resposta.json();
    console.log(`GET /users${query} (status ${resposta.status}) ->`, resultado);
    return resultado;
}

async function correrTestes() {
    await testarRaiz();

    const resultados = await testarSearch(nomeAlbum);
    if (!resultados || resultados.length === 0) {
        console.log('Nenhum álbum encontrado, para aqui.');
        return;
    }

    const albumEscolhido = resultados[indiceEscolhido];
    if (!albumEscolhido) {
        console.log(`Não existe resultado no índice ${indiceEscolhido} (só há ${resultados.length}).`);
        return;
    }

    console.log(`A usar o resultado [${indiceEscolhido}]: ${albumEscolhido.titulo} — ${albumEscolhido.artista}`);
    await testarPostLog(albumEscolhido, 4, 'Teste automático via test-api.js');

    await testarPostUsers("maria", "maria@gmail.com");

    // Os 3 casos do GET /users: encontrado, não encontrado, parâmetro em falta
    await testarGetUser('maria@gmail.com');
    await testarGetUser('naoexiste@nada.com');
    await testarGetUser();

    await testarGetLogs();
}

correrTestes();
