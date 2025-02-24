import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/themes';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChangeText, style }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <TextInput
      style={[styles.input, style, { backgroundColor: isDarkMode ? darkTheme.card : lightTheme.card, borderColor: isDarkMode ? darkTheme.border : lightTheme.border, color: isDarkMode ? darkTheme.text : lightTheme.text }]}
      placeholder={placeholder}
      placeholderTextColor={isDarkMode ? darkTheme.text : lightTheme.text}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

export default CustomInput;