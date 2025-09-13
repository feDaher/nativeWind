import { View, Text} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { globalStyles as styles } from "../styles";
import ButtonRetro from "../Components/ButtonRetro";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

 return (
    <View style={styles.container}>
      <FontAwesome5
        name="calculator"
        size={64}
        color="#7D5B8C"
        style={{ marginBottom: 20 }}
      />

      <Text style={styles.title}>RN + Expo + NativeWind + TSH</Text>

      {/* Container para espaçamento */}
      <View style={{ marginTop: 20 }}>
        <ButtonRetro
          title="Ir para Calculator"
          onPress={() => navigation.navigate("Calculator")}
        />
      </View>
    </View>
  );
}