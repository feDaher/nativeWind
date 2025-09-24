import { View, Text } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

export default function Dashboard() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-xl font-bold">Bem-vindo(a) 👋</Text>

      {token ? (
        <Text className="mt-2 text-zinc-700">
          Seu token atual é:
          {"\n"}
          <Text className="font-mono text-sm">{token}</Text>
        </Text>
      ) : (
        <Text className="mt-2 text-red-500">Nenhum usuário autenticado</Text>
      )}
    </View>
  );
}
