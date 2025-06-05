import { useState } from 'react';
import axios from 'axios';

function Chat({ token }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [timestamp] = useState(new Date().toLocaleString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { sender: 'user', text: message, timestamp: new Date().toLocaleString() };
    setChatHistory([...chatHistory, newMessage]);

    try {
      const response = await axios.post(
        'http://localhost:5000/chat/',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const botMessage = {
        sender: 'bot',
        text: response.data.response,
        timestamp: new Date().toLocaleString(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: 'Error: Could not process your request.',
        timestamp: new Date().toLocaleString(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setMessage('');
  };

  const resetChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
      <p className="text-sm text-gray-500 mb-4">Session started: {timestamp}</p>
      <div className="h-96 overflow-y-auto border p-4 mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
            }`}
          >
            <p className="font-bold">{msg.sender === 'user' ? 'You' : 'Bot'}</p>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500">{msg.timestamp}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="e.g., show me books under 1000"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
          Send
        </button>
      </form>
      <button
        onClick={resetChat}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Reset Chat
      </button>
    </div>
  );
}

export default Chat;