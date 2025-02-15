import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FoodItem } from '../models/FoodItem';

const AddFoodItemScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [cost, setCost] = useState('');

  const handleAddFoodItem = () => {
    const newFoodItem: FoodItem = {
      id: Date.now().toString(),
      name,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      cost: parseFloat(cost),
      date: new Date().toISOString().split('T')[0],
    };
    // Save the new food item (e.g., to AsyncStorage or a state management library)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Food Item</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Protein" value={protein} onChangeText={setProtein} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Cost" value={cost} onChangeText={setCost} keyboardType="numeric" style={styles.input} />
      <Button title="Add" onPress={handleAddFoodItem} />
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default AddFoodItemScreen;