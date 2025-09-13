// app/components/ButtonRetro.tsx
import React, { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import { fonts } from "../styles";

type ButtonRetroProps = {
  title: string;
  onPress: () => void;
};

export default function ButtonRetro({ title, onPress }: ButtonRetroProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, 
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          backgroundColor: "#7D5B8C",
          paddingVertical: 7,
          paddingHorizontal: 3.5,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#7D5B8C",
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
          marginBottom: 7,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.retro,
            fontSize: 8,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
