import React from "react";
import { View, ViewProps } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Option {
  label: string;
  value: string;
}

interface SelectDesignProps extends ViewProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  className?: string; // permite NativeWind
}

export default function SelectDesign({ options, selected, onChange, className, ...rest }: SelectDesignProps) {
  return (
    <View
      className={`border border-gray-300 rounded-lg my-2 overflow-hidden ${className ?? ""}`}
      {...rest}
    >
      <Picker
        selectedValue={selected}
        onValueChange={(value) => onChange(value)}
        dropdownIconColor="#333"
      >
        {options.map((opt) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    </View>
  );
}
