import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFoodContext } from '../context/FoodContext';

const HomeScreen = () => {
  const { state: { foodItems }, dispatch } = useFoodContext();

  const totalCost = foodItems.reduce((sum, item) => sum + item.cost, 0);
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_FOOD_ITEM', payload: id });
  };

  const renderItem = ({ item }: { item: { id: number; name: string; calories: number; protein: number; cost: number } }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemSubText}>Calories: {item.calories}</Text>
        <Text style={styles.itemSubText}>Protein: {item.protein}g</Text>
        <Text style={styles.itemSubText}>Cost: ${item.cost}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome User</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Money Spent Today</Text>
        <Text style={styles.infoValue}>${totalCost.toFixed(2)}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Calories Consumed</Text>
          <Text style={styles.statValue}>{totalCalories}</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Protein Intake</Text>
          <Text style={styles.statValue}>{totalProtein}g</Text>
        </View>
      </View>

      <Text style={styles.addedFoodTitle}>Added Food Items</Text>
      {foodItems.length === 0 ? (
        <Text style={styles.noItemsText}>No added items yet.</Text>
      ) : (
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBlock: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '45%',
  },
  statText: {
    fontSize: 16,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addedFoodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  noItemsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;