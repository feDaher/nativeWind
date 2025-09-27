// src/app/tasks/_layout.tsx
import { Stack } from 'expo-router';
import { TaskProvider } from '@/src/context/TaskContext';

export default function TasksLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Tarefas' }} />
        <Stack.Screen name="[id]" options={{ title: 'Editar tarefa' }} />
      </Stack>
    </TaskProvider>
  );
}
