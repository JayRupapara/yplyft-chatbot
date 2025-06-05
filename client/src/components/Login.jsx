import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/chat');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
}

export default Login;