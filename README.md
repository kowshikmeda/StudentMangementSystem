
# 📝 README.md

## Educational ERP/CRM Backend API

This project is a simple Student Management System backend, developed as a one-day assignment for Quorium Consulting. It provides REST API endpoints for managing student data using an in-memory data store.

---

## 🚀 Setup and Run Instructions

### Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### Steps to Run
1. **Clone the Repository** (if applicable) or navigate to the project directory.
2. **Install Dependencies**: Open your terminal in the project folder and run the following command to install the required packages (express and axios):
    ```bash
    npm install
    ```
3. **Run the Server**: Start the application with this command:
    ```bash
    node index.js
    ```
    The server will now be running on `http://localhost:3000`. You will see a confirmation message in your terminal.

---

## 🗺️ API Endpoints

The following endpoints are available:

| Method | Endpoint             | Description                                              |
|--------|-----------------------|----------------------------------------------------------|
| GET    | `/students`          | Retrieves a list of all students.                        |
| GET    | `/students/:id`      | Retrieves details for a specific student using their ID. |
| POST   | `/students`          | Adds a new student record to the system.                 |
| GET    | `/dashboard/stats`   | Provides statistical data such as total students, gender, and BMI stats. |

---

## 📋 API Testing Examples

You can test these endpoints using a tool like **Postman** or `curl`.

### 1. GET `/students`
Returns a list of all student objects.

**Response Example**:
```json
[
 {
    "studentId": 1,
    "firstName": "Michael",
    "lastName": "Williams",
    "email": "michael.williams@x.dummyjson.com",
    "phone": "+49 258-627-6644",
    "age": 35,
    "gender": "male",
    "bloodgrp": "B+",
    "height": 186.22,
    "weight": 76.32,
    "bmi": "22.01",
    "image": "https://dummyjson.com/icon/michaelw/128",
    "university": "Ohio State University",
    "profession": "Support Specialist",
    "address": {
        "address": "385 Fifth Street",
        "city": "Houston",
        "state": "Alabama",
        "stateCode": "AL",
        "postalCode": "38807",
        "coordinates": {
            "lat": 22.815468,
            "lng": 115.608581
        },
        "country": "United States"
    },
    "role": "admin"
}
  // ... more students
]
```

---
### 2. GET `/students/:id`
Retrieves a single student's details using a specific `studentId`.

**Example Request**:
```bash
GET http://localhost:3000/students/2
```

**Example Response**:
```json
{
    "studentId": 2,
    "firstName": "Michael",
    "lastName": "Williams",
    "email": "michael.williams@x.dummyjson.com",
    "phone": "+49 258-627-6644",
    "age": 35,
    "gender": "male",
    "bloodgrp": "B+",
    "height": 186.22,
    "weight": 76.32,
    "bmi": "22.01",
    "image": "https://dummyjson.com/icon/michaelw/128",
    "university": "Ohio State University",
    "profession": "Support Specialist",
    "address": {
        "address": "385 Fifth Street",
        "city": "Houston",
        "state": "Alabama",
        "stateCode": "AL",
        "postalCode": "38807",
        "coordinates": {
            "lat": 22.815468,
            "lng": 115.608581
        },
        "country": "United States"
    },
    "role": "admin"
}
```

### 3. POST `/students`
Adds a new student.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "gender": "male",
  "height": 180,
  "weight": 75,
  
}
```

**Response Example**:
Returns the newly created student object, including the generated `studentId` and `bmi`.

---

### 4. GET `/dashboard/stats`
Returns a summary of student statistics.

**Response Example**:
```json
{
  "totalStudents": 100,
  "genderDistribution": {
     "boys": 55,
     "girls": 45
  },
 "bloodGroupDistribution": {
        "O-": 6,
        "B+": 5,
        "AB+": 4,
        "AB-": 7,
        "A-": 2,
        "B-": 2,
        "A+": 1,
        "O+": 3
    },
    "bmiStats": {
        "averageBMI": 22.4,
        "averageHeight": 178.98,
        "averageWeight": 70.73
    }
}
```
