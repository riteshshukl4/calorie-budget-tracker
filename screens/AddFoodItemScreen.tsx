import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
      <Button title="Add Food" onPress={handleAddFood} />
      <Button title="Quick Add" onPress={handleQuickAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddFoodItemScreen;