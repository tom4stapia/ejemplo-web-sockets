// src/components/WaitingRoom.js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPlayers } from "../../api/sala-de-espera";
import ToastManager from "../../common/toasts/Toast";
import "./WaitingRoom.css"; 

export default function WaitingRoom() {
    const [players, setPlayers] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get("identifier");
    const gameTitle = searchParams.get("title");

    useEffect(() => {
        const fetchPlayerData = async () => {
            if (gameId) {
                try {
                    const data = await fetchPlayers(gameId);
                    setPlayers(data.players);
                } catch (error) {
                    console.error("Error fetching player data:", error);
                    addToast("No se pudieron cargar los jugadores", "error");
                }
            }
        };

        fetchPlayerData();
    }, [gameId]);

    const addToast = (message, type) => {
        setToasts((prevToasts) => [...prevToasts, { message, type }]);
    };

    const removeToast = (index) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    return (
        <div className="waiting-room">
            <h1>Sala de Espera</h1>
            <h2>Unido al juego: {gameTitle}</h2>
            <h2>Jugadores en la partida:</h2>
            <ul className="player-list">
                {players.map(player => (
                    <li key={player.id} className="player-item">{player.name}</li>
                ))}
            </ul>
            <button>
                Comenzar Juego
            </button>
            <ToastManager toasts={toasts} removeToast={removeToast} />
        </div>
    );
}
