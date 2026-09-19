import { useContext, useState } from 'react';
import { UserContext } from './UserContext.jsx'


function Login() {
    const [email, setEmail] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [mostrarRegisto, setMostrarRegisto] = useState(false);
    const [nome, setNome] = useState('');
    const [loginFalhou, setLoginFalhou] = useState(false);
    const [emailRegisto, setEmailRegisto] = useState('');

    async function aoSubmeter(evento) {
        evento.preventDefault();

        const resposta = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
        const resultado = await resposta.json();

        if (!resposta.ok) {
            setLoginFalhou(true);
            return;
        }

        setUser(resultado);

        alert('Login bem-sucedido');

    }

    async function aoRegistar(evento) {
        evento.preventDefault();
        const resposta = await fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email: emailRegisto })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert('opa nao deu');
            return;
        }

        setUser(resultado);
    }

    return (
        <div>
            {user ? (
                <p>Sessão iniciada como: {user.nome}</p>
            ) : mostrarRegisto ? (
                <form onSubmit={aoRegistar}>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                    <input value={emailRegisto} onChange={(e) => setEmailRegisto(e.target.value)} placeholder="Email" />
                    <button type="submit">Registar</button>
                </form>
            ) : (
                <form onSubmit={aoSubmeter}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Entrar</button>
                    <button type="button" onClick={() => setMostrarRegisto(true)}>Criar conta</button>
                    {loginFalhou && (
                        <p>
                            Utilizador não encontrado.
                        </p>
                    )}
                </form>
            )}

        </div>
    );
}

export default Login;
