# Task Management System

This project is a Task Management System built using NestJS for the backend and Next.js for the frontend. It utilizes a microservices architecture with Kafka for event-driven communication and Redis for caching. The backend services include a Task management service for handling task operations and a Notification service for real-time notifications via WebSockets.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Project Structure
```
project-root/
├── backend/
│ ├── task-management-app/
│ │ ├── apps/
│ │ │ ├── notification/
│ │ │ │ ├── src/
│ │ │ │ │ ├── main.ts
│ │ │ │ │ ├── notification.controller.ts
│ │ │ │ │ ├── notification.gateway.ts
│ │ │ │ │ ├── notification.module.ts
│ │ │ │ │ ├── notification.service.ts
│ │ │ ├── task-management/
│ │ │ │ ├── src/
│ │ │ │ │ ├── dto/
│ │ │ │ │ | ├── create-task.request.ts
│ │ │ │ │ ├── schemas/
│ │ │ │ │ | ├── task.schemas.ts
│ │ │ │ │ ├── main.ts
│ │ │ │ │ ├── task-management.controller.ts
│ │ │ │ │ ├── task-management.module.ts
│ │ │ │ │ ├── task-management.service.ts
│ │ │ │ │ ├── tasks.repository.ts
│ │ ├── libs/
│ │ │ ├── common/
│ │ │ │ ├── src/
│ │ │ │ | ├── database/
│ │ │ │ │ | ├── abstract.repository.ts
│ │ │ │ │ | ├── absract.schemas.ts
│ │ │ │ │ | ├── database.module.ts
│ │ │ │ │ ├── types/
│ │ │ │ │ | ├── EventTypes.ts
│ │ │ │ │ | ├── taskPriority.enum.ts
│ │ │ │ │ | ├── taskStatus.enum.ts
│ │ │ │ │ ├── index.ts
│ │ ├── ...
├── client/
│ ├── src/
│ │ ├── app/
│ │ │ │ ├── dashboard/
│ │ │ │ │ ├── [taskID]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── @modal/
│ │ │ │ │ | ├── (..dashboard)/
│ │ │ │ │ | | ├── [taskID]/
│ │ │ │ │ │ | | ├── page.tsx
│ │ │ │ │ ├── layout.tsx
│ │ │ │ │ ├── page.tsx
│ │ ├── components/
│ │ ├── lib/
│ │ ├── types/
│ │ ├── utils/
│ ├── package.json
├── docker-compose.yml
└── README.md
```
## Features

- **Next.js Frontend**: Provides a user interface for adding tasks and receiving realtime notifications.
- **Task Manager Microservice**: Handles task creation and management via HTTP requests.
- **Notification Microservice**: Receives Kafka events and sends real-time notifications via WebSockets.
- **Event-Driven Architecture**: Utilizes Kafka for reliable message passing between services.
- **Caching**: Uses Redis to cache task data for improved performance.
- **Dockerized Environment**: Uses Docker and Docker Compose for easy setup and management of services.

## Installation

### Prerequisites

- Docker
- Docker Compose
- Node.js
- npm or yarn

### Backend Setup

1.  **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd taskmanagement-system
    ```

2.  **Install Dependencies**:

    Navigate to the backend root directory of the project and install the dependencies:

    ```bash
    cd ./backend/task-managemet-app/
    npm install
    ```

4.  **Environment Variables**:

        Ensure that the environment variables are correctly set in a `.env` file, in the location .env.example is located. Here is an example of the required environment variables:

        ```plaintext
        MONGODB_URI=mongodb://root:password123@mongodb-primary:27017/
        PORT=3000
        REDIS_PASS=password
        REDIS_URI=redis://default:${REDIS_PASS}@redis:6379
    ```

3.  **Start Services with Docker Compose**:

    Use Docker Compose to start all the backend services:

    ```bash
    docker-compose up --build -V
    ```


### Frontend Setup

1. **Navigate to Client Directory**:

    ```bash
    cd client
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```
3. **Set up .env**;

    ```
    .env
        NEXT_PUBLIC_SERVER_ENDPOINT='http://localhost:3000/tasks'
    ```

3. **Run the Client**:

    ```bash
    npm run dev
    ```
4. **Docker Setup for Frontend**:

    Alternatively, you can run the frontend using Docker:
    ```bash
    docker build -t task-management-system .
    ```
4. **Run Docker Imgage**:

    ```bash
    docker run -p 4000:4000 task-management-system
    ```
    
## Usage

### Accessing the Application

- The backend services will be running on ports `3000` (Task Manager) and `3001` (Notification).
- The client application will be accessible at `http://localhost:4000`.

### Creating a Task

- Use the form in the client application to add a new task.
- The task will be processed by the Task Manager service, stored in MongoDB, and a Kafka event will be sent to the Notification service.
- Connected clients will receive a real-time updates via WebSockets.

### Viewing Tasks

- Tasks can be retrieved and viewed through the client application, leveraging the caching capabilities of Redis for improved performance.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Kafka**: A distributed streaming platform used for building real-time data pipelines and streaming applications.
- **Redis**: An in-memory data structure store, used as a database, cache, and message broker.
- **MongoDB**: A document-oriented NoSQL database.
- **Socket.io**: A library for real-time web applications to enable real-time, bidirectional, and event-based communication.
- **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.

