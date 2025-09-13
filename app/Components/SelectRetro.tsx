import React, { useState } from "react";
import { View, Text, Pressable, Modal, FlatList, TouchableOpacity } from "react-native";
import { fonts } from "../styles";

type SelectRetroProps = {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
};

export default function SelectRetro({ options, selected, onChange }: SelectRetroProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === selected)?.label || "";

  return (
    <View style={{ width: "90%", marginVertical: 6 }}>
      <Pressable
        style={{
          borderWidth: 2,
          borderColor: "#7D5B8C",
          borderRadius: 5,
          padding: 8,
          backgroundColor: "#fff",
        }}
        onPress={() => setOpen(true)}
      >
      <Text style={{ fontFamily: fonts.retro, fontSize:7, textAlign: "center" }}>{selectedLabel}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",  
            alignItems: "center",    
          }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              width: "80%",  
              maxHeight: "50%",
              alignItems: "center",     
              justifyContent: "center",
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  style={{ paddingVertical: 8 }}
                >
                  <Text style={{ fontFamily: fonts.retro, fontSize: 10 }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
