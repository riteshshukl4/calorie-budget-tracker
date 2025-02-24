import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme } from '../styles/themes';

interface NutrientTrackerProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
}

const NutrientTracker: React.FC<NutrientTrackerProps> = ({ totalCalories, totalProtein, totalCarbs }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.nutrientBlock}>
        <Text style={[styles.nutrientLabel, isDarkMode && styles.darkNutrientLabel]}>Calories</Text>
        <Text style={[styles.nutrientValue, isDarkMode && styles.darkNutrientValue]}>{totalCalories}</Text>
      </View>
      <View style={styles.nutrientBlock}>
        <Text style={[styles.nutrientLabel, isDarkMode && styles.darkNutrientLabel]}>Protein</Text>
        <Text style={[styles.nutrientValue, isDarkMode && styles.darkNutrientValue]}>{totalProtein}g</Text>
      </View>
      <View style={styles.nutrientBlock}>
        <Text style={[styles.nutrientLabel, isDarkMode && styles.darkNutrientLabel]}>Carbs</Text>
        <Text style={[styles.nutrientValue, isDarkMode && styles.darkNutrientValue]}>{totalCarbs}g</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: lightTheme.card,
    marginBottom: 16,
  },
  darkContainer: {
    backgroundColor: darkTheme.card,
  },
  nutrientBlock: {
    alignItems: 'center',
  },
  nutrientLabel: {
    fontSize: 16,
    color: lightTheme.text,
  },
  darkNutrientLabel: {
    color: darkTheme.text,
  },
  nutrientValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: lightTheme.text,
  },
  darkNutrientValue: {
    color: darkTheme.text,
  },
});

export default NutrientTracker;