async function searchMusicBrainz(albumName) {
    const url = 'https://musicbrainz.org/ws/2/release-group?query=' + encodeURIComponent(albumName) + '&fmt=json';
    const resposta = await fetch(url, {
        headers: {
            'User-Agent' :'MusicBoxdTest/1.0 oizezocas@gmail.com'
        }
    });
    const dados = await resposta.json();
    const dadosFiltrados = dados['release-groups'].filter((item) => item['primary-type'] === 'Album')
    console.log(dadosFiltrados);
}

searchMusicBrainz("Lonerism")

function formatarAlbum(item){
    return {
        mbid: item.id,
        titulo: item.title,
    };
}
