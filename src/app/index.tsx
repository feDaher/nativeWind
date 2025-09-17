import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Home</Text>
      <Link href="/calculator" asChild>
        <Pressable className="mt-4 px-4 py-2 rounded-xl bg-zinc-200">
          <Text>Abrir Calculadora</Text>
        </Pressable>
      </Link>
    </View>
  );
}
