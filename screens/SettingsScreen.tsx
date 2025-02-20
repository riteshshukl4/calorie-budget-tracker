import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const isDarkMode = theme === 'dark';
  const [dailyBudget, setDailyBudget] = useState('');

  useEffect(() => {
    // Fetch the daily budget from AsyncStorage
    const fetchDailyBudget = async () => {
      const budget = await AsyncStorage.getItem('dailyBudget');
      if (budget) {
        setDailyBudget(budget);
      }
    };
    fetchDailyBudget();
  }, []);

  const handleSetDailyBudget = async () => {
    await AsyncStorage.setItem('dailyBudget', dailyBudget);
    alert('Daily Budget Set!');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>
      
      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <View style={styles.switchContainer}>
          <Ionicons name="moon" size={24} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={[styles.switchLabel, isDarkMode && styles.darkSwitchLabel]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <View style={styles.pickerContainer}>
          <Ionicons name="cash" size={24} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={[styles.pickerLabel, isDarkMode && styles.darkPickerLabel]}>Currency</Text>
          <Picker
            selectedValue={currency}
            style={[styles.picker, isDarkMode && styles.darkPicker]}
            onValueChange={(itemValue) => setCurrency(itemValue as '$' | '€' | '₹')}
          >
            <Picker.Item label="USD" value="$" />
            <Picker.Item label="EUR" value="€" />
            <Picker.Item label="INR" value="₹" />
          </Picker>
        </View>
      </View>

      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <View style={styles.pickerContainer}>
          <Ionicons name="wallet" size={24} color={isDarkMode ? '#fff' : '#333'} />
          <Text style={[styles.pickerLabel, isDarkMode && styles.darkPickerLabel]}>Daily Budget</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder={`Daily Budget (${currency})`}
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={dailyBudget}
            onChangeText={setDailyBudget}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSetDailyBudget}>
          <Text style={styles.buttonText}>Set</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: '#444',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },
  darkSwitchLabel: {
    color: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerLabel: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },
  darkPickerLabel: {
    color: '#fff',
  },
  picker: {
    height: 50,
    width: 150,
  },
  darkPicker: {
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
  },
  darkInput: {
    borderColor: '#555',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold',
  },
});

export default SettingsScreen;