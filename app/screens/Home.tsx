// import '../../global.css';
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
// import { FontAwesome5 } from ;
import "nativewind/tailwind.css";
import "../global.css";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-3xl font-bold text-[#58a16fff] mb-6">
          Bem-vindo!
        </Text>
        <Text className="text-base text-center text-gray-600 mb-10">
          Este é um app de calculadora. Clique abaixo para começar.
        </Text>

        <Pressable
          onPress={() => router.push("/screens/Calculator")}
          className="bg-[#58a16fff] px-6 py-3 rounded-md flex-row items-center"
        >
          {/* <FontAwesome5
            name="calculator"
            size={20}
            color="#fff"
            style={{ marginRight: 10 }}
          /> */}
          <Text className="text-white text-base font-semibold">
            Ir para Calculadora
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
