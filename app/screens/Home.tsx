import '../../global.css';
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-300">Hello, RN + Expo + NativeWind + TS</Text>
    </View>
  );
}