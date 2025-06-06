### 1.00 INTRO - EXPRESS
- made a basic express server

### 1.01 BASIC ROUTING

- basic routing

### 1.02 Axios - Connect Backend & Frontend

### 1.03 PROJECT 1 - routing
- make a server
- added 5 routes
- home , contact , about , docs , login

### 1.04 Todo List Project (Minimalist Backend + Frontend)

## Project Goal
Build a secure, functional todo application using only Express, Axios, and .env files without additional dependencies.

## Core Features

### Backend (Express)
1. **Routes Setup**:
   - `GET /todos` - Retrieve all todo items
   - `POST /todos` - Add a new todo item (accepts JSON like `{ task: "Learn CORS" }`)
   - `DELETE /todos/:id` - Remove a todo by ID

2. **CORS Handling**:
   - Manually configure CORS headers to allow requests only from your frontend (e.g., `http://localhost:3000`)

3. **Environment Configuration**:
   - Use `.env` file to store:
     - Server port (e.g., `PORT=5000`)
     - API keys (if integrating external services)

### Frontend (HTML + JavaScript)
1. **User Interface**:
   - Input field for adding new todos
   - Button to fetch todos from backend
   - Display area for todo list with optional delete functionality

2. **API Communication**:
   - Use Axios or Fetch API to interact with backend routes
   - Handle responses and errors appropriately

### Optional Advanced Features
1. **Proxying with Axios**:
   - Create backend routes that use Axios to fetch data from external APIs
   - Example: `/weather` endpoint that proxies weather data

2. **IP Whitelisting**:
   - Implement IP-based restrictions for sensitive routes (e.g., write operations)
   - Only allow requests from trusted IP addresses

## Development Tools
- **Backend**:
  - Node.js with Express
  - Axios for external API calls
  - dotenv for environment variables

- **Frontend**:
  - Plain HTML/CSS/JavaScript (framework optional)
  - Axios or Fetch API for backend communication

- **Testing**:
  - Postman or curl for backend API testing
  - Browser developer tools for frontend debugging

## Learning Outcomes
1. Understand RESTful API design with Express
2. Implement secure frontend-backend communication
3. Manage application secrets with environment variables
4. Handle cross-origin requests properly
5. Optional: Work with external APIs through proxying

## Time Commitment
Estimated completion time: 1-2 hours for basic implementation

## Next Steps
Would you like detailed implementation guidelines for any specific component?



