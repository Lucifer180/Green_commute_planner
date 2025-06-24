# Green Commute Planner

Green Commute Planner is a web application that encourages eco-friendly commuting habits by enabling users to plan green travel routes, participate in carpooling, and track their carbon footprint.

## Features

- User authentication with JWT
- Smart route planner for eco-friendly travel options
- Real-time carpooling with seat availability tracking
- Carbon footprint tracker
- Leaderboard system for rewarding sustainable commuters
- Responsive design for desktop and mobile
- Fuel-sharing and ride request features

## Technologies Used

### Frontend
- React.js
- Tailwind CSS (or your preferred CSS framework)

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Tools
- JWT for authentication
- RESTful APIs
- Git, GitHub

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
git clone https://github.com/Lucifer180/GreenCommutePlanner.git

2. Navigate to the project directory and install dependencies
# Frontend
cd GreenCommutePlanner/client
npm install

# Backend
cd ../server
npm install

3. Create a .env file in the server directory and add the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the development servers

bash
Copy
Edit
# Backend
npm run dev

# Frontend (in a new terminal)
cd ../client
npm start
