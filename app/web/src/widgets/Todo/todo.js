import { useEffect, useState } from "react";
import { useOpenAiGlobal } from "../../hooks/useOpenAiGlobal";

const Todo = () => {
  const toolOutput = window.openai ? useOpenAiGlobal("toolOutput") : null;

  if (window.openai) {
    useEffect(() => {
      fetchTasks();
    }, [toolOutput]);
  }

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    setTasks(await res.json());
  };

  const addTask = async () => {
    if (window.openai) {
      await window.openai.callTool("createTask", { text });
      await window.openai.sendFollowUpMessage({
        prompt: `I just added a task to the todo list: ${text}.`,
      });
    } else {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      await fetchTasks();
    }
    setText("");
  };

  const completeTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}/complete`, {
      method: "POST",
    });
    fetchTasks();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div>
      <h1>Task Tracker</h1>
      <p>Stay organized and productive</p>

      {totalCount > 0 && (
        <div>
          <span>Progress: {completedCount} of {totalCount} completed</span>
          <div>
            <div style={{ width: `${progress}%`, background: "blue", height: "5px" }}></div>
          </div>
        </div>
      )}

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          placeholder="What needs to be done?"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => completeTask(t.id)}
              />
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;
