🏛️ Hall Booking System

A full-stack web application built as part of the Ascentech internship evaluation exercise.
The system allows users to manage hall bookings with complete CRUD functionality using a React frontend, Node.js backend, and PostgreSQL database.

🚀 Tech Stack
Frontend

React (Vite)

Axios

Backend

Node.js

Express.js

Sequelize ORM

Database

PostgreSQL

📌 Features

View all hall bookings in a tabular format

Add a new hall booking

Edit existing booking details

Delete a booking

All database operations performed using ORM (Sequelize)

No hardcoded credentials or configuration values

🧱 Project Structure
hall-booking/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── index.html
│
└── README.md

🗄️ Database Setup (PostgreSQL)

Create a PostgreSQL database named:

hallbooking

🔐 Environment Variables

Create a .env file outside the project directory with the following values:

DB_NAME=hallbooking
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=5000


✅ No credentials or server details are hardcoded in the source code.

⚙️ Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Start the backend server:

node server.js


Server will run on:

http://localhost:5000

🎨 Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm run dev


Frontend will run on:

http://localhost:5173

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/bookings	Create new booking
GET	/api/bookings	Fetch all bookings
PUT	/api/bookings/:id	Update booking
DELETE	/api/bookings/:id	Delete booking
🧪 Application Flow

Landing page displays all bookings in a table

Add New Booking opens a form to create a booking

Each row has an Edit button

Edit opens a pre-filled form

Users can update or delete the booking

UI updates immediately after operations

🎥 Loom Video Walkthrough

📌 Project Explanation Video:
👉 

The Loom video covers:

Project overview and architecture

Database schema and ORM usage

Backend API implementation

Frontend workflow and validation

Environment variable handling and security decisions

✅ Notes

All CRUD operations are handled using Sequelize ORM

Environment variables are used for secure configuration

UI is intentionally kept simple to focus on functionality

👨‍💻 Author

Vineet Shinde
