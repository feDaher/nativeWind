import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function SelectRetro({
  options,
  selected,
  onChange,
}: {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View className="w-11/12 border-2 border-[#7D5B8C] rounded-md my-2 items-center">
      <Pressable
        onPress={() => setOpen(true)}
        className="p-2 w-full items-center"
      >
        <Text
          className="text-center"
          style={{ fontFamily: "PressStart2P_400Regular", fontSize: 10 }}
        >
          {options.find((opt) => opt.value === selected)?.label ?? "Selecione"}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white border-2 border-[#7D5B8C] rounded-md p-4 w-10/12 items-center">
            {options.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="py-2 w-full items-center"
              >
                <Text
                  className="text-center"
                  style={{
                    fontFamily: "PressStart2P_400Regular",
                    fontSize: 10,
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
