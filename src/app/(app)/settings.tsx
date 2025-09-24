import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import Constants from "expo-constants";

export default function Settings() {
  const { signOut, user } = useAuth();

  return (
    <View className="flex-1 bg-white p-6">
      {/* Título */}
      <Text className="text-2xl font-bold mb-6">Ajustes</Text>

      {/* Dados do usuário */}
      <View className="mb-8">
        <Text className="text-base text-zinc-800">
          <Text className="font-semibold">Usuário:</Text> {user?.username}
        </Text>
        <Text className="text-base text-zinc-800">
          <Text className="font-semibold">Nome completo:</Text> {user?.fullName}
        </Text>
        <Text className="text-base text-zinc-800">
          <Text className="font-semibold">Email:</Text> {user?.email}
        </Text>
        <Text className="text-base text-zinc-800">
          <Text className="font-semibold">CPF:</Text> {user?.cpf}
        </Text>
      </View>

      {/* Botão de sair */}
      <Pressable
        onPress={signOut}
        className="px-4 py-3 rounded-xl bg-red-600 items-center"
      >
        <Text className="text-white font-semibold text-lg">Sair</Text>
      </Pressable>

      {/* Versão do app */}
      <View className="mt-auto items-center">
        <Text className="text-zinc-500 text-sm">
          Versão {Constants.manifest?.version || "1.0.0"}
        </Text>
      </View>
    </View>
  );
}
