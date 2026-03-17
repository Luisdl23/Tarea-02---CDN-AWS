import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const app = express();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

console.log("Inicializando Prisma...");

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

console.log("Prisma inicializado correctamente");

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Tasks API",
    version: "1.0.0",
    description: "API para gestión de tareas",
  },
  servers: [
    {
      url: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3001",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Obtiene todas las tareas",
        responses: {
          "200": {
            description: "Lista de tareas",
          },
        },
      },
      post: {
        summary: "Crea una nueva tarea",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Hacer tarea",
                  },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Tarea creada correctamente",
          },
          "400": {
            description: "El título es obligatorio",
          },
        },
      },
    },
  },
};

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/tasks", async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newTask = await prisma.task.create({
      data: { title },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

if (!process.env.VERCEL) {
  app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
  });
}

export default app;import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const app = express();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no está definida");
}

console.log("Inicializando Prisma...");

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

console.log("Prisma inicializado correctamente");

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Tasks API",
    version: "1.0.0",
    description: "API para gestión de tareas",
  },
  servers: [
    {
      url: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3001",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Obtiene todas las tareas",
        responses: {
          "200": {
            description: "Lista de tareas",
          },
        },
      },
      post: {
        summary: "Crea una nueva tarea",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Hacer tarea",
                  },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Tarea creada correctamente",
          },
          "400": {
            description: "El título es obligatorio",
          },
        },
      },
    },
  },
};

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/tasks", async (_req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newTask = await prisma.task.create({
      data: { title },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

if (!process.env.VERCEL) {
  app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
  });
}

export default app;