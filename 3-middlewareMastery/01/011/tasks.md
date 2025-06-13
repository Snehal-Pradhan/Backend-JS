# Project: The "Request Observer"

## Objective
Develop a small Express.js application that logs basic information about every incoming HTTP request.

---

## Core Expectation

### ✅ Application Setup
- A functional Express.js server should be listening on a specified port.

### ✅ Base Endpoint
- At least one working HTTP GET endpoint (e.g., `/status`) must be implemented.
- The endpoint should respond with a simple success message like `"OK"` to confirm the server is operational.

### ✅ Request Logging Middleware
- Implement middleware that logs the following for **every incoming request**:
  - Exact **timestamp** when the request was received.
  - HTTP **method** used (GET, POST, PUT, etc.).
  - Full **URL path** of the request.

### ✅ Flow Control
- The logging middleware must execute **before** any route handler.
- After logging, the request should continue to the correct route handler or middleware.

---

## Desired Output (Console)

When making a `GET /status` request, the server console should log something like:

[2025-06-13T09:45:00.000Z] Incoming Request: GET /status


## Goal

Demonstrate that you can effectively observe and log the request lifecycle at the earliest possible stage.

**Good luck! 🚀**