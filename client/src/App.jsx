import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter import
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;