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
    dispatch({ type: 'ADD_FOOD_ITEM', payload: item });
    handleDelete(item.id);
  };

  const renderItem = ({ item }: { item: { id: number; name: string; calories: number; protein: number; cost: number } }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemSubText}>Calories: {item.calories}</Text>
        <Text style={styles.itemSubText}>Protein: {item.protein}g</Text>
        <Text style={styles.itemSubText}>Cost: ${item.cost}</Text>
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
      <Text style={styles.title}>Quick Add Screen</Text>
      <Text style={styles.currency}>Current Currency: {currency}</Text>
      {quickAddItems.length === 0 ? (
        <Text style={styles.noItemsText}>No quick add items yet.</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto_700Bold',
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