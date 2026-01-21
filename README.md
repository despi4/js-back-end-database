# Backend Authentication & Profile API (PostgreSQL + MongoDB)

This project is a backend application built with **Node.js** and **Express** that demonstrates server-side authentication, authorization, and profile management using **PostgreSQL** and **MongoDB** (mixed databases).

All business logic, validation, and data handling are implemented on the **server side**.
The **client side** (HTML/CSS/JS) is only responsible for sending requests, receiving responses, and displaying data.

---

## Features

* User registration (`POST /register`)
* User login (`POST /login`)
* JWT-based authentication
* Protected profile route (`GET /profile`)
* Profile update (`PUT /profile`)
* Password hashing with bcrypt
* PostgreSQL for users data
* MongoDB for profile data
* Middleware-based validation and authorization
* Centralized error handling
* Simple frontend pages (HTML/CSS/JS)

---

## Technologies

* Node.js
* Express.js
* PostgreSQL
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcrypt
* dotenv
* HTML, CSS, Vanilla JavaScript

---

## Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middlewares/
 ├── models/
 ├── config/
 ├── public/        # Frontend HTML/CSS
 ├── app.js
 └── server.js
```

---

## How to Run the Project

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create `.env` file

Create a `.env` file in the root folder and add: database configuration

### 3. Start PostgreSQL and MongoDB

Make sure both databases are running:

```bash
sudo systemctl start postgresql
sudo systemctl start mongod
```

---

### 4. Run the project

```bash
npm run dev
```

or

```bash
node src/server.js
```

Server will start at:

```
http://localhost:3000
```

---

## Frontend Pages

* Register: `http://localhost:3000/register.html`
* Login: `http://localhost:3000/login.html`
* Profile: `http://localhost:3000/profile.html`

---

## API Endpoints

### Register

```
POST /register
```

### Login

```
POST /login
```

### Get Profile (Protected)

```
GET /profile
```

### Update Profile (Protected)

```
PUT /profile
```

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Usage

### PostgreSQL

Used for:

* User authentication
* Email
* Username
* Password hash

### MongoDB

Used for:

* Profile data (bio, full name, avatar, etc.)

---

## Security

* Passwords are hashed using bcrypt
* JWT is used for authentication
* Validation is handled on the server
* Protected routes require a valid token

---

## Notes

* The client does not communicate with external APIs
* All validation and logic is handled by the server
* This project follows the server-client separation principle