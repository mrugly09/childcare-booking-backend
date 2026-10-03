# Childcare Booking App - Backend API

A RESTful backend API built with Node.js, Express, and MongoDB for Capstone Project #86. Connects parents with caregivers and manages booking requests securely with Role-Based Access Control (RBAC).

## Features & Rubric Alignment
- **Authentication & Security:** Passwords hashed with `bcryptjs`, JWT token issuance, protected routes, and input validation.
- **Role-Based Access Control (RBAC):** `PARENT` users create bookings; `CAREGIVER` users update booking statuses.
- **Filtered Data Access:** Users only retrieve bookings relevant to their specific role and account ID.
- **Consistent API Responses:** Standardized JSON formatting (`success`, `message`, `data`) across all endpoints.
- **Error Handling:** Centralized Express error handler catches validation errors and invalid ObjectIDs.
- **CORS Enabled:** Configured for cross-origin integration with a frontend app.

---

## Environment Setup

Create a `.env` file in the root directory:



API Endpoints1. Authentication (/api/auth)MethodEndpointDescriptionAuth RequiredRequest BodyPOST/api/auth/registerRegister a new userNone{ name, email, password, role }POST/api/auth/loginAuthenticate user & get JWTNone{ email, password }

2. Bookings (/api/bookings)MethodEndpointDescriptionAuth RequiredRole AllowedRequest Body / ParamsPOST/api/bookingsCreate a new booking requestBearer TokenPARENT{ caregiverId, childName, date, notes }GET/api/bookingsFetch filtered user bookingsBearer TokenPARENT / CAREGIVERNonePATCH/api/bookings/:id/statusUpdate booking statusBearer TokenCAREGIVER{ status }

API Response Structure
Success Response (200 OK / 201 Created)

{
  "success": true,
  "message": "Operation description",
  "data": {}
}

Error Response (400 Bad Request / 401 Unauthorized / 403 Forbidden / 500 Server Error)
JSON

{
  "success": false,
  "message": "Error description"
}

Getting Started
1. Clone the repository

2. Install dependencies:

npm install

3. Start the development server:

npm run dev