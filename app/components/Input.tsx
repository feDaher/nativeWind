import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
    label: string;
    className?: string;
};

export default function Input({ label, className, ...props}: InputProps) {
    return(
        <View className={className}>
            <Text className="mb-1">{label}</Text>
            <TextInput
            {...props}
            className = "border border-zinc-300 rounded-lg px-3 py-2"
            />
        </View>
    )
}

