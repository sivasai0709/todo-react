import { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // ADD TASK
  const addTask = () => {
    if (!task.trim()) return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // TOGGLE STRIKE
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);

    if (updated[index].completed) {
      setTimeout(() => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
      }, 5000);
    }
  };

  // CLEAR ALL
  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className={darkMode ? "dark-mode body" : "body"}>
      <button className="darkModeSwitch" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light" : "Dark"}
      </button>

      <div id="container">
        <h2>To Do List</h2>

        <div className="row">
          <input
            type="text"
            placeholder="Enter task name..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button onClick={addTask}>Add</button>
          <button id="clearBtn" onClick={clearAll}>
            Clear
          </button>
        </div>

        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className={t.completed ? "striked" : ""}
              onClick={() => toggleTask(index)}
            >
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
