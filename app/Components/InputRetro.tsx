// app/components/InputRetro.tsx
import React from "react";
import { TextInput } from "react-native";
import { globalStyles as styles } from "../styles";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function InputRetro({ value, onChangeText, placeholder }: Props) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
      keyboardType="decimal-pad"
    />
  );
}
