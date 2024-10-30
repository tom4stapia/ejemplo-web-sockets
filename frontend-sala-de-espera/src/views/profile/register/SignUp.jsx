import React, { useState } from 'react';
import { signup } from '../../../api/profile'; 
import ToastManager from '../../../common/toasts/Toast'; 
import './SignUp.css'; 

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    setToasts((prevToasts) => [...prevToasts, { message, type }]);
  };

  const removeToast = (index) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(username, email, password);
      addToast("Registro exitoso! Ahora puedes volver y loguearte", "success");
    } catch (error) {
      console.error('Ocurrió un error:', error);
      addToast("Hubo un error con el Registro, por favor trata nuevamente.", "error");
    }
  };

  return (
    <div className="Login">
      <ToastManager toasts={toasts} removeToast={removeToast} />
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Registrarse</h1>
        <label>
          Username:
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-link">
          <a href="/login">Iniciar Sesión</a>
        </div>
        
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default Signup;
