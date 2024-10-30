import axios from 'axios';

export async function login(email, password) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al intentar iniciar sesión.'); 
    }
}


export async function signup(username, email, password) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw new Error('Error al intentar registrarse.');
    }
}


export async function logout(setToken) {
    localStorage.removeItem('token');
    setToken(null);
}
