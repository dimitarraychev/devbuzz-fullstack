# DevBuzz - Backend

The backend for DevBuzz is built using Node.js, Express, MongoDB and Mongoose and its primary purpose it to act as the communication bridge between the client-side application and the database, facilitating user registration, authentication, and various CRUD operations with posts and comments.

By serving as the backend infrastructure, this API contributes to the overall functionality and success of the course project, providing a robust foundation for handling user-related operations and data management.

## Endpoints

**Auth**

-   **POST** _/auth/register_: Register a new user, authenticate and receive a JWT token and the user's information.

-   **POST** _/auth/login_: Authenticate and receive a JWT token and the user's information.

-   **GET** _/auth/authenticate_: Check the user's JWT token validty and expiry and return data for the user if logged in.

-   **GET** _/auth/logout_: Logout the authenticated user.

**Users**

-   **GET** _/users/:id_: Return data for the user's profile.

-   **GET** _/users/top_: Return data for the top three users sorted by most posts.

**Posts**

-   **GET** _/posts_: Get the latest 6 posts the total pages and the current page. Support queries for pagination, sorting by category and searching by title.

-   **POST** _/posts_: Create a new post and return the data for it. User authentication via JWT in the request headers is required.

-   **GET** _/posts/hottest_: Get the hottest 3 posts sorted by most likes. Supports query for sorting by category.

-   **GET** _/posts/:id_: Return information about a specific post with the provided post ID.

-   **PATCH** _/posts/:id_: Edit the posts with the specified post ID, returning the whole post after update. User authentication via JWT in the request headers is required and the ID should match the owner's ID.

-   **DELETE** _/posts/:id_: Delete the post with the provided post ID, all related comments and the reference from the owner. User authentication via JWT in the request headers is required and the ID should match the owner's ID.

-   **POST** _/posts/:id/like_: Add the user's ID to the post's array with likes, returning the whole post after update. User authentication via JWT in the request headers is required.

-   **POST** _/posts/:id/unlike_: Remove the user's ID from the post's array with likes, returning the whole post after update. User authentication via JWT in the request headers is required.

**Comments**

-   **POST** _/comments_: Create a new comment and attaches it the corresponding post, returning the whole post after update. User authentication via JWT in the request headers is required.

-   **DELETE** _/comments/:id_: Delete the comment with the provided comment ID and the reference from the post, returning the whole post after update. User authentication via JWT in the request headers is required and the ID should match the owner's ID.

## Authentication Process

The authentication process involves user registration and login using bcrypt for password hashing and JWT for secure token generation. During user registration, the password is hashed with bcrypt, and a new user is created. Subsequently, during login, the user's credentials are verified, and if valid, a JWT token is generated containing user information. This token is utilized for secure and stateless user authentication throughout the application.

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcrypt
-   cookie-parser

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your machine:

-   **Node.js**: DevBuzz requires Node.js to run both the frontend and backend servers. You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

-   **MongoDB**: DevBuzz uses MongoDB as its database system. You can download and install MongoDB Community Server from https://www.mongodb.com/try/download/community.

## Getting Started

To run the server locally, follow these steps:

1. **Navigate to the server directory**:
    ```sh
    cd devbuzz-fullstack/server
    ```
2. **Install server dependencies**:
    ```sh
    npm install
    ```
3. **Start the server**:
    ```sh
    npm start
    ```

## Author

**Dimitar Raychev**

-   GitHub: [dimitarraychev](https://github.com/dimitarraychev)
-   LinkedIn: [Dimitar Raychev](https://linkedin.com/in/dimitaraychev)
-   Email: draytchev@gmail.com

## License

This project is licensed under the MIT License.
