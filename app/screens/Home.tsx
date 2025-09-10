// import '../../global.css';
import { Text, View, Pressable } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Calculator: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-8">
        Hello, RN + Expo + NativeWind + TS
      </Text>
      <Pressable
        className="bg-green-600 px-6 py-3 rounded-lg"
        onPress={() => navigation.navigate("Calculator")}
      >
        <Text className="text-black text-lg font-semibold">Calculadora</Text>
      </Pressable>
    </View>
  );
}
