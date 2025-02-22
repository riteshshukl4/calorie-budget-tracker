import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
  const [calorieGoal, setCalorieGoal] = useState('');
  const [proteinGoal, setProteinGoal] = useState('');

  useEffect(() => {
    // Fetch the daily budget, calorie goal, and protein goal from AsyncStorage
    const fetchSettings = async () => {
      const budget = await AsyncStorage.getItem('dailyBudget');
      const calorie = await AsyncStorage.getItem('calorieGoal');
      const protein = await AsyncStorage.getItem('proteinGoal');
      if (budget) setDailyBudget(budget);
      if (calorie) setCalorieGoal(calorie);
      if (protein) setProteinGoal(protein);
    };
    fetchSettings();
  }, []);

  const handleSetDailyBudget = async () => {
    await AsyncStorage.setItem('dailyBudget', dailyBudget);
    alert('Daily Budget Set!');
  };

  const handleSetCalorieGoal = async () => {
    await AsyncStorage.setItem('calorieGoal', calorieGoal);
    alert('Calorie Goal Set!');
  };

  const handleSetProteinGoal = async () => {
    await AsyncStorage.setItem('proteinGoal', proteinGoal);
    alert('Protein Goal Set!');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
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
        <View style={styles.inputContainer}>
          <Ionicons name="wallet" size={24} color={isDarkMode ? '#fff' : '#333'} />
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

      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <View style={styles.inputContainer}>
          <Ionicons name="flame" size={24} color={isDarkMode ? '#fff' : '#333'} />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Calorie Goal"
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={calorieGoal}
            onChangeText={setCalorieGoal}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSetCalorieGoal}>
          <Text style={styles.buttonText}>Set</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <View style={styles.inputContainer}>
          <Ionicons name="nutrition" size={24} color={isDarkMode ? '#fff' : '#333'} />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Protein Goal (g)"
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={proteinGoal}
            onChangeText={setProteinGoal}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSetProteinGoal}>
          <Text style={styles.buttonText}>Set</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
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