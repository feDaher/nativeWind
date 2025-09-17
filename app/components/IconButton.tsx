import { Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconButtonProps {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function IconButton({
  label,
  icon,
  onPress,
  variant = "primary",
}: IconButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-2 rounded-lg px-4 py-2 shadow 
        ${isPrimary ? "bg-gray-600 active:bg-gray-700" : "bg-zinc-200 active:bg-zinc-300"}`}
    >
      <MaterialIcons
        name={icon}
        size={20}
        color={isPrimary ? "white" : "#1F2937"}
      />
      <Text
        className={`font-semibold ${
          isPrimary ? "text-white" : "text-zinc-800"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}


//PADRONIZAR O BOTÃO