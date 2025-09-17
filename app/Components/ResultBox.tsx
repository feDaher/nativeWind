import React from "react";
import { View, Text } from "react-native";

interface ResultBoxProps {
  lines: string[];
  valido: boolean;
}

export default function ResultBox({ lines, valido }: ResultBoxProps) {
  return (
    <View
      className={`mt-3 p-3 rounded-lg ${
        valido ? "bg-gray-200" : "bg-red-100 border border-red-500"
      }`}
    >
      {lines.map((line, index) => (
        <Text
          key={index}
          className={`text-base ${
            valido ? "text-gray-800" : "text-red-700 font-bold"
          }`}
        >
          {line}
        </Text>
      ))}
    </View>
  );
}
