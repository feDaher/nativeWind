// app/components/ResultBox.tsx
import React from "react";
import { View, Text } from "react-native";
import { globalStyles as styles } from "../styles";

interface Props {
  lines: string[];
  valido: boolean;
}

export default function ResultBox({ lines, valido }: Props) {
  return (
    <View style={styles.resultBox}>
      {!valido ? (
        <Text style={styles.resultText}>{lines[0]}</Text>
      ) : (
        lines.map((line, i) => <Text key={i} style={styles.resultText}>{line}</Text>)
      )}
    </View>
  );
}
