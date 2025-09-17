// components/ButtonDesign.tsx
import React from "react";
import { Pressable, Text } from "react-native";

// Tipagem das props
type ButtonDesignProps = {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string; // <- aqui está a chave
};

export default function ButtonDesign({
  title,
  onPress,
  className = "",
  textClassName = "",
}: ButtonDesignProps) {
  return (
    <Pressable onPress={onPress} className={`px-4 py-3 rounded-lg ${className}`}>
      <Text className={`text-center font-semibold ${textClassName}`}>
        {title}
      </Text>
    </Pressable>
  );
}
