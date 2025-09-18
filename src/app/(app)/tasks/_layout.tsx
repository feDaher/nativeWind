import { Stack } from 'expo-router';

export default function TasksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Tarefas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Editar tarefa' }} />
    </Stack>
  );
}
