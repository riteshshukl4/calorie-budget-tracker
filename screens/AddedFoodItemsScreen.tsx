import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFoodContext } from '../context/FoodContext';

const AddedFoodItemsScreen = () => {
  const { state: { foodItems } } = useFoodContext();

  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Added Food Items</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noItemsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default AddedFoodItemsScreen;