# RESTful API for Course Project

## Overview

The primary purpose of this API is to serve as the backend for the frontend application developed as part of the course project at SoftUni. It acts as the communication bridge between the client-side application and the database, facilitating user registration, authentication, and other necessary functionalities.

This API is designed to support the course project requirements and provide a reliable backend service for the frontend application. It enables seamless interaction with the database, handles user authentication securely using JWT, and ensures smooth integration with the frontend components developed during the course.

By serving as the backend infrastructure, this API contributes to the overall functionality and success of the course project, providing a robust foundation for handling user-related operations and data management.

## Endpoints

- POST /register: Register a new user, authenticate and receive a JWT token.

- POST /login: Authenticate and receive a JWT token.

- GET /logout: Logout the authenticated user.

## Authentication Process

The authentication process involves user registration and login using bcrypt for password hashing and JWT for secure token generation. During user registration, the password is hashed with bcrypt, and a new user is created. Subsequently, during login, the user's credentials are verified, and if valid, a JWT token is generated containing user information. This token is utilized for secure and stateless user authentication throughout the application.

**Key Components:**
- **bcrypt:** Used for secure password hashing.
- **JWT (JSON Web Token):** Utilized for generating and validating authentication tokens.
- **User Model:** Represents user data and handles user creation and retrieval.

For specific API endpoints and detailed responses, refer to the [Endpoints](#endpoints) section.

## Error Handling

Error handling is implemented to ensure robustness in the authentication process. If an error occurs during user registration or login, appropriate error messages are returned to the client. This helps provide meaningful feedback and aids in identifying issues, such as invalid credentials or registration failures.

**Key Components:**
- **Try-Catch Blocks:** Used to capture and handle errors during user registration and login processes.
- **Consistent Responses:** Error responses include a structured JSON format with an "ok" flag, a descriptive message, and optional error details.

For specific error responses and scenarios, refer to the [Endpoints](#endpoints) section.

## Technologies Used

- Node.js
- Express.js
- MongoDB 
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser

## Author

**Dimitar Raychev**

- GitHub: [dimitarraychev](https://github.com/dimitarraychev)
- LinkedIn: [Dimitar Raychev](https://linkedin.com/in/dimitaraychev)
- Email: draytchev@gmail.com

## License

This project is licensed under the MIT License.