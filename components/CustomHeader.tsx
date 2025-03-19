import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CustomHeaderProps {
  title: string;
  isDarkMode: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, isDarkMode }) => {
  return (
    <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? '#333' : '#6200EE' }]}>
      <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#FFF' }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;