import React from "react";
import { Pressable, Text, PressableProps } from "react-native";

type ButtonProps = PressableProps & {
    title?: string;
    className?: string;
    textClassName?: string;
};

export default function Buttons({title, className, textClassName, ...props}: ButtonProps) {
    return (
        <Pressable className={className} {...props}>
            <Text className={className}>{title}</Text>
        </Pressable>
    )
}