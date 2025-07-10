# Panga Task Manager
Panga is a swahili word for plan. This is a new age project and task amanagement web based application made with java springboot for the backend and React with tailwind CSS for the frontend

## Frontend

The frontend of Panga Task Manager is built using **React** for building user interfaces and **Tailwind CSS** for utility-first styling. The project is structured as a modern single-page application, ensuring a responsive and interactive user experience.

### Getting Started

To run the frontend locally, follow these steps:

1. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, in the `frontend` directory, run:
   ```
   npm install
   ```

2. **Start the Development Server**

   After installing dependencies, start the app with:
   ```
   npm run dev
   ```

   This will launch the development server, and you can view the app in your browser at [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal).

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Vite**: Fast build tool and development server for modern web projects.


## Backend
The backend of Panga Task Manager is built with **Java Spring Boot**, providing a robust and scalable RESTful API for managing tasks and projects.

### Getting Started

To run the backend locally, follow these steps:

1. **Navigate to the Backend Directory**

   Open your terminal and change to the backend project directory:
   ```
   cd backend
   ```

2. **Install Dependencies**

   Make sure you have [Java 17+](https://adoptopenjdk.net/) and [Maven](https://maven.apache.org/) installed. Then, install the project dependencies:
   ```
   mvn clean install
   ```

3. **Start the Application**

   You can start the backend server with:
   ```
   mvn spring-boot:run
   ```
   The API will be available at [http://localhost:5700](http://localhost:5700) by default.

4. **Build the Application**

   To build a production-ready JAR file, run:
   ```
   mvn clean package
   ```
   The generated JAR file will be located in the `target` directory and can be run with:
   ```
   java -jar target/<your-jar-file>.jar
   ```

### Technologies Used

- **Java Spring Boot**: Backend framework for building RESTful APIs.
- **Maven**: Dependency management and build tool.
- **POSTGRES**: The main database.

For further configuration or environment variables, refer to the `application.properties` file in the backend source.
