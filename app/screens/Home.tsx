import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import ButtonRetro from "../Components/ButtonRetro";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <FontAwesome5
        name="calculator"
        size={64}
        color="#7D5B8C"
        style={{ marginBottom: 20 }}
      />

      <Text
        className="text-xs mb-3 leading-5 text-center"
        style={{ fontFamily: "PressStart2P_400Regular" }}
      >
        RN + Expo + NativeWind + TSH
      </Text>

      <View className="mt-5">
        <ButtonRetro
          title="Ir para Calculator"
          onPress={() => navigation.navigate("Calculator")}
        />
      </View>
    </View>
  );
}
