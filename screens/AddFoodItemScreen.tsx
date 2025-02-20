import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFoodContext } from '../context/FoodContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

const AddFoodItemScreen = () => {
  const { dispatch } = useFoodContext();
  const { currency } = useCurrency();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [cost, setCost] = useState('');

  const handleAddFood = () => {
    const newFoodItem = {
      id: Date.now(),
      name,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      cost: parseFloat(cost),
    };
    dispatch({ type: 'ADD_FOOD_ITEM', payload: newFoodItem });
    setName('');
    setCalories('');
    setProtein('');
    setCost('');
  };

  const handleQuickAdd = () => {
    const newQuickAddItem = {
      id: Date.now(),
      name,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      cost: parseFloat(cost),
    };
    dispatch({ type: 'ADD_QUICK_ADD_ITEM', payload: newQuickAddItem });
    setName('');
    setCalories('');
    setProtein('');
    setCost('');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Add Food Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Protein (g)"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder={`Cost (${currency})`}
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddFood}>
        <Text style={styles.buttonText}>Add Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.quickAddButton]} onPress={handleQuickAdd}>
        <Text style={styles.buttonText}>Quick Add</Text>
      </TouchableOpacity>
      <Text style={[styles.currency, isDarkMode && styles.darkCurrency]}>Current Currency: {currency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
  },
  darkTitle: {
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickAddButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto_700Bold',
  },
  currency: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  darkCurrency: {
    color: '#fff',
  },
});

export default AddFoodItemScreen;