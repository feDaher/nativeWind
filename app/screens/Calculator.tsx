import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";

type Operacao = 'todas' | 'soma' | 'sub' | 'mul' | 'div' | 'mod';

const Box: React.FC<React.PropsWithChildren<{ className?: string }>> = 
  ({ children, className }) => (
    <View className={className}>{children}</View>
  );

function parseNumber(text: string) {
  return Number(text.trim().replace('.', ','));
}

export default function Calculator() {
  const [aText, setAText] = useState<string>('');
  const [bText, setBText] = useState<string>('');
  const [op, setOp] = useState<Operacao>('todas');

  const { valido, a, b, linhas } = useMemo(() => {
    const a = parseNumber(aText);
    const b = parseNumber(bText);

    if (!a || !b) return { linhas: ['Entradas inválidas. Informe dois números. ']}
    
    const soma = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = b === 0 ? 'Nao é possivel dividir por zero' : a / b;
    const mod = b === 0 ? 'Indefinido' : a % b;

    const map: Record<Operacao, string[]> = {
      soma: [`Soma: ${a} + ${b} = ${soma}`],
      sub: [`Sub: ${a} - ${b} = ${sub}`],
      mul: [`Multiplicação: ${a} x ${b} = ${mul}`],
      div: [`Divisão: ${a} / ${b} = ${div}`],
      mod: [`Resto: ${a} % ${b} = ${mod}`],
      todas: [
        `Soma: ${a} + ${b} = ${soma}`,
        `Sub: ${a} - ${b} = ${sub}`,
        `Multiplicação: ${a} x ${b} = ${mul}`,
        `Divisão: ${a} / ${b} = ${div}`,
        `Resto: ${a} % ${b} = ${mod}`,
      ],
    }

    return { valido: true, a, b, linhas: map[op] }
  }, [aText, bText, op]);

  const calcular = () => { Keyboard.dismiss() }

  return (
    <>
      <Text className="text-2xl font-bold mb-4">Calculadora</Text>
      
      <Box>
        <Text>Entradas:</Text>

        <Box>
          <Box>
            <Text className="mb-1">Número A:</Text>
            <TextInput 
              keyboardType="decimal-pad"
              value={aText}
              onChangeText={setAText}
              placeholder="Ex. 9"
              className="border border-zinc-300 rounded-lg px-3 py-2"
              onSubmitEditing={calcular}
            />
          </Box>
          <Box>
            <Text>Número B:</Text>
            <TextInput 
              keyboardType="decimal-pad"
              value={bText}
              onChangeText={setBText}
              placeholder="Ex. 11"
              className="border border-zinc-300 rounded-lg px-3 py-2"
              onSubmitEditing={calcular}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
