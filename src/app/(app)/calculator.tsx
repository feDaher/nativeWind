import React, { useMemo, useRef, useState } from 'react';
import { View, 
  Text, 
  Pressable, 
  Keyboard, 
  ScrollView, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  TextInput as RNTextInput 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { parseNumber, isNumberValid, formatNumber } from '@/utils';
import Box from '../components/Box';
import Input from '../components/Input';

type Operacao = 'todas' | 'soma' | 'sub' | 'mul' | 'div' | 'mod';

const OPS: Array<{ key: Operacao; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { key: 'todas', label: 'Todas', icon: 'grid-outline' },
  { key: 'soma',  label: 'Soma',  icon: 'add-circle-outline' },
  { key: 'sub',   label: 'Sub',   icon: 'remove-circle-outline' },
  { key: 'mul',   label: 'Mult',  icon: 'close-circle-outline' },
  { key: 'div',   label: 'Div',   icon: 'git-branch-outline' },
  { key: 'mod',   label: 'Resto', icon: 'aperture-outline' },
];

export default function Calculator() {
  const [aText, setAText] = useState<string>('');
  const [bText, setBText] = useState<string>('');
  const [op, setOp] = useState<Operacao>('todas');

  const bRef = useRef<RNTextInput>(null);

  const { valido, a, b, linhas, errorMsg } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    const validA = a !== null && a !== undefined && isNumberValid(a as number);
    const validB = b !== null && b !== undefined && isNumberValid(b as number);

    if (!validA || !validB) {
      return {
        valido: false,
        a,
        b,
        linhas: [] as string[],
        errorMsg: 'Entrada inválida. Informe dois números (A e B).',
      };
    }

    const soma = (a as number) + (b as number);
    const sub  = (a as number) - (b as number);
    const mul  = (a as number) * (b as number);
    const div  = (b as number) === 0 ? null : (a as number) / (b as number);
    const mod  = (b as number) === 0 ? null : (a as number) % (b as number);

    const fixed2 = (n: number) =>
      formatNumber ? formatNumber(Number(n.toFixed(2))) : n.toFixed(2);

    const show = (n: number) => (formatNumber ? formatNumber(n) : String(n));

    const map: Record<Operacao, string[]> = {
      soma:  [`${show(a as number)} + ${show(b as number)} = ${fixed2(soma)}`],
      sub:   [`${show(a as number)} − ${show(b as number)} = ${fixed2(sub)}`],
      mul:   [`${show(a as number)} × ${show(b as number)} = ${fixed2(mul)}`],
      div:   [div === null
                ? 'Divisão por zero não é permitida'
                : `${show(a as number)} ÷ ${show(b as number)} = ${fixed2(div)}`],
      mod:   [mod === null
                ? 'Resto por zero é indefinido'
                : `${show(a as number)} % ${show(b as number)} = ${fixed2(mod)}`],
      todas: [
        `${show(a as number)} + ${show(b as number)} = ${fixed2(soma)}`,
        `${show(a as number)} − ${show(b as number)} = ${fixed2(sub)}`,
        `${show(a as number)} × ${show(b as number)} = ${fixed2(mul)}`,
        div === null
          ? 'Divisão por zero não é permitida'
          : `${show(a as number)} ÷ ${show(b as number)} = ${fixed2(div)}`,
        mod === null
          ? 'Resto por zero é indefinido'
          : `${show(a as number)} % ${show(b as number)} = ${fixed2(mod)}`,
      ],
    };

    return { valido: true, a, b, linhas: map[op], errorMsg: null as string | null };
  }, [aText, bText, op]);

  const calcular = () => Keyboard.dismiss();

  function limpar() {
    setAText('');
    setBText('');
    setOp('todas');
  }

  const canCalculate = valido;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        >
          {/* <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">

              <Text className="text-2xl font-bold">Calculadora</Text>
            </View>
            <TouchableOpacity
              onPress={limpar}
              accessibilityRole="button"
              className="px-3 py-2 rounded-lg bg-zinc-100"
            >
              <Text className="text-zinc-700">Limpar</Text>
            </TouchableOpacity>
          </View> */}

          <Box className="rounded-2xl border border-zinc-200 p-4 gap-3">
            <Text className="font-semibold text-zinc-800 mb-1">Entradas</Text>

            <Box className="flex-row gap-3">
              <Box className="flex-1">
                <Text className="mb-1 text-zinc-600">Número A</Text>
                <Input
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  returnKeyType="next"
                  value={aText}
                  onChangeText={setAText}
                  placeholder="Ex.: 12.5"
                  className="border border-zinc-300 rounded-xl px-3 py-3"
                  onSubmitEditing={() => bRef.current?.focus?.()}
                  blurOnSubmit={false}
                  accessibilityLabel="Campo número A"
                />
              </Box>

              <Box className="flex-1">
                <Text className="mb-1 text-zinc-600">Número B</Text>
                <Input
                  ref={bRef}
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  returnKeyType="done"
                  value={bText}
                  onChangeText={setBText}
                  placeholder="Ex.: 3"
                  className="border border-zinc-300 rounded-xl px-3 py-3"
                  onSubmitEditing={calcular}
                  accessibilityLabel="Campo número B"
                />
              </Box>
            </Box>

            <Text className="mt-3 mb-1 text-zinc-600">Operação</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {OPS.map(({ key, label, icon }) => {
                const active = op === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setOp(key)}
                    className={`px-3 py-2 rounded-full border ${active ? 'bg-zinc-900 border-zinc-900' : 'bg-white border-zinc-300'}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                  >
                    <View className="flex-row items-center gap-1">
                      <Ionicons name={icon} size={16} color={active ? '#fff' : '#111'} />
                      <Text className={`text-sm ${active ? 'text-white' : 'text-zinc-800'}`}>{label}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View className="border border-zinc-200 rounded-xl overflow-hidden mt-3">
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
              <Pressable
                onPress={calcular}
                disabled={!canCalculate}
                className={`rounded-xl px-4 py-3 ${canCalculate ? 'bg-blue-600' : 'bg-zinc-300'}`}
                accessibilityRole="button"
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="play-circle" size={18} color="#fff" />
                  <Text className="text-white font-semibold">Calcular</Text>
                </View>
              </Pressable>

              <Pressable onPress={limpar} className="rounded-xl px-4 py-3 bg-zinc-100">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="refresh" size={18} color="#111" />
                  <Text className="text-zinc-800 font-semibold">Limpar</Text>
                </View>
              </Pressable>
            </View>

            <Text className="text-xs text-zinc-500 mt-2">
              Dica: use ponto (.) como separador decimal.
            </Text>
          </Box>

          <Text className="text-lg font-semibold mt-5 mb-2">Resultado</Text>

          <View className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            {!valido ? (
              <View className="flex-row items-center gap-2">
                <Ionicons name="alert-circle" size={18} color="#dc2626" />
                <Text className="text-red-600 font-semibold">{errorMsg}</Text>
              </View>
            ) : (
              <View className="gap-2">
                {linhas.map((l, i) => (
                  <View key={i} className="flex-row items-center gap-2">
                    <Ionicons name="arrow-forward-circle-outline" size={16} color="#111" />
                    <Text className="text-zinc-900">{l}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
