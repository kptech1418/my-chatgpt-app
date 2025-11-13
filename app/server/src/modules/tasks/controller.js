export const tasks = [];

const userController = {
  getTasks: async (req, res) => res.json(tasks),
  createTask: async (req, res) => {
    console.log('Creating task with description:', req.body, req.body.description);
    const newTask = { id: Date.now(), description: req.body.description, completed: false };
    tasks.push(newTask);
    res.json(newTask);
  },
  completeTask: async (req, res) => {
    const task = tasks.find(t => t.id === +req.params.id);
    if (task) task.completed = true;
    res.json(task);
  },
};

export default userController;
