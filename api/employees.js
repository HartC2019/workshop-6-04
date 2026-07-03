import express from "express";

import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

const router = express.Router();

router.get("/", async (request, response) => {
  const employees = await getEmployees();
  response.send(employees);
});

router.post("/", async (request, response, next) => {
  try {
    if (!request.body) {
      return response.sendStatus(400);
    }
    const { name, birthday, salary } = request.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return response.status(400).json({ error: "Name is required" });
    }
    if (!birthday || typeof birthday !== "string" || birthday.trim() === "") {
      return response.status(400).json({ error: "Birthday is required" });
    }
    if (!salary || typeof salary !== "number" || salary === undefined) {
      return response.status(400).json({ error: "Salary is required" });
    }

    const employee = await createEmployee({
      name,
      birthday,
      salary,
    });
    response.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const employee = await getEmployee(id);

    if (!employee) {
      return response.status(404).json({
        error: `Employee with id ${id} was not found`,
      });
    }

    response.json(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const employee = await deleteEmployee(id);

    if (!employee) {
      return response.status(404).json({
        error: `Employee with id ${id} was not found`,
      });
    }

    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    if (!request.body) {
      return response.sendStatus(400);
    }

    const { id } = request.params;
    const { name, birthday, salary } = request.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return response.status(400).json({ error: "Name is required" });
    }

    if (!birthday || typeof birthday !== "string" || birthday.trim() === "") {
      return response.status(400).json({ error: "Birthday is required" });
    }

    if (salary === undefined || typeof salary !== "number") {
      return response.status(400).json({ error: "Salary is required" });
    }

    const employee = await updateEmployee({
      id,
      name,
      birthday,
      salary,
    });

    if (!employee) {
      return response.status(404).json({
        error: `Employee with id ${id} was not found`,
      });
    }

    response.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

export default router;

// TODO: this file!
