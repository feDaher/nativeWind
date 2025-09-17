import React, { useMemo, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { parseNumber, isNumberValid, formatNumber } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Box from "../components/Box";
import Input from "../components/Input";
import IconButton from "../components/IconButton";

type Operacao = "todas" | "soma" | "sub" | "mul" | "div" | "mod";

export default function Calculator() {
  const [aText, setAText] = useState<string>("");
  const [bText, setBText] = useState<string>("");
  const [op, setOp] = useState<Operacao>("todas");

  const { valido, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    if (!a || !b || !isNumberValid(a) || !isNumberValid(b)) {
      return { valido: false, linhas: ["Entrada inválida. Informe dois números."] };
    }

    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = b === 0 ? "Não é possível dividir por zero" : formatNumber(a / b);
    const mod = b === 0 ? "Indefinido (módulo por zero)" : formatNumber(a % b);

    const map: Record<Operacao, string[]> = {
      soma: [`Soma: ${a} + ${b} = ${soma.toFixed(2)}`],
      sub: [`Subtração: ${a} - ${b} = ${sub.toFixed(2)}`],
      mul: [`Multiplicação: ${a} × ${b} = ${mul.toFixed(2)}`],
      div: [`Divisão: ${a} ÷ ${b} = ${Number(div).toFixed(2)}`],
      mod: [`Resto: ${a} % ${b} = ${Number(mod).toFixed(2)}`],
      todas: [
        `Soma: ${a} + ${b} = ${soma.toFixed(2)}`,
        `Subtração: ${a} - ${b} = ${sub.toFixed(2)}`,
        `Multiplicação: ${a} × ${b} = ${mul.toFixed(2)}`,
        `Divisão: ${a} ÷ ${b} = ${Number(div).toFixed(2)}`,
        `Resto: ${a} % ${b} = ${Number(mod).toFixed(2)}`,
      ],
    };

    return { valido: true, linhas: map[op] };
  }, [aText, bText, op]);

  const calcular = () => Keyboard.dismiss();

  function limpar() {
    setAText("");
    setBText("");
    setOp("todas");
  }

  return (
    <ScreenContainer>
      <View className="flex-row items-center gap-2 mb-4">
        <MaterialIcons name="calculate" size={28} color="#374151" />
        <Text className="text-2xl font-bold">Calculadora de Operações</Text>
      </View>

      <Box className="rounded-xl border border-zinc-300 bg-white p-4 gap-3 shadow-sm">
        <Text className="font-semibold">Entradas</Text>

        <Box className="flex-row gap-3">
          <Box className="flex-1">
            <Text className="mb-1">Número A</Text>
            <Input
              keyboardType="decimal-pad"
              value={aText}
              onChangeText={setAText}
              placeholder="Ex.: 12.5"
              className="border border-zinc-300 rounded-lg px-3 py-2"
            />
          </Box>

          <Box className="flex-1">
            <Text className="mb-1">Número B</Text>
            <Input
              keyboardType="decimal-pad"
              value={bText}
              onChangeText={setBText}
              placeholder="Ex.: 3"
              className="border border-zinc-300 rounded-lg px-3 py-2"
            />
          </Box>
        </Box>

        <Text className="mt-2 mb-1">Operação</Text>
        <View className="border border-zinc-300 rounded-lg overflow-hidden">
          <Picker selectedValue={op} onValueChange={(v) => setOp(v as Operacao)}>
            <Picker.Item label="Todas" value="todas" />
            <Picker.Item label="Soma (+)" value="soma" />
            <Picker.Item label="Subtração (−)" value="sub" />
            <Picker.Item label="Multiplicação (×)" value="mul" />
            <Picker.Item label="Divisão (÷)" value="div" />
            <Picker.Item label="Resto (%)" value="mod" />
          </Picker>
        </View>

        <Box className="flex-row gap-3 mt-3">
          <IconButton label="Calcular" icon="play-arrow" onPress={calcular} />
          <IconButton label="Limpar" icon="refresh" onPress={limpar} variant="secondary" />
        </Box>
      </Box>

      <Text className="text-lg font-semibold mt-4 mb-2">Resultado</Text>
      <Box className="rounded-lg bg-zinc-100 p-3">
        {!valido ? (
          <Text className="text-red-600 font-semibold">{linhas[0]}</Text>
        ) : (
          linhas.map((l, i) => <Text key={i}>{l}</Text>)
        )}
      </Box>
    </ScreenContainer>
  );
}