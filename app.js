import express from "express";
import employeesRouter from "./api/employees.js";

const app = express();

app.use((request, response, next) => {
  console.log(`${request.method} ${request.path}`);
  next(); // move our middleware
}); // run this for every request

app.use(express.json()); // parse or convert json in javascript ==> body parser

app.get("/", (request, response) => {
  response.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeesRouter);

export default app;
