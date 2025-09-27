// src/context/taskContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { Task } from '@/src/types';
import uuid from 'react-native-uuid';

type TaskContextType = {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (title: string) => {
    const newTask: Task = {
      id: uuid.v4() as string, // 🔹 gerador compatível com Hermes
      title,
      done: false,
      createdAt: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, data: Partial<Task>) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...data, updatedAt: Date.now() } : t
      )
    );
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, toggleTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks deve ser usado dentro de <TaskProvider>');
  return ctx;
}
