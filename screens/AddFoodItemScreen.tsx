import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useFoodContext } from '../context/FoodContext';

const AddFoodItemScreen = () => {
  const { dispatch } = useFoodContext();
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
    <View style={styles.container}>
      <Text style={styles.title}>Add Food Item</Text>
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
        placeholder="Cost ($)"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
  },
});

export default AddFoodItemScreen;