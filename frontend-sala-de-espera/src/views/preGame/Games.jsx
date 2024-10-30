import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../contexts/auth/AuthContext";
import { fetchGames, createPlayer, joinGame } from "../../api/sala-de-espera";
import ToastManager from "../../common/toasts/Toast";
import "./Games.css";

export default function Games() {
    const [games, setGames] = useState([]);
    const [toasts, setToasts] = useState([]);
    const { setPlayerId, userId } = useContext(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await fetchGames();
                setGames(data.games);
                addToast("Juegos cargados exitosamente!", "success");
            } catch (error) {
                console.error("Error loading games:", error);
                addToast("No hay juegos disponibles", "error");
            }
        };

        loadGames();
    }, []);

    const addToast = (message, type) => {
        setToasts((prevToasts) => [...prevToasts, { message, type }]);
    };

    const removeToast = (index) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const handleJoinGame = async (game) => {
        try {
            const playerResponse = await createPlayer(userId); 
            setPlayerId(playerResponse.id);            
            await joinGame({ identifier: game.identifier, playerId: playerResponse.id });
            navigate(`/pregame?identifier=${game.identifier}&title=${game.title}`); 

        } catch (error) {
            console.error("Error joining game:", error);
            addToast("Error al unirse al juego", "error");
        }
    };

    return (
        <div className="pregame">
            <h1>Salas de Espera</h1>
            <Link to="/create-game">
                <button>Crear Juego</button>
            </Link>
            <h2>Juegos Disponibles:</h2>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        {game.title}
                        <button onClick={() => handleJoinGame(game)}>Unirse</button>
                    </li>
                ))}
            </ul>
            <ToastManager toasts={toasts} removeToast={removeToast} />
        </div>
    );
}
