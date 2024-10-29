import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom"; 

export default function LandingPage() {
    const navigate = useNavigate();

    const handlePregame = () => {
        navigate("/games");
    }

    return (
        <div className="landing-page">
            <h1>Bienvenid@</h1>
            <p>Para ingresar a la sala de espera, haga click en el siguiente botón</p>
            <button onClick={handlePregame}>Ingresar a la sala de espera</button>
        </div>
    );
}