import { useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`grid gap-2 auto-rows-min bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg transition-all duration-300 ${
          isExpanded ? "w-80 h-96" : "w-64 h-14"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Input - always visible */}
        <form onSubmit={addTask} className="py-2 px-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a quick task..."
            className="w-full px-3 py-2 text-sm rounded-md bg-black/10 focus:outline-none  focus:ring-white focus:border-transparent focus:bg-white/15 placeholder:text-white/50 text-white"
          />
        </form>

        {/* Task list - only visible when expanded */}
        {isExpanded && (
          <div className="px-3 pb-3 max-h-80 overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-white/90 text-sm text-center py-4">
                No tasks yet
              </p>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-2 p-3 rounded-md border-0 bg-black/25 backdrop-blur-3xl hover:bg-white/15 `}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        task.completed
                          ? "bg-white/10 border-white/90 text-white"
                          : "border-gray-300 hover:border-white/90"
                      }`}
                    >
                      {task.completed && (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>

                    <span
                      className={`w-full flex-1 text-sm text-white ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.text}
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
