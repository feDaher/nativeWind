import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/src/context/AuthContext";

// Funções para CPF
const unmaskCPF = (cpf: string) => cpf.replace(/\D/g, "");

const formatCPF = (cpf: string) => {
  if (!cpf) return "";
  const v = unmaskCPF(cpf).slice(0, 11);
  return v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export default function Settings() {
  const { signOut } = useAuth();
  const [user, setUser] = useState<{
    username: string;
    email: string;
    cpf: string;
  } | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Carrega o usuário salvo no SecureStore
  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await SecureStore.getItemAsync("session");
        if (!session) {
          setLoading(false);
          return;
        }

        const { email } = JSON.parse(session);
        const safeKey = `user_${email.replace(/[^a-zA-Z0-9]/g, "")}`;
        const storedUser = await SecureStore.getItemAsync(safeKey);

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUsernameInput(parsedUser.username);
        }
      } catch (e) {
        console.log("Erro ao carregar usuário:", e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔹 Atualiza username e salva no SecureStore
  const handleSaveUsername = async () => {
    if (!user || !usernameInput.trim()) return;

    try {
      const updatedUser = { ...user, username: usernameInput.trim() };
      const safeKey = `user_${user.email.replace(/[^a-zA-Z0-9]/g, "")}`;
      await SecureStore.setItemAsync(safeKey, JSON.stringify(updatedUser));

      setUser(updatedUser);
      setEditing(false);
      Alert.alert("Sucesso", "Username atualizado!");
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao salvar username");
    }
  };

  // 🔹 Logout
  const handleSignOut = () => {
    Alert.alert("Confirmação", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <View className="flex-1 bg-white px-6 py-8 justify-between">
      <View className="gap-6 pt-8">
        <Text className="text-3xl font-bold text-center text-zinc-900">
          Configurações
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : user ? (
          <View className="bg-zinc-100 rounded-2xl p-6 shadow-md gap-4">
            {/* Username */}
            <Text className="text-xl font-semibold text-zinc-800">
              Username
            </Text>
            <View className="flex-row items-center gap-2">
              {editing ? (
                <TextInput
                  value={usernameInput}
                  onChangeText={setUsernameInput}
                  className="flex-1 bg-white border border-green-500 rounded-xl px-4 py-3"
                />
              ) : (
                <Text className="flex-1 text-zinc-700 text-lg">
                  {usernameInput}
                </Text>
              )}

              <Pressable
                onPress={editing ? handleSaveUsername : () => setEditing(true)}
                className="w-7 h-7 rounded-xl bg-zinc-800 items-center justify-center"
              >
                <Ionicons
                  name={editing ? "checkmark" : "pencil"}
                  size={20}
                  color="white"
                />
              </Pressable>
            </View>

            {/* Email */}
            <Text className="text-xl font-semibold text-zinc-800">E-mail</Text>
            <Text className="text-zinc-700">{user.email}</Text>

            {/* CPF */}
            <Text className="text-xl font-semibold text-zinc-800">CPF</Text>
            <Text className="text-zinc-700">{formatCPF(user.cpf)}</Text>
          </View>
        ) : (
          <Text className="text-center text-zinc-500">
            Nenhum usuário carregado
          </Text>
        )}

        {/* Botão Sair */}
        <Pressable
          onPress={handleSignOut}
          className="mt-4 bg-red-600 rounded-xl px-6 py-3 items-center shadow-md"
        >
          <Text className="text-white font-semibold text-lg">Sair</Text>
        </Pressable>
      </View>

      {/* Rodapé */}
      <View className="items-center">
        <Text className="text-zinc-400 text-sm">
          Versão {Constants.manifest?.version || "1.0.0"}
        </Text>
      </View>
    </View>
  );
}
