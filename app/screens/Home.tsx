import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import IconButton from "../components/IconButton";
import Box from "../components/Box";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <ScreenContainer>
      <Box className="bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl shadow-lg items-center w-full max-w-md">
        <MaterialIcons name="home" size={48} color="#4B5563" />

        <Text className="text-3xl font-extrabold text-gray-800 dark:text-blue-300 mb-4 tracking-wide text-center">
          TELA HOME
        </Text>

        <Text className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Bem-vindo!
        </Text>

        <IconButton
          label="Ir para Calculadora"
          icon="calculate"
          onPress={() => navigation.navigate("Calculator")}
        />
      </Box>
    </ScreenContainer>
  );
}