// import '../../global.css';
import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Keyboard, ScrollView,  SafeAreaView,} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {useFonts,PressStart2P_400Regular, } from "@expo-google-fonts/press-start-2p";
import { FontAwesome5 } from "@expo/vector-icons";
import { globalStyles as styles} from "../styles";
import ButtonRetro from "../Components/ButtonRetro";
import InputRetro from "../Components/InputRetro";
import ResultBox from "../Components/ResultBox";
import SelectRetro from "../Components/SelectRetro";

const Box: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => <View className={className}>{children}</View>;

type CalculatorScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Calculator"
>;

type Operacao = "todas" | "soma" | "sub" | "mul" | "div" | "mod";

function parseNumber(texto: string): number {
  return Number(texto.trim().replace(",", "."));
}

function isNumberValid(n: number): boolean {
  return Number.isFinite(n);
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toString();
}

export default function Calculator() {
  type CalculatorScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Calculator"
  >;
  const navigation = useNavigation<CalculatorScreenNavigationProp>();
  const [aText, setAText] = useState<string>("");
  const [bText, setBText] = useState<string>("");
  const [op, setOp] = useState<Operacao>("todas");

  const [fontsLoaded] = useFonts({ PressStart2P_400Regular });

  const { valido, a, b, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    if (!a || !b || !isNumberValid(a) || !isNumberValid(b)) {
      return {
        valido: false,
        a,
        b,
        linhas: ["Entrada inválida. Informe dois números."],
      };
    }

    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div =
      b === 0 ? "Não é possível dividir por zero" : formatNumber(a / b);
    const mod = b === 0 ? "Indefinido (módulo por zero)" : formatNumber(a % b);

    const map: Record<Operacao, string[]> = {
      soma: [
        `Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`,
      ],
      sub: [
        `Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(sub)}`,
      ],
      mul: [
        `Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${formatNumber(mul)}`,
      ],
      div: [`Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${div}`],
      mod: [`Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${mod}`],
      todas: [
        `Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`,
        `Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(sub)}`,
        `Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${formatNumber(mul)}`,
        `Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${div}`,
        `Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${mod}`,
      ],
    };

    return { valido: true, a, b, linhas: map[op] };
  }, [aText, bText, op]);

  function calcular() {
    Keyboard.dismiss();
  }

  function limpar() {
    setAText("");
    setBText("");
    setOp("todas");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="home"
              size={20}
              color="#7D5B8C"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.backText}>Voltar para Home</Text>
          </View>
        </Pressable>
        <View style={styles.caixa}>
          <Text style={styles.title}>Calculadora</Text>
          <InputRetro
            value={aText}
            onChangeText={setAText}
            placeholder="Número A"
          />
          <InputRetro
            value={bText}
            onChangeText={setBText}
            placeholder="Número B"
          />

          <SelectRetro
            options={[
              { label: "Todas", value: "todas" },
              { label: "Soma (+)", value: "soma" },
              { label: "Subtração (−)", value: "sub" },
              { label: "Multiplicação (×)", value: "mul" },
              { label: "Divisão (÷)", value: "div" },
              { label: "Resto (%)", value: "mod" },
            ]}
            selected={op}
            onChange={(value) => setOp(value as Operacao)}
          />
          <ButtonRetro title="Calcular" onPress={calcular} />
          <ButtonRetro title="Limpar" onPress={limpar} />
          <ResultBox lines={linhas} valido={valido} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}