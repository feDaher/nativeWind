import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Alert } from "react-native";
import { Link, Stack } from "expo-router";
import { TaskService } from "@/src/service/taks";
import type { Task } from "@/src/types";
import { useAuth } from "@/src/context/AuthContext";

export default function TaskList() {
  const { signOut, user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await TaskService.list();
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const addTask = async () => {
    const t = title.trim();
    if (!t) return;
    await TaskService.create(t);
    setTitle("");
    load();
  };

  const toggle = async (id: string) => {
    await TaskService.toggle(id);
    load();
  };

  const remove = async (id: string) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await TaskService.remove(id);
          load();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Minhas Tarefas",
          headerShown: true,
          headerRight: () => (
            <Pressable onPress={signOut} className="px-3 py-1 rounded-lg">
              <Text className="text-red-600 font-semibold">Sair</Text>
            </Pressable>
          ),
        }}
      />

      {/* Saudação na Home */}
      <View className="p-4">
        <Text className="text-xl font-semibold mb-4">
          Bem-vindo, {user?.username ?? "Usuário"} 👋
        </Text>

        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 border border-zinc-300 rounded-xl px-3 py-2"
            placeholder="Nova tarefa..."
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={addTask}
          />
          <Pressable
            onPress={addTask}
            className="px-4 py-2 rounded-xl bg-zinc-800"
          >
            <Text className="text-white font-semibold">Adicionar</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={tasks}
        refreshing={loading}
        onRefresh={load}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <View className="border border-zinc-200 rounded-xl p-3 flex-row items-center justify-between">
            <Pressable onPress={() => toggle(item.id)} className="flex-1">
              <Text
                className={`text-base ${
                  item.done
                    ? "line-through text-zinc-400"
                    : "text-zinc-900"
                }`}
              >
                {item.title}
              </Text>
              <Text className="text-xs text-zinc-400 mt-1">
                {item.done ? "Concluída" : "Pendente"}
              </Text>
            </Pressable>

            <View className="flex-row gap-3">
              <Link href={`/tasks/${item.id}`} asChild>
                <Pressable className="px-3 py-1 rounded-lg bg-zinc-200">
                  <Text>Editar</Text>
                </Pressable>
              </Link>

              <Pressable
                onPress={() => remove(item.id)}
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
              <Text className="text-zinc-500">
                Nenhuma tarefa. Adicione a primeira!
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
