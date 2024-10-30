import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import ToastManager from '../../../common/toasts/Toast';
import { login } from '../../../api/profile';
import { SocketContext } from '../../../contexts/sockets/SocketContext';
import './Login.css';

function Login() {
  const { setToken, setUserId } = useContext(AuthContext);
  const { connectSocket } = useContext(SocketContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toasts, setToasts] = useState([]); 

  const addToast = (message, type) => {
    setToasts([...toasts, { message, type }]);
  };

  const removeToast = (index) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await login(email, password); 
        setToken(response.access_token);
        setUserId(response.user_id);
        connectSocket(response.user_id);
        addToast("Login exitoso!", "success");
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        addToast("Hubo un error con el Login, por favor intenta nuevamente.", "error");
    }
};

  return (
    <div className="Login">
      <ToastManager toasts={toasts} removeToast={removeToast} />

      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar Sesión</h1>
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
        <a href="/signup">Registrarse</a>
        </div>
        
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default Login;
