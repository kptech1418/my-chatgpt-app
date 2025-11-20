import fs from "fs";
import { z } from "zod";
import path from 'path';

const todoResources = [{
  name: 'todo-widget',
  outputTemplateUri: 'ui://widget/todo.html',
  html: fs.readFileSync(path.join('./dist', 'todo.html'), 'utf8').trim(),
}];

const todoTools = [{
  name: 'createTask',
  title: 'Create a new task',
  description: 'Create a new task',
  inputSchema: {
    text: z.string(),
  },
  outputSchema: {
    id: z.number(),
    description: z.string(),
    completed: z.boolean(),
  },
  outputTemplateUri: 'ui://widget/todo.html',
  invoking: 'Creating task...',
  invoked: 'Task created',
  implementation: async ({ text }) => {
    const response = await fetch(`${process.env.BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ description: text }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const newTask = await response.json();
    return {
      structuredContent: newTask,
      content: [
        { type: 'text', text: newTask?.description },
      ],
    }
  },
}, {
  name: 'getTasks',
  title: 'Get all tasks',
  description: 'Get all tasks',
  outputSchema:  {
    tasks: z.array(z.object({
      id: z.number(),
      description: z.string(),
      completed: z.boolean(),
    })),
  },
  outputTemplateUri: 'ui://widget/todo.html',
  invoking: 'Getting tasks...',
  invoked: 'Tasks sent',
  implementation: async () => {
    const response = await fetch(`${process.env.BASE_URL}/tasks`);
    const tasks = await response.json();
    if (tasks.length === 0) {
      return {
        structuredContent: { tasks: [] },
        content: [
          { type: 'text', text: 'No tasks found' },
        ],
      }
    }

    return {
      structuredContent: { tasks },
      content: [
        { type: 'text', text: tasks?.map(t => t.description).join('\n') },
      ],
    }
  },
}, {
  name: 'completeTask',
  title: 'Complete a task',
  description: 'Complete a task',
  inputSchema: {
    id: z.number(),
  },
  outputSchema: {
    id: z.number(),
    description: z.string(),
    completed: z.boolean(),
  },
  outputTemplateUri: 'ui://widget/todo.html',
  invoking: 'Completing task...',
  invoked: 'Task complete',
  implementation: async ({ id }) => {
    const response = await fetch(`${process.env.BASE_URL}/tasks/${id}/complete`, { method: 'POST' });
    const updatedTask = await response.json();
    return {
      structuredContent: updatedTask,
      content: [
        { type: 'text', text: updatedTask?.description },
      ],
    }
  },
}];

export default {
  resources: [
    ...todoResources
  ],
  tools: [
    ...todoTools
  ]
};
