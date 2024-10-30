import { Routes, Route } from 'react-router-dom';
import LandingPage from '../views/landingPage/LandingPage';
import Login from '../views/profile/login/Login';
import Signup from '../views/profile/register/SignUp';
import Games from '../views/preGame/Games';
import CreateGame from '../views/preGame/CreateGame';
import WaitingRoom from '../views/preGame/WaitingRoom'; 

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/games" element={<Games />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/pregame" element={<WaitingRoom />} />
        </Routes>
    );
}
