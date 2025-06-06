# Uplyft E-commerce Chatbot

A full-stack e-commerce chatbot application that provides intelligent product recommendations and customer support through natural language conversations.

## 🚀 Project Overview

Uplyft E-commerce Chatbot is an AI-powered shopping assistant that helps users discover products, get recommendations, and receive customer support through natural conversations. The application features a modern, responsive user interface and a robust backend system.

### Key Features

- Natural language product search and recommendations
- Real-time chat interface
- Product catalog browsing
- Customer support assistance
- Responsive design for all devices

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- TypeScript

### Backend
- Python 3.x
- Flask
- SQLAlchemy
- PostgreSQL
- OpenAI API (for chat functionality)

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.x
- PostgreSQL
- Git

## 🚀 Getting Started

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/uplyft-chatbot.git
cd uplyft-chatbot
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
flask db upgrade
```

5. Start the backend server:
```bash
flask run
```

## 📝 Project Structure

```
uplyft-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── migrations/
│   └── requirements.txt
└── README.md
```

## 🔍 Sample Queries

The chatbot can handle various types of queries, including:

1. Product Search:
   - "Find me a red dress under $50"
   - "Show me the latest smartphones"

2. Recommendations:
   - "What are the best-selling items in electronics?"
   - "Recommend some summer outfits"

3. Customer Support:
   - "How do I track my order?"
   - "What's your return policy?"

## 🎯 Key Learnings

- Implementation of real-time chat interfaces
- Integration of AI-powered natural language processing
- Building responsive and accessible user interfaces
- Handling complex state management in React
- Implementing secure API endpoints
- Database design and optimization
