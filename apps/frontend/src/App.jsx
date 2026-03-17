import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Debes escribir una tarea");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
      }

      setTitle("");
      await getTasks();
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert("Ocurrió un error al crear la tarea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Task Manager</h1>
        <p className="subtitle">Frontend conectado a tu API, Prisma y Neon</p>

        <form onSubmit={createTask} className="form">
          <input
            type="text"
            placeholder="Escribe una tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Agregar"}
          </button>
        </form>

        <div className="list">
          {tasks.length === 0 ? (
            <p>No hay tareas todavía.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task">
                <span>{task.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;