import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard, ScrollView, SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Box from "../components/Box";
import Input from "../components/Input";

type RootStackParamList = {
  Home: undefined;
  Calculator: undefined;
};

type CalculatorScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Calculator'>;
};

type Operacao = 'todas' | 'soma' | 'sub' | 'mul' | 'div' | 'mod';

function parseNumber(texto: string): number {
  return Number(texto.trim().replace(',', '.'));
}

function isNumberValid(n: number): boolean {
  return Number.isFinite(n);
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toString();
}

export default function Calculator({ navigation }: CalculatorScreenProps) {
  const [aText, setAText] = useState<string>('');
  const [bText, setBText] = useState<string>('');
  const [op, setOp] = useState<Operacao>('todas');

  const { valido, a, b, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    // Corrigido para aceitar zero como entrada válida
    if (aText.trim() === '' || bText.trim() === '' || !isNumberValid(a) || !isNumberValid(b)) {
      return { valido: false, a, b, linhas: ["Entrada inválida. Informe dois números."] };
    }

    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = b === 0 ? "Não é possível dividir por zero" : formatNumber(a / b);
    const mod = b === 0 ? "Indefinido (módulo por zero)" : formatNumber(a % b);

    const map: Record<Operacao, string[]> = {
      soma: [`Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(soma)}`],
      sub:  [`Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${formatNumber(sub)}`],
      mul:  [`Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${formatNumber(mul)}`],
      div:  [`Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${Number(div)}`],
      mod:  [`Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${Number(mod)}`],
      todas: [
        `Soma: ${formatNumber(a)} + ${formatNumber(b)} = ${Number(soma).toFixed(2)}`,
        `Subtração: ${formatNumber(a)} - ${formatNumber(b)} = ${Number(sub).toFixed(2)}`,
        `Multiplicação: ${formatNumber(a)} × ${formatNumber(b)} = ${Number(mul).toFixed(2)}`,
        `Divisão: ${formatNumber(a)} ÷ ${formatNumber(b)} = ${Number(div).toFixed(2)}`,
        `Resto: ${formatNumber(a)} % ${formatNumber(b)} = ${Number(mod).toFixed(2)}`,
      ],
    };

    return { valido: true, a, b, linhas: map[op] };
  }, [aText, bText, op]);

  function calcular() {
    Keyboard.dismiss();
  }

  function limpar() {
    setAText('');
    setBText('');
    setOp('todas');
  }

  return (
    <SafeAreaView className="mt-20">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-4 text-center">Calculadora de Operações</Text>

        <Box className="rounded-xl border border-zinc-300 p-4 gap-3 shadow-lg bg-white">
          <Text className="font-semibold text-center">Entradas</Text>

          <Box className="flex-row gap-3">
            <Box className="flex-1">
              <Input
                label="Número A"
                keyboardType="decimal-pad"
                value={aText}
                onChangeText={setAText}
                placeholder="Ex.: 12.5"
                className="border border-zinc-300 rounded-lg px-3 py-2"
                onSubmitEditing={calcular}
              />
            </Box>

            <Box className="flex-1">
              <Input
                label="Número B"
                keyboardType="decimal-pad"
                value={bText}
                onChangeText={setBText}
                placeholder="Ex.: 3"
                className="border border-zinc-300 rounded-lg px-3 py-2"
                onSubmitEditing={calcular}
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

          <View className="flex-row gap-3 mt-3">
            <Pressable onPress={calcular} className="bg-blue-600 rounded-lg px-4 py-2 shadow">
              <Text className="text-white font-semibold">Calcular</Text>
            </Pressable>
            <Pressable onPress={limpar} className="bg-zinc-200 rounded-lg px-4 py-2 shadow">
              <Text className="text-zinc-800 font-semibold">Limpar</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.goBack()}
              className="bg-blue-400 rounded-lg px-4 py-2 shadow"
            >
              <Text className="text-white font-semibold">Voltar</Text>
            </Pressable>
          </View>
        </Box>

        <Text className="text-lg font-semibold mt-4 mb-2 text-center">Resultado</Text>
        <View className="rounded-lg bg-zinc-100 p-3 shadow">
          {!valido ? (
            <Text className="text-red-600 font-semibold">{linhas[0]}</Text>
          ) : (
            linhas.map((l, i) => <Text key={i}>{l}</Text>)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}