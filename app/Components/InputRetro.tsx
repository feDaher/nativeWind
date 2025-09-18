import { TextInput } from "react-native";

export default function InputRetro({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className="w-11/12 border-2 border-[#7D5B8C] rounded-md py-2 px-3 my-1 text-center text-xs"
      style={{ fontFamily: "PressStart2P_400Regular" }}
    />
  );
}
