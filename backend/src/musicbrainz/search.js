async function searchMusicBrainz(albumName) {
    const url = 'https://musicbrainz.org/ws/2/release-group?query=' + encodeURIComponent(albumName) + '&fmt=json';
    const resposta = await fetch(url, {
        headers: {
            'User-Agent' :'MusicBoxdTest/1.0 oizezocas@gmail.com'
        }
    });
    const dados = await resposta.json();
    //console.log('status:', resposta.status);
    //console.log('dados:', dados);
    if (!resposta.ok){
        throw new Error(dados.error);
    }
    const albuns = dados['release-groups'].filter((item) => item['primary-type'] === 'Album');
    const albunsLimpos = albuns.map(formatarAlbum);
    return albunsLimpos;
}


function formatarAlbum(item){
    return {
        mbid: item.id,
        titulo: item.title,
        artista: item['artist-credit'][0].name,
        data_lancamento: item['first-release-date'],
        album_cover_url: `https://coverartarchive.org/release-group/${item.id}/front-250`,
    };
}


export default searchMusicBrainz;
