import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import { UserContext } from './UserContext.jsx';
import Login from './Login.jsx';
import Pesquisa from './Pesquisa.jsx';

function Inicio() {
    return <h1>Página inicial</h1>;
}


function Atividade() {
    return <h1>Atividade</h1>;
}


function App() {
    const [user, setUser] = useState(null);
    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <nav>
                    <Link to="/atividade">Atividade</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/pesquisa">Pesquisa</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/atividade" element={<Atividade />} />
                    <Route path="/pesquisa" element={<Pesquisa />} />
                </Routes>

            </UserContext.Provider >
        </>
    );
}

export default App;
