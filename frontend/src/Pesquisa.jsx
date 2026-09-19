import { useContext, useState } from 'react';
import { UserContext } from './UserContext.jsx';
import { Link } from 'react-router-dom';

function Pesquisa() {
    const [nomeAlbum, setAlbum] = useState(''); //isto é o que a pessoa escreve ao pesquisar
    const [albuns, setAlbuns] = useState([]); //lista de resultados que o backend devolve, com titulo artista, mbid
    const [albumEscolhido, setAlbumEscolhido] = useState(null);
    const { user } = useContext(UserContext);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    async function aoProcurar(evento) {
        evento.preventDefault();

        const resposta = await fetch(`http://localhost:3000/search?album=${encodeURIComponent(nomeAlbum)}`);
        const resultado = await resposta.json();

        if (!resposta.ok) {
            return;
        }

        setAlbuns(resultado);

        alert('album bem buscado')
        console.log(resultado);
    }

    async function aoAvaliar(evento) {
        evento.preventDefault();

        const ratingNumero = Number(rating);
        const manoBro = user.user_id;

        const resposta = await fetch(`http://localhost:3000/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ album: albumEscolhido, rating: ratingNumero, review, user_id: manoBro })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert('Não deu certo');
            return;
        }
    }

    return (
        <form onSubmit={aoProcurar}>
            <input value={nomeAlbum} onChange={(e) => setAlbum(e.target.value)} />
            <button type="submit">Pesquisar</button>
            <ul>
                {albuns.map((album) => (
                    <li key={album.mbid}>
                        {album.titulo} — {album.artista}
                        <img src={album.album_cover_url} width="80" />
                        <button type="button" onClick={() => setAlbumEscolhido(album)}>Escolher</button>
                    </li>
                ))}
            </ul>

            {albumEscolhido && (
                <div>
                    <p>Escolhido: {albumEscolhido.titulo} — {albumEscolhido.artista}</p>

                    {user ? (
                        <>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <p>Apenas valores de 1 a 5, por favor</p>

                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <button type="button" onClick={aoAvaliar}>Avaliar</button>
                        </>
                    ) : (
                        <p>
                            Precisas de iniciar sessão para avaliar. <Link to="/login">Iniciar sessão</Link>
                        </p>
                    )}
                </div>
            )}
        </form>

    );
}

export default Pesquisa;
