import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FoodItem } from '../models/FoodItem';

const DailyIntakeScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const foodItems: FoodItem[] = []; // Fetch food items for today (e.g., from AsyncStorage or a state management library)

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
  const totalCost = foodItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Intake</Text>
      <Text>Total Calories: {totalCalories}</Text>
      <Text>Total Protein: {totalProtein}</Text>
      <Text>Total Cost: {totalCost}</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Protein: {item.protein}</Text>
            <Text>Cost: {item.cost}</Text>
          </View>
        )}
      />
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
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DailyIntakeScreen;