// src/components/CreateGame.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../api/sala-de-espera";
import ToastManager from "../../common/toasts/Toast";
import "./CreateGame.css";

export default function CreateGame() {
    const [title, setTitle] = useState("");
    const [toasts, setToasts] = useState([]);
    const navigate = useNavigate();

    const addToast = (message, type) => {
        setToasts((prevToasts) => [...prevToasts, { message, type }]);
    };

    const removeToast = (index) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createGame(title);
            addToast("Juego creado exitosamente!", "success");
            navigate("/games");
            setTitle("");
        } catch (error) {
            console.error("Error creating game:", error);
            addToast("Error al crear el juego.", "error");
        }
    };

    return (
        <div className="create-game-container">
            <h1>Crear Juego</h1>
            <form onSubmit={handleSubmit} className="create-game-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título del juego"
                    className="game-input"
                    required
                />
                <button type="submit" className="create-button">
                    Crear
                </button>
            </form>
            <ToastManager toasts={toasts} removeToast={removeToast} />
        </div>
    );
}
