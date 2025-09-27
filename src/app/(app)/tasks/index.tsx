import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { Stack, Link } from 'expo-router';
import { useTasks } from '@/src/context/TaskContext';

export default function TaskList() {
  const { tasks, createTask, toggleTask, removeTask } = useTasks();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // State local para forçar re-render
  const [tasksState, setTasksState] = useState(tasks);

  // Atualiza state local sempre que o context mudar
  useEffect(() => {
    setTasksState(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    const t = title.trim();
    if (!t) return;
    setLoading(true);
    createTask(t);
    setTitle('');
    setLoading(false);
  };

  const handleToggle = (id: string) => {
    toggleTask(id);
  };

  const handleRemove = (id: string) => {
    Alert.alert('Excluir', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeTask(id) },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Tarefas', headerShown: true }} />

      {/* Input e botão de adicionar */}
      <View className="p-4 flex-row gap-2">
        <TextInput
          className="flex-1 border border-zinc-300 rounded-xl px-3 py-2"
          placeholder="Nova tarefa..."
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAddTask}
        />
        <Pressable
          onPress={handleAddTask}
          className="px-4 py-2 rounded-xl bg-zinc-800"
        >
          <Text className="text-white font-semibold">
            {loading ? 'Adicionando...' : 'Adicionar'}
          </Text>
        </Pressable>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tasksState}
        keyExtractor={(item) => item.id}
        extraData={tasksState}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <View className="border border-zinc-200 rounded-xl p-3 flex-row items-center justify-between">
            {/* Título e status */}
            <Pressable onPress={() => handleToggle(item.id)} className="flex-1">
              <Text
                className={`text-base ${
                  item.done ? 'line-through text-zinc-400' : 'text-zinc-900'
                }`}
              >
                {item.title}
              </Text>
              <Text className="text-xs text-zinc-400 mt-1">
                {item.done ? 'Concluída' : 'Pendente'}
              </Text>
            </Pressable>

            {/* Botões */}
            <View className="flex-row gap-3">
              {/* Botão alternador concluída */}
              <Pressable
                onPress={() => handleToggle(item.id)}
                className={`px-3 py-1 rounded-lg ${
                  item.done ? 'bg-yellow-100' : 'bg-green-100'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    item.done ? 'text-yellow-600' : 'text-green-600'
                  }`}
                >
                  {item.done ? 'Desmarcar' : 'Concluir'}
                </Text>
              </Pressable>

              {/* Botão editar */}
              <Link href={`/tasks/${item.id}`} asChild>
                <Pressable className="px-3 py-1 rounded-lg bg-zinc-200">
                  <Text>Editar</Text>
                </Pressable>
              </Link>

              {/* Botão excluir */}
              <Pressable
                onPress={() => handleRemove(item.id)}
                className="px-3 py-1 rounded-lg bg-red-100"
              >
                <Text className="text-red-600">Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center mt-16">
              <Text className="text-zinc-500">Nenhuma tarefa. Adicione a primeira!</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
