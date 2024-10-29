import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
    const navLinks = [
        { name: "Home", url: "/" },
        { name: "Partidas", url: "/games" },
    ];

    const { token, logout } = useContext(AuthContext);
    const isLoggedIn = token && token !== "null" && token !== ""; 

    const handleLogout = () => {    
        logout();
        window.location.href = "/";
    }

    const handleLogin = () => {
        window.location.href = "/login";
    }
    

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <h1>Ayudantía</h1>
                </div>
                <ul className="navbar-links">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    ))}
                </ul>
                {isLoggedIn ? (
                        <button className="navbar-button" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    ) : (
                        
                        <button className="navbar-button" onClick={handleLogin}>
                            Iniciar Sesión
                        </button>
                    )}
            </nav>
        </div>
    );
}
