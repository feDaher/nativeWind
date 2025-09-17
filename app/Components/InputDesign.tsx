import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputDesignProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export default function InputDesign({
  value,
  onChangeText,
  placeholder,
  className,
  ...rest
}: InputDesignProps) {
  return (
    <TextInput
      className={`border border-gray-300 rounded-lg p-3 my-2 text-base bg-white ${className ?? ""}`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType="numeric"
      {...rest}
    />
  );
}
