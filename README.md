# Rewards Redemption App

A web application for redeeming rewards with points. This app includes:

- View user profile with points balance
- Browse available rewards
- Redeem rewards using points
- View redemption history

## Technology Stack

- **Backend**: Ruby on Rails 8.0.2 with SQLite database
- **Frontend**: React with Vite
- **Testing**: RSpec, Factory Bot, Shoulda Matchers

## Setup

### Prerequisites

- Ruby 3.4.3
- Node.js v.18 and npm

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

2. Start the development server:
   ```
   npm run dev
   ```
   This will start the frontend on port 5173 and proxy API requests to the Rails server on port 3000.

## Features

### API Endpoints

- **GET /api/v1/users/:id** - Get user profile with points balance
- **GET /api/v1/rewards** - Get list of available rewards
- **GET /api/v1/rewards/:id** - Get details for a specific reward
- **POST /api/v1/users/:user_id/redemptions** - Redeem a reward
- **GET /api/v1/users/:user_id/redemptions** - Get user's redemption history

### User Interface

- **Dashboard**: Shows points balance, recent rewards, and recent redemptions
- **Rewards List**: Displays all available rewards
- **Reward Detail**: Shows detailed information about a reward and allows redemption
- **Redemption History**: Shows all past redemptions

## Development Notes

- The app uses a fixed user ID for demonstration purposes
- Points deduction happens in the controller when redeeming a reward
- Rewards can be marked as unavailable
- API responses are formatted using Jbuilder templates
- The project uses RSpec for testing with Factory Bot for test data
