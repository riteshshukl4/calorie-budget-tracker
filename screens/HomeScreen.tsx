import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useFoodContext } from '../context/FoodContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationProp } from '@react-navigation/native';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state: { foodItems }, dispatch } = useFoodContext();
  const { currency } = useCurrency();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [dailyBudget, setDailyBudget] = useState(0);

  useEffect(() => {
    const fetchDailyBudget = async () => {
      const budget = await AsyncStorage.getItem('dailyBudget');
      if (budget) {
        setDailyBudget(parseFloat(budget));
      }
    };
    fetchDailyBudget();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#1c1c1e' : '#f8f9fa',
      },
      headerTintColor: isDarkMode ? '#f2f2f7' : '#333',
    });
  }, [isDarkMode, navigation]);

  const totalCost = foodItems.reduce((sum, item) => sum + item.cost, 0);
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
  const moneyLeft = dailyBudget - totalCost;

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_FOOD_ITEM', payload: id });
  };

  const renderItem = ({ item }: { item: { id: number; name: string; calories: number; protein: number; cost: number } }) => (
    <View style={[styles.item, isDarkMode && styles.darkItem]}>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemText, isDarkMode && styles.darkItemText]}>{item.name}</Text>
        <Text style={[styles.itemSubText, isDarkMode && styles.darkItemSubText]}>Calories: {item.calories}</Text>
        <Text style={[styles.itemSubText, isDarkMode && styles.darkItemSubText]}>Protein: {item.protein}g</Text>
        <Text style={[styles.itemSubText, isDarkMode && styles.darkItemSubText]}>Cost: {currency}{item.cost}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.infoContainer, isDarkMode && styles.darkInfoContainer]}>
        <Text style={[styles.infoText, isDarkMode && styles.darkInfoText]}>Money Spent Today</Text>
        <Text style={[styles.infoValue, isDarkMode && styles.darkInfoValue]}>{currency}{totalCost.toFixed(2)}</Text>
      </View>

      <View style={[styles.infoContainer, isDarkMode && styles.darkInfoContainer]}>
        <Text style={[styles.infoText, isDarkMode && styles.darkInfoText]}>Money Left for Spending Today</Text>
        <Text style={[styles.infoValue, isDarkMode && styles.darkInfoValue]}>{currency}{moneyLeft.toFixed(2)}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBlock, isDarkMode && styles.darkStatBlock]}>
          <Text style={[styles.statText, isDarkMode && styles.darkStatText]}>Calories Consumed</Text>
          <Text style={[styles.statValue, isDarkMode && styles.darkStatValue]}>{totalCalories}</Text>
        </View>
        <View style={[styles.statBlock, isDarkMode && styles.darkStatBlock]}>
          <Text style={[styles.statText, isDarkMode && styles.darkStatText]}>Protein Intake</Text>
          <Text style={[styles.statValue, isDarkMode && styles.darkStatValue]}>{totalProtein}g</Text>
        </View>
      </View>

      <Text style={[styles.addedFoodTitle, isDarkMode && styles.darkAddedFoodTitle]}>Added Food Items</Text>
      {foodItems.length === 0 ? (
        <Text style={[styles.noItemsText, isDarkMode && styles.darkNoItemsText]}>No added items yet.</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#1c1c1e',
  },
  infoContainer: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
    backgroundColor: '#fff',
  },
  darkInfoContainer: {
    backgroundColor: '#2c2c2e',
    borderColor: '#3a3a3c',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  darkInfoText: {
    color: '#f2f2f7',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
  },
  darkInfoValue: {
    color: '#f2f2f7',
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
    backgroundColor: '#fff',
  },
  darkStatBlock: {
    backgroundColor: '#2c2c2e',
    borderColor: '#3a3a3c',
  },
  statText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  darkStatText: {
    color: '#f2f2f7',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  darkStatValue: {
    color: '#f2f2f7',
  },
  addedFoodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  darkAddedFoodTitle: {
    color: '#f2f2f7',
  },
  noItemsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  darkNoItemsText: {
    color: '#aaa',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    backgroundColor: '#fff',
  },
  darkItem: {
    borderBottomColor: '#3a3a3c',
    backgroundColor: '#2c2c2e',
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  darkItemText: {
    color: '#f2f2f7',
  },
  itemSubText: {
    fontSize: 14,
    color: '#555',
  },
  darkItemSubText: {
    color: '#aaa',
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