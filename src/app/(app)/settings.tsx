import { View, Text, Pressable } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

export default function Settings() {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <Text className="text-xl font-bold">Ajustes</Text>
      <Pressable onPress={signOut} className="px-4 py-2 rounded-xl bg-zinc-800">
        <Text className="text-white font-semibold">Sair</Text>
      </Pressable>
    </View>
  );
}
