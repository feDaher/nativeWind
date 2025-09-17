import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { TaskService } from '@/src/service/taks';
import type { Task } from '@/src/types';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      if (!id) return;
      const t = await TaskService.get(id);
      setTask(t);
      setTitle(t?.title ?? '');
    })();
  }, [id]);

  const save = async () => {
    if (!id) return;
    const t = title.trim();
    if (!t) return Alert.alert('Validação', 'Informe um título');
    await TaskService.update(id, { title: t });
    router.back();
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

      <Pressable onPress={save} className="rounded-xl px-4 py-3 items-center bg-zinc-800">
        <Text className="text-white font-semibold">Salvar</Text>
      </Pressable>
    </View>
  );
}
