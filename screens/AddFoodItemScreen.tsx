import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useFoodContext } from '../context/FoodContext';

export default function AddFoodItemScreen() {
  const { dispatch } = useFoodContext();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [cost, setCost] = useState('');

  const handleAddFoodItem = () => {
    if (!name || !calories || !protein || !cost) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newFoodItem = {
      id: Date.now().toString(),
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

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" />
      <TextInput placeholder="Protein" value={protein} onChangeText={setProtein} keyboardType="numeric" />
      <TextInput placeholder="Cost" value={cost} onChangeText={setCost} keyboardType="numeric" />
      <Button title="Add Food Item" onPress={handleAddFoodItem} />
    </View>
  );
}