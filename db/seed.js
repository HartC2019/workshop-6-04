import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    {
      name: "Chase Hart",
      birthday: "1994-11-30",
      salary: 50000,
    },
    {
      name: "Jane Doe",
      birthday: "1998-12-30",
      salary: 80000,
    },
    {
      name: "John Doe",
      birthday: "1980-10-15",
      salary: 45000,
    },
    {
      name: "Emily Carter",
      birthday: "1992-05-18",
      salary: 72000,
    },
    {
      name: "Michael Johnson",
      birthday: "1987-11-03",
      salary: 95000,
    },
    {
      name: "Sophia Martinez",
      birthday: "1996-08-27",
      salary: 68000,
    },
    {
      name: "Daniel Kim",
      birthday: "1990-01-12",
      salary: 83000,
    },
    {
      name: "Olivia Brown",
      birthday: "1994-09-09",
      salary: 76000,
    },
    {
      name: "James Wilson",
      birthday: "1985-06-30",
      salary: 105000,
    },
    {
      name: "Ava Thompson",
      birthday: "1998-02-14",
      salary: 61000,
    },
  ];

  for (const employee of employees) {
    const newEmployee = await createEmployee(employee);
    console.log(newEmployee);
  }
}
