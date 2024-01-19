const express = require("express");
const shortUUID = require("short-uuid");

const app = express();
app.use(express.json());

let users = [
  { id: "1", name: "John", surname: "Smith", country: "USA", salary: 6000 },
  { id: "2", name: "Emma", surname: "Wilson", country: "UK", salary: 5500 },
  {
    id: "3",
    name: "Hans",
    surname: "Müller",
    country: "Germany",
    salary: 7000,
  },
];

// GET Home Page
app.get("/", (req, res) => {
  res.send("Welcome to Hicoders Employee Management System");
});

// GET All Users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST Add New User
app.post("/users", (req, res) => {
  const { name, surname, country, salary } = req.body;
  const id = shortUUID.generate();
  const newUser = { id, name, surname, country, salary };
  users.push(newUser);
  res.json(newUser);
});

// GET Highest Salary User
app.get("/users/highest-salary", (req, res) => {
  const highestSalaryUser = users.reduce((prev, current) =>
    prev.salary > current.salary ? prev : current
  );
  res.json(highestSalaryUser);
});

// GET Lowest Salary User
app.get("/users/lowest-salary", (req, res) => {
  const lowestSalaryUser = users.reduce((prev, current) =>
    prev.salary < current.salary ? prev : current
  );
  res.json(lowestSalaryUser);
});

// GET Users from a Specific Country
app.get("/users/country=:country", (req, res) => {
  const country = req.params.country.toLowerCase();
  const countryUsers = users.filter(
    (user) => user.country.toLowerCase() === country
  );
  res.json(countryUsers);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
