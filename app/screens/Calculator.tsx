import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Keyboard, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonDesign from "../Components/ButtonDesign"
import InputDesign from "../Components/InputDesign";
import ResultBox from "../Components/ResultBox";
import SelectDesign from "../Components/SelectDesign";

const Box: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => <View className={className}>{children}</View>;

// Tipos de operação possíveis
type Operacao = "todas" | "soma" | "sub" | "mul" | "div" | "mod";

// Funções auxiliares
function parseNumber(texto: string): number {
  return Number(texto.trim().replace(",", "."));
}

function isNumberValid(n: number): boolean {
  return Number.isFinite(n);
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toString();
}

// Componente principal
export default function Calculator() {
  const router = useRouter();
  const [aText, setAText] = useState<string>("");
  const [bText, setBText] = useState<string>("");
  const [op, setOp] = useState<Operacao>("todas");

  const { valido, a, b, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    if (!a || !b || !isNumberValid(a) || !isNumberValid(b)) {
      return {
        valido: false, a, b, linhas: ["Entrada inválida. Informe dois números."],
      };
    }

    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = b === 0 ? "Não é possível dividir por zero" : formatNumber(a / b);
    const mod = b === 0 ? "Indefinido (módulo por zero)" : formatNumber(a % b);

    const map: Record<Operacao, string[]> = {
      soma: [
        `Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`,
      ],
      sub: [
        `Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(
          sub
        )}`,
      ],
      mul: [
        `Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${formatNumber(
          mul
        )}`,
      ],
      div: [
        `Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${div}`,
      ],
      mod: [
        `Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${mod}`,
      ],
      todas: [
        `Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`,
        `Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(
          sub
        )}`,
        `Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${formatNumber(
          mul
        )}`,
        `Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${div}`,
        `Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${mod}`,
      ],
    };

    return { valido: true, a, b, linhas: map[op] };
  }, [aText, bText, op]);

  function calcular() {
    // no RN, já calculamos em tempo real via useMemo;
    // aqui só fechamos o teclado para UX
    Keyboard.dismiss();
  }

  function limpar() {
    setAText("");
    setBText("");
    setOp("todas");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
       
        <Pressable onPress={() => router.back()} className="mb-4">
          <View className="flex-row items-center">
            <FontAwesome5
              name="home"
              size={20}
              color="#668c5bff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-base text-[#58a16fff]">Voltar para Home</Text>
          </View>
        </Pressable>

        <View className="p-4 bg-gray-100 rounded-md">
          <Text className="text-2xl font-bold mb-3">Calculadora</Text>

          <InputDesign
            value={aText}
            onChangeText={setAText}
            placeholder="Número A"
          />
          
          <InputDesign
            value={bText}
            onChangeText={setBText}
            placeholder="Número B"
          />

          <SelectDesign
            options={[
              { label: "Todas", value: "todas" },
              { label: "Soma (+)", value: "soma" },
              { label: "Subtração (−)", value: "sub" },
              { label: "Multiplicação (×)", value: "mul" },
              { label: "Divisão (÷)", value: "div" },
              { label: "Resto (%)", value: "mod" },
            ]}
            selected={op}
            onChange={(value: string) => setOp(value as Operacao)}
            className="mb-3"
          />

          <View className="flex-row space-x-3">
            <ButtonDesign title="Calcular" onPress={calcular} className="flex-1" />
            <ButtonDesign title="Limpar" onPress={limpar} className="flex-1 bg-gray-300 text-black" />
          </View>

          <ResultBox lines={linhas} valido={valido} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
