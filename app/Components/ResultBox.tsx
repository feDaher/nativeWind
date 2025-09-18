import { View, Text } from "react-native";

export default function ResultBox({
  lines,
  valido,
}: {
  lines: string[];
  valido: boolean;
}) {
  return (
    <View className="mt-3">
      {lines.map((line, index) => (
        <Text
          key={index}
          className="text-[10px] text-center leading-5"
          style={{ fontFamily: "PressStart2P_400Regular" }}
        >
          {line}
        </Text>
      ))}
    </View>
  );
}
