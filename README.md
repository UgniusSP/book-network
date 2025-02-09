# Book Network

## Description

Book Network is a full-stack web application that allows users to explore, review, and exchange books within a community. Built using Spring Boot for the backend, React for the frontend, PostgreSQL for data storage, and Docker for easy deployment.

## Features

* User authentication and authorization

* Book catalog with details

* Review and rating system

* Book reservation and exchange

* Responsive UI with React

* RESTful API with Spring Boot

* PostgreSQL database integration

* Dockerized for containerized deployment

## Technologies Used

* Backend: Spring Boot, Spring Security, JPA/Hibernate

* Frontend: React, Tailwind CSS

* Database: PostgreSQL

* Containerization: Docker

## Prerequisites

* Java 17+

* Node.js 16+

* Maven 3.6+

* Docker

* PostgreSQL (If you have docker, you may not need it)

## Getting Started

1. Clone the repository:

    ```bash
    https://github.com/UgniusSP/book-network.git
    cd book-network
    ```

2. Set up environment variables

   * Create a .env file in the root directory and add the following:

    ```bash
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_HOST=localhost
    POSTGRES_DB=coursework
    ```

    * Make sure to replace all these fields instead with your credentials
    
3. Configure PostgreSQL
    
   * Create a new database with name `fashion`.
   * Leave the default settings as it is, Spring Boot will create the needed tables.

4. Build and run your application
   
    ```bash
    mvn spring-boot:run
    cd frontend
    npm install
    npm start
    ```

Point: If you don't have PostgreSQL locally and have Docker installed to your machine, there is `docker-compose.yaml` file configured in project, you just have to run the following command: `docker compose up` and database should setup automatically.

## License

This project is licensed under the MIT License.


