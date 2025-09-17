import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '../types';

const KEY = 'TASKS/default';

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

async function readAll(): Promise<Task[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as Task[] : [];
}

async function writeAll(tasks: Task[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
}

export const TaskService = {
  async list() {
    return readAll();
  },
  async create(title: string) {
    const tasks = await readAll();
    const t: Task = { id: genId(), title: title.trim(), done: false, createdAt: Date.now() };
    await writeAll([t, ...tasks]);
    return t;
  },
  async update(id: string, patch: Partial<Task>) {
    const tasks = await readAll();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...patch };
    await writeAll(tasks);
    return tasks[idx];
  },
  async remove(id: string) {
    const tasks = await readAll();
    await writeAll(tasks.filter(t => t.id !== id));
  },
  async toggle(id: string) {
    const tasks = await readAll();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx].done = !tasks[idx].done;
    await writeAll(tasks);
    return tasks[idx];
  },
  async get(id: string) {
    const tasks = await readAll();
    return tasks.find(t => t.id === id) ?? null;
  }
};
