import React from "react";
import { 
  TextInput, 
  TextInputProps, 
  KeyboardTypeOptions, 
  NativeSyntheticEvent, 
  TextInputSubmitEditingEventData 
} from "react-native";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "onSubmitEditing" | "keyboardType" | "value" | "placeholder"> {
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

const Input: React.FC<InputProps> = ({
  keyboardType = "default",
  value,
  onChangeText,
  placeholder,
  className,
  onSubmitEditing,
  ...rest
}) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className={className}
      onSubmitEditing={onSubmitEditing}
      {...rest}
    />
  );
};

export default Input;
