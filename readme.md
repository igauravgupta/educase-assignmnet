# 🏫 School Management API

## 📌 Task

Develop a RESTful API using **Node.js**, **Express.js**, and **MySQL** that allows users to:
- Add new schools to the database.
- Retrieve a list of schools sorted by proximity to a user-specified location.

---

## 🧑‍💻 Tech Stack Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MySQL** – Relational database
- **dotenv** – For managing environment variables
- **mysql2** – For MySQL integration
- **asyncHandler** – Middleware to handle async errors
- **Custom APIResponse & APIError utils** – Standardized responses

---

## 🧮 Sample MySQL Table

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
