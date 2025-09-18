import React, { useMemo, useState } from "react";
import { View,Text, Pressable, Keyboard, ScrollView, SafeAreaView,} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {useFonts,PressStart2P_400Regular,} from "@expo-google-fonts/press-start-2p";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonRetro from "../Components/ButtonRetro";
import InputRetro from "../Components/InputRetro";
import ResultBox from "../Components/ResultBox";
import SelectRetro from "../Components/SelectRetro";

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
  const navigation = useNavigation<CalculatorScreenNavigationProp>();
  const [aText, setAText] = useState<string>("");
  const [bText, setBText] = useState<string>("");
  const [op, setOp] = useState<Operacao>("todas");

  const [fontsLoaded] = useFonts({ PressStart2P_400Regular });

  const { valido, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    if (!a || !b || !isNumberValid(a) || !isNumberValid(b)) {
      return {
        valido: false,
        linhas: ["Entrada inválida. Informe dois números."],
      };
    }

    const soma = a + b;
const sub = a - b;
const mul = a * b;
const div = b === 0 ? "Não é possível dividir por zero" : (a / b).toFixed(2);
const mod = b === 0 ? "Indefinido (módulo por zero)" : (a % b).toFixed(2);

const map: Record<Operacao, string[]> = {
  soma: [`Soma: ${a.toFixed(2)} + ${b.toFixed(2)} = ${soma.toFixed(2)}`],
  sub: [`Subtração: ${a.toFixed(2)} - ${b.toFixed(2)} = ${sub.toFixed(2)}`],
  mul: [`Multiplicação: ${a.toFixed(2)} × ${b.toFixed(2)} = ${mul.toFixed(2)}`],
  div: [`Divisão: ${a.toFixed(2)} ÷ ${b.toFixed(2)} = ${div}`],
  mod: [`Resto: ${a.toFixed(2)} % ${b.toFixed(2)} = ${mod}`],
  todas: [
    `Soma: ${a.toFixed(2)} + ${b.toFixed(2)} = ${soma.toFixed(2)}`,
    `Subtração: ${a.toFixed(2)} - ${b.toFixed(2)} = ${sub.toFixed(2)}`,
    `Multiplicação: ${a.toFixed(2)} × ${b.toFixed(2)} = ${mul.toFixed(2)}`,
    `Divisão: ${a.toFixed(2)} ÷ ${b.toFixed(2)} = ${div}`,
    `Resto: ${a.toFixed(2)} % ${b.toFixed(2)} = ${mod}`,
  ],
};

    return { valido: true, linhas: map[op] };
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
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerClassName="flex-grow items-center justify-center px-4 py-6">
        {/* Botão Voltar */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="flex-row items-center justify-center mb-3 w-full"
        >
          <FontAwesome5
            name="home"
            size={20}
            color="#7D5B8C"
            style={{ marginRight: 8 }}
          />
          <Text
            className="text-xs text-[#7D5B8C]"
            style={{ fontFamily: "PressStart2P_400Regular" }}
          >
            Voltar para Home
          </Text>
        </Pressable>

        {/* Caixa Principal */}
        <View className="w-80 bg-white border-2 border-[#7D5B8C] rounded-lg p-5 items-center shadow-md">
          <Text
            className="text-xs mb-3 text-center leading-5"
            style={{ fontFamily: "PressStart2P_400Regular" }}
          >
            Calculadora
          </Text>

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

          <View className="mt-4 space-y-2 w-full items-center">
            <ButtonRetro title="Calcular" onPress={calcular} />
            <ButtonRetro title="Limpar" onPress={limpar} />
          </View>

          <ResultBox lines={linhas} valido={valido} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
