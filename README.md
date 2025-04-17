# Rewards Redemption App

A web application for redeeming rewards with points. This app includes:

- View current reward points balance
- Browse available rewards
- Redeem rewards using points
- View redemption history

## Technology Stack

- **Backend**: Ruby on Rails 8.0.2 with SQLite database
- **Frontend**: React

## Setup

### Prerequisites

- Ruby 3.4.3
- Node.js and npm

### Backend Setup

1. Install dependencies:
   ```
   bundle install
   ```

2. Set up the database:
   ```
   rails db:create
   rails db:migrate
   rails db:seed
   ```

3. Start the Rails server:
   ```
   rails server -p 3000
   ```

### Frontend Setup

1. Install dependencies:
   ```
   cd client
   npm install
   ```

2. Start the React development server:
   ```
   npm start
   ```
   This will start the frontend on port 3001 and proxy API requests to the Rails server on port 3000.

## Features

### API Endpoints

- **GET /api/v1/users/:id/points_balance** - Get user's current points balance
- **GET /api/v1/rewards** - Get list of available rewards
- **GET /api/v1/rewards/:id** - Get details for a specific reward
- **POST /api/v1/users/:id/redemptions** - Redeem a reward
- **GET /api/v1/users/:id/redemptions/history** - Get user's redemption history

### User Interface

- **Dashboard**: Shows points balance, recent rewards, and recent redemptions
- **Rewards List**: Displays all available rewards
- **Reward Detail**: Shows detailed information about a reward and allows redemption
- **Redemption History**: Shows all past redemptions

## Demo Users

The seed data includes the following test users:

- John Smith (5000 points)
- Jane Doe (2500 points)
- Bob Johnson (7500 points)

For demo purposes, the app uses John Smith's account (ID: 1).

## Development Notes

- For a real production app, proper authentication would be implemented
- Points deduction happens automatically when redeeming a reward
- Rewards can be marked as unavailable
