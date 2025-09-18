import { TouchableOpacity, Text } from "react-native";

export default function ButtonRetro({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#7D5B8C] py-2 px-4 rounded-md w-3/5 my-2"
    >
      <Text
        className="text-white text-center text-xs"
        style={{ fontFamily: "PressStart2P_400Regular" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
