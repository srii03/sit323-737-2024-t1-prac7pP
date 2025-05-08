# Cloud-Native Application with MongoDB

This project demonstrates the creation of a cloud-native application using **Node.js** and **MongoDB**. The application is built with a microservice architecture and is containerized using **Docker**. It is also deployed using **Kubernetes** with **Minikube** for local development. The application exposes basic CRUD (Create, Read, Update, Delete) operations for managing items stored in the MongoDB database.

## Project Overview

This project involves creating a cloud-native application that interacts with a **MongoDB** database. The app exposes the following API endpoints for managing items:

- **Create an Item** (POST): Adds a new item to the database.
- **Get All Items** (GET): Retrieves all items stored in the database.
- **Delete an Item** (DELETE): Removes an item from the database by its unique ID.

## Features

- **Create Item (POST):** Adds a new item to the database by sending a JSON object with the item's `name` and `quantity`.
- **Get All Items (GET):** Retrieves all items from the database.
- **Delete Item (DELETE):** Removes an item from the database based on the provided item ID.

## Requirements

Before setting up and running the application, make sure you have the following installed:

- **Node.js** (version 14+)
- **MongoDB** (local or hosted, using a MongoDB URI)
- **Docker** (for containerization)
- **Kubernetes** (using **Minikube** for local development)

## Installation Instructions

### 1. Clone the Repository

Clone the repository to your local machine:


git clone https://github.com/srii03/sit323-737-2024-t1-prac7p.git
cd sit323-737-2024-t1-prac7p
2. Install Dependencies
Install the required dependencies by running the following command in the project directory:


npm install
3. Configuration
MongoDB Connection

The MongoDB connection URI is defined in the index.js file. If you're using MongoDB locally or on a cloud service like MongoDB Atlas, you can set the connection string in the following format:


const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:pass123@mongo-service:27017/?authSource=admin';
You can replace mongo-service with your MongoDB host URL or use an environment variable to securely store your connection string.

Running the Application
1. Locally (Without Docker or Kubernetes)
To run the application locally on your machine, simply use the following command:

node index.js
This will start the server on http://localhost:8080.

2. Using Minikube (With Kubernetes)
To deploy the application using Kubernetes with Minikube, follow the steps below:

Start Minikube:

minikube start
Apply Kubernetes Configurations:
Deploy the application on Kubernetes by applying the configuration files in the k8s/ directory:


kubectl apply -f k8s/
APP_DEPLOYMENT.yaml: Configures the deployment of the Node.js app.

MONGO_DEPLOYMENT.yaml: Configures the deployment of the MongoDB service.

MONGO_SECRET.yaml: Configures secrets for MongoDB authentication.

Access the Application:
After applying the Kubernetes configuration, you can access the app using Minikube:


minikube service prac7p-service
This will provide you with a URL, such as http://192.168.x.x:XXXX, to interact with the application.

API Endpoints
1. Create a New Item (POST)
URL: /items

Method: POST

Body: JSON object containing the name and quantity of the item.

Example Request:

{
  "name": "Emergency Lantern",
  "quantity": 3
}
Example Response:

{
  "_id": "60c72b9f9b1e8f001f1c1f8f",
  "name": "Emergency Lantern",
  "quantity": 3,
  "__v": 0
}
2. Get All Items (GET)
URL: /items

Method: GET

Example Response:

[
  {
    "_id": "60c72b9f9b1e8f001f1c1f8f",
    "name": "First Aid Kit",
    "quantity": 2,
    "__v": 0
  }
]
3. Delete an Item (DELETE)
URL: /items/{id}

Method: DELETE

URL Parameter: The id of the item to delete.

Example Request:

DELETE http://localhost:8080/items/60c72b9f9b1e8f001f1c1f8f
Example Response:
json

{
  "message": "Deleted"
}
Conclusion
This project successfully demonstrates how to create a cloud-native application with Node.js, MongoDB, Docker, and Kubernetes. The application implements basic CRUD operations and is designed to be containerized and deployed with Kubernetes. While the update functionality is not yet implemented, the core CRUD operations are fully functional.

Feel free to modify or extend the project to include additional features such as authentication, logging, or monitoring.

License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown


### Key Sections of the README:
- **Project Overview:** Describes the project and its functionality.
- **Features:** Lists the main CRUD operations that the application supports.
- **Requirements:** Lists the software dependencies needed to run the application.
- **Installation Instructions:** Provides a step-by-step guide for setting up the project on your local machine.
- **Configuration:** Explains the MongoDB connection setup.
- **Running the Application:** Instructions for running the app both locally and in Minikube (with Kubernetes).
- **API Endpoints:** Documents the available API endpoints with example requests and responses.
- **Conclusion:** A brief overview of the project’s achievements and potential improvements.
- **License:** The license section can be adapted depending on your project's license.
