# DevBuzz - Frontend

The frontend for DevBuzz is built using HTML, SCSS and Angular, a modern JavaScript framework for building dynamic web applications.

## Features

- **Home Page**: The home page provides links to different categories and showcases the top contributors, who are users with the most posts.

- **Authentication**: Users can login or register to access the full features of DevBuzz.

- **User Profile**: Users can view their profile, which includes their posts and user details. They can also view other users' profiles.

- **Post Management**: Users can create, edit, and delete their posts.

- **Feed**: The feed displays all posts in two sections: hottest and latest. Users can sort posts by category and search for specific content.

## Architecture

DevBuzz follows a modular architecture to organize its codebase effectively. Below is an overview of the architectural structure:

- **Core Module**: Holds all core logic, separated into components, services, interceptors, and guards. Each of these logical components resides in its respective folder within the core module.

- **Shared Module**: Contains shared components, pipes, animations and validators. Similar to the core module, these shared elements are organized into folders with corresponding names.

- **User Module**: A lazy-loaded module that handles user-related features such as authentication, profile viewing, and user management.

- **Post Module**: A lazy-loaded module that manages post-related functionalities including post creation, editing, deletion, post feed and comment creation and deletion.

- **Post Module and User Module**: These modules are feature modules that encapsulate the logic related to posts and users, respectively and their acrchitecture is as follows:

  - **Features Folder**: Contains "smart" components that manage the application's state and interact with services. These components typically represent higher-level functionalities and are responsible for coordinating data flow within the application.

  - **UI Folder**: Houses "dumb" components that are primarily concerned with presenting data and handling user interactions. These components receive data through inputs and emit events via outputs but do not manage state.

  - **Services Folder**: Contains services responsible for handling business logic and interacting with external APIs or data sources. Services facilitate data retrieval, manipulation, and communication between components.

- **A folder containing all types**.

## Author

**Dimitar Raychev**

- GitHub: [dimitarraychev](https://github.com/dimitarraychev)
- LinkedIn: [Dimitar Raychev](https://linkedin.com/in/dimitaraychev)
- Email: draytchev@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
