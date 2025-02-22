import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFoodContext } from '../context/FoodContext';
import { useCurrency } from '../context/CurrencyContext';

const QuickAddScreen = () => {
  const { state: { quickAddItems }, dispatch } = useFoodContext();
  const { currency } = useCurrency();

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_QUICK_ADD_ITEM', payload: id });
  };

  const handleAddToHome = (item: { id: number; name: string; calories: number; protein: number; cost: number }) => {
    dispatch({ type: 'ADD_FOOD_ITEM', payload: { ...item, date: new Date().toISOString() } });
    handleDelete(item.id);
  };

  const renderItem = ({ item }: { item: { id: number; name: string; calories: number; protein: number; cost: number } }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemSubText}>Calories: {item.calories}</Text>
        <Text style={styles.itemSubText}>Protein: {item.protein}g</Text>
        <Text style={styles.itemSubText}>Cost: {currency}{item.cost}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleAddToHome(item)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {quickAddItems.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No quick items added yet :(</Text>
          <TouchableOpacity style={styles.quickAddButton}>
            <Text style={styles.quickAddButtonText}>Quick Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={quickAddItems}
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
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  noItemsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  quickAddButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  quickAddButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
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
  currency: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default QuickAddScreen;