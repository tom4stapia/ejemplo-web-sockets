import axios from 'axios';

export const fetchGames = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error; 
    }
};

export const createGame = async (title) => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games`, 
            { gameTitle: title },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error; 
    }
};

export const fetchPlayers = async (gameId) => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/players`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error; 
    }
};

export const createPlayer = async (user_id) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/create-player`, {
        user_id,
    }, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return response.data; 
};

export const joinGame = async ({ identifier, playerId }) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/games/join`, { identifier, playerId }, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return response.data; 
};