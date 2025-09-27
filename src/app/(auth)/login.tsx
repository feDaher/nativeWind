import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), pwd); // ✅ Atualiza token no contexto
      router.replace("/(app)/dashboard"); // Navega para Home
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Stack.Screen options={{ title: "Entrar", headerShown: true }} />
      <Text className="text-2xl font-bold mb-6">Bem-vindo</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
      />

        <View className="w-full mb-4 relative">
      <TextInput
        placeholder="Senha"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry={!showPwd} // controla se a senha aparece
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 pr-12" // pr-10 dá espaço pro ícone
      />
      <Pressable
        onPress={() => setShowPwd(!showPwd)}
         className="absolute right-3 top-1/2"
         style={{ transform: [{ translateY: -10 }] }} // centraliza o ícone verticalmente
  >
        <Ionicons
          name={showPwd ? "eye-off" : "eye"}
          size={20}
          color="gray"
        />
      </Pressable>
    </View>

    {/* Botão Entrar */}
    <Pressable
      onPress={handleLogin}
      disabled={loading}
      className="w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800 mb-4"
    >
      <Text className="text-white font-semibold">
        {loading ? "Entrando..." : "Entrar"}
      </Text>
    </Pressable>

    {/* Botão Cadastrar-se */}
    <Pressable
      onPress={() => router.push("(auth)/register")}
      className="w-full rounded-xl px-4 py-3 items-center justify-center border border-zinc-800"
    >
      <Text className="text-zinc-800 font-semibold">Cadastrar-se</Text>
    </Pressable>
  </View>
);
}
