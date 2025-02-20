import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useCurrency } from '../context/CurrencyContext';
import { useFoodContext } from '../context/FoodContext';
import { useTheme } from '../context/ThemeContext';

const StatisticsScreen = () => {
  const { currency } = useCurrency();
  const { state: { foodItems } } = useFoodContext();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filterItemsByDate = (date: string) => {
    return foodItems.filter(item => item.date === date);
  };

  const itemsForSelectedDate = filterItemsByDate(selectedDate);

  const totalCost = itemsForSelectedDate.reduce((sum, item) => sum + item.cost, 0);
  const totalCalories = itemsForSelectedDate.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = itemsForSelectedDate.reduce((sum, item) => sum + item.protein, 0);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Calendar
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        theme={{
          calendarBackground: isDarkMode ? '#333' : '#fff',
          textSectionTitleColor: isDarkMode ? '#fff' : '#000',
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: '#fff',
          todayTextColor: 'blue',
          dayTextColor: isDarkMode ? '#fff' : '#000',
          textDisabledColor: isDarkMode ? '#555' : '#d9e1e8',
          arrowColor: isDarkMode ? '#fff' : '#000',
          monthTextColor: isDarkMode ? '#fff' : '#000',
        }}
      />
      <View style={[styles.statBlock, isDarkMode && styles.darkStatBlock]}>
        <Text style={[styles.statText, isDarkMode && styles.darkStatText]}>Total Calories</Text>
        <Text style={[styles.statValue, isDarkMode && styles.darkStatValue]}>{totalCalories}</Text>
      </View>
      <View style={[styles.statBlock, isDarkMode && styles.darkStatBlock]}>
        <Text style={[styles.statText, isDarkMode && styles.darkStatText]}>Total Protein</Text>
        <Text style={[styles.statValue, isDarkMode && styles.darkStatValue]}>{totalProtein}g</Text>
      </View>
      <View style={[styles.statBlock, isDarkMode && styles.darkStatBlock]}>
        <Text style={[styles.statText, isDarkMode && styles.darkStatText]}>Total Cost</Text>
        <Text style={[styles.statValue, isDarkMode && styles.darkStatValue]}>{currency}{totalCost.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto_700Bold',
    marginBottom: 20,
  },
  darkTitle: {
    color: '#fff',
  },
  statBlock: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    width: '90%',
  },
  darkStatBlock: {
    borderColor: '#555',
  },
  statText: {
    fontSize: 18,
    color: '#333',
  },
  darkStatText: {
    color: '#fff',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  darkStatValue: {
    color: '#fff',
  },
});

export default StatisticsScreen;