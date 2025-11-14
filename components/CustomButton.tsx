import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import { styles } from "../styles";
import colors from "../constants/colors";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  bgColor = colors.primary,
  textColor = colors.white,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.customButton,
        { backgroundColor: bgColor },
        style,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.customButtonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
