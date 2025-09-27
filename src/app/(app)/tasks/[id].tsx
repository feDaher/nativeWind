import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '@/src/context/TaskContext';
import type { Task } from '@/src/types';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!id) return;
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    setTask(t);
    setTitle(t.title);
  }, [id, tasks]);

  const save = () => {
    if (!id) return;
    const newTitle = title.trim();
    if (!newTitle) return Alert.alert('Validação', 'Informe um título');

    updateTask(id, { title: newTitle }); // atualiza no context
    router.back(); // ao voltar, a lista já reflete a mudança
  };

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: 'Editar tarefa', headerShown: true }} />
      <Text className="text-sm text-zinc-500 mb-2">ID: {task.id}</Text>

      <TextInput
        className="border border-zinc-300 rounded-xl px-3 py-2 mb-4"
        value={title}
        onChangeText={setTitle}
      />

      <Pressable
        onPress={save}
        className="rounded-xl px-4 py-3 items-center bg-zinc-800"
      >
        <Text className="text-white font-semibold">Salvar</Text>
      </Pressable>
    </View>
  );
}
