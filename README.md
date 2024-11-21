# Traveller Buddy - A MERN Stack Travel Assistant

## Project Description

Traveller Buddy is a powerful travel companion application designed to enhance solo and group travel experiences. The platform provides two core functionalities: Buddy Matching and Real-Time Chat for connecting travelers and AI-Powered Itinerary Planning and Editing for creating personalized travel plans. Built with the MERN stack, Redis caching, and WebSocket support, Traveller Buddy demonstrates scalability, high performance, and modern web application architecture.

## Core Features

### 1. Social Matching & Real-Time Chat

Connect with like-minded travelers based on shared interests and preferences. The platform helps users find suitable travel companions and engage in seamless conversations.
	•	User Registration & Authentication:
	•	Secure user authentication using JWT.
	•	Users create profiles with interests, preferred destinations, and travel styles.
	•	Buddy Matching:
	•	Advanced matching algorithm recommends compatible users based on preferences and location.
	•	Provides a curated list of potential travel companions with a one-click option to initiate a chat.
	•	Real-Time Chat:
	•	Built with WebSocket for instant messaging.
	•	Chat history is stored in the database, allowing users to continue conversations even after logging out.

### 2. AI-Powered Itinerary Planning & Editing

Create and manage custom travel plans effortlessly using AI-generated itineraries. Tailor activities to suit your preferences and budget.
	•	AI-Generated Itineraries:
	•	Input travel destination, days, and budget.
	•	AI generates a daily plan with activities, accommodations, and transport suggestions.
	•	Editable Itineraries:
	•	Users can add, edit, or delete activities directly from their travel plans.
	•	Plans are saved and accessible for future updates.
	•	Future Scope:
	•	Collaborative editing: Invite friends to suggest or modify plans.
	•	Sharing: Generate unique links to share itineraries with others.

## Tech Stack

Category	Technology
Frontend	React, React Router
Backend	Node.js, Express.js
Database	MongoDB, Redis
Real-Time	WebSocket (Socket.IO)
AI Integration	OpenAI GPT-3.5 Turbo
Authentication	JWT (JSON Web Tokens)
Deployment	Heroku, GitHub

## Architecture Overview

	1.	Frontend:
	•	Built with React for modular, dynamic user experiences.
	•	Components handle buddy matching, chat, and itinerary editing.
	2.	Backend:
	•	Node.js and Express.js power secure and efficient API routes.
	•	Redis caching accelerates responses for itinerary generation.
	3.	Database:
	•	MongoDB stores user data, itineraries, and chat history.
	4.	Real-Time Communication:
	•	WebSocket enables low-latency chat and real-time updates.
	5.	AI Integration:
	•	OpenAI’s GPT-3.5 Turbo API generates personalized travel plans.

# Setup Instructions

## Prerequisites

	•	Node.js v16 or higher.
	•	MongoDB (local or Atlas).
	•	Redis (local or cloud-hosted).
	•	OpenAI API Key.

## Steps to Run Locally

	1.	Clone the repository:

git clone https://github.com/your-username/traveller-buddy.git
cd traveller-buddy


	2.	Install dependencies:

npm install


	3.	Set up environment variables:
	•	Create a .env file in the root directory with the following:

PORT=3000
MONGO_URI=your_mongodb_uri
REDIS_URI=your_redis_uri
OPENAI_API_KEY=your_openai_api_key


	4.	Start the backend server:

node server.js


	5.	Navigate to frontend/ (if separate frontend project):

cd frontend
npm install
npm start


## Buddy Matching

	•	Endpoint: POST /api/match
	•	Description: Returns a list of matching buddies based on user preferences.
	•	Request Body:

{
    "location": "New York",
    "interests": ["hiking", "museums"]
}


	•	Response:

[
    {
        "username": "JohnDoe",
        "location": "New York",
        "interests": ["hiking", "art"]
    }
]



## Itinerary Generation

	•	Endpoint: POST /api/itinerary/generate
	•	Description: AI-powered itinerary generation based on user input.
	•	Request Body:

{
    "destination": "New York",
    "days": 3,
    "budget": 1000
}


	•	Response:

{
    "destination": "New York",
    "days": 3,
    "budget": 1000,
    "activities": [
        { "day": 1, "activity": "Visit Central Park", "cost": 50 },
        { "day": 1, "activity": "Dinner at Times Square", "cost": 40 }
    ]
}


