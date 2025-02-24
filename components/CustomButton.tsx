import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/themes';

import { ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style, { backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary }]}>
      <Text style={[styles.buttonText, { color: isDarkMode ? darkTheme.text : lightTheme.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;