# complaint_management_system-using-node.js
Node.js+Express+MongoDB+PostmanAPI

# Smart City Complaint Management System

This project is a web-based application designed to help residents of a smart city report and manage complaints regarding infrastructure issues such as potholes, broken streetlights, water leaks, etc. It uses modern technologies like Node.js, Express, and MongoDB to efficiently handle and prioritize complaints.

---

## Features
- File complaints about various issues.
- Automatically prioritize complaints based on severity.
- View all complaints sorted by priority and creation date.
- Find the shortest path between locations for efficient issue resolution.
- Queue unresolved complaints for resolution.
- Manage complaints via REST APIs using Postman.

---

## Prerequisites
1. **Node.js** (version 18 or later): Ensure Node.js is installed on your system. [Download Node.js](https://nodejs.org/)
2. **MongoDB**: A MongoDB instance is required (local or cloud).
   - You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based MongoDB database.
3. **Postman**: For testing the REST APIs. [Download Postman](https://www.postman.com/downloads/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository_url>
cd smart-city-complaint-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the `.env` File
Create a `.env` file in the project root directory with the following content:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
PORT=5000
```
- Replace `<username>` and `<password>` with your MongoDB credentials.
- If using a local MongoDB instance, use: `MONGO_URI=mongodb://localhost:27017/smart-city`

### 4. Run the Project
To start the server, use:
```bash
npm start
```
- The server will run at `http://localhost:5000` by default.
- You should see the following messages in your terminal:
  ```
  Server running on port 5000
  MongoDB connected...
  ```

---

## Using the APIs with Postman

### Base URL
- Local: `http://localhost:5000`

### Endpoints
1. **File a Complaint** (POST `/api/complaints/file`)
   - **Request Body**:
     ```json
     {
       "category": "Pothole",
       "location": "Surathkal",
       "description": "Large pothole in the road",
       "priority": 2
     }
     ```

2. **Get All Complaints** (GET `/api/complaints/`)
   - **Response**: Returns all complaints sorted by priority.

3. **Resolve a Complaint** (PUT `/api/complaints/resolve/:id`)
   - Replace `:id` with the complaint's ID.

4. **Find Shortest Path** (GET `/api/complaints/shortest-path`)
   - **Query Parameters**:
     ```
     ?from=Mangalore&to=Surathkal
     ```

5. **Sort Complaints by Priority** (GET `/api/complaints/sorted-complaints`)
   - **Response**: Returns complaints sorted by priority using a binary tree.

6. **Add to Queue** (POST `/api/complaints/queue/add`)
   - **Request Body**:
     ```json
     {
       "category": "Water Leak",
       "location": "Lalbagh",
       "description": "Pipe burst near market",
       "priority": 1
     }
     ```

7. **Resolve Next in Queue** (PUT `/api/complaints/queue/resolve`)

---

## Folder Structure
```
smart-city-complaint-system/
├── controllers/
│   └── complaintController.js    # Complaint management logic
├── utils/
│   ├── locationGraph.js          # Graph-related logic
│   ├── priorityTree.js           # Binary tree for priority
│   └── complaintQueue.js         # Queue for unresolved complaints
├── routes/
│   └── complaints.js             # Routes for complaints
├── models/
│   └── Complaint.js              # Complaint schema
├── config/
│   └── db.js                     # Database connection
├── server.js                     # Main app entry
└── .env                          # Environment variables
```

---

## Stopping the Server
- Press `Ctrl + C` in the terminal where the server is running.

---

## Troubleshooting
1. **MongoDB Connection Error**:
   - Ensure the `MONGO_URI` in your `.env` file is correct.
   - Check if your MongoDB instance is running.

2. **Port Already in Use**:
   - Edit the `PORT` value in the `.env` file to a different port (e.g., `PORT=3000`).

3. **API Testing Issues**:
   - Double-check the base URL and endpoints in Postman.
   - Ensure the server is running.

---



