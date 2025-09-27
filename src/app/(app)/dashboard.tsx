import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "expo-router"; // 🔥

export default function Dashboard() {
  const [username, setUsername] = useState<string>("");

  const loadUser = async () => {
    try {
      const session = await SecureStore.getItemAsync("session");
      if (!session) return;

      const { email } = JSON.parse(session);
      const safeKey = `user_${email.replace(/[^a-zA-Z0-9]/g, "")}`;
      const storedUser = await SecureStore.getItemAsync(safeKey);
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      setUsername(user.username);
    } catch (e) {
      console.log("Erro ao carregar usuário:", e);
    }
  };

  useFocusEffect(() => {
    loadUser();
  });

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">
        Bem-vindo(a), {username} 👋
      </Text>
    </View>
  );
}
