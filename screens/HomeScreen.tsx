import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { useFoodContext } from '../context/FoodContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import NutrientTracker from '../components/NutrientTracker';
import { styles, getDynamicStyles } from '../styles/HomeScreenStyles';
import Toast from 'react-native-toast-message';
import { CommonStyles } from '../styles/CommonStyles';
import CustomHeader from '../components/CustomHeader';

import { NavigationProp } from '@react-navigation/native';
import { darkTheme, lightTheme } from '../styles/themes';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { state: { foodItems }, dispatch } = useFoodContext();
  const { currency } = useCurrency();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [dailyBudget, setDailyBudget] = useState(0);

  useEffect(() => {
    const fetchDailyBudget = async () => {
      try {
        const budget = await AsyncStorage.getItem('dailyBudget');
        if (budget) {
          setDailyBudget(parseFloat(budget));
        }
      } catch (error) {
        console.error('Failed to fetch daily budget:', error);
        // Display a toast message for the error
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch daily budget. Please try again.',
        });
      }
    };
    fetchDailyBudget();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
      },
      headerTintColor: isDarkMode ? darkTheme.text : lightTheme.text,
    });
  }, [isDarkMode, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  const totalCost = foodItems.reduce((sum, item) => sum + item.cost, 0);
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodItems.reduce((sum, item) => sum + (item.carbs || 0), 0); // Assuming carbs is a property of foodItems
  const moneyLeft = dailyBudget - totalCost;

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_FOOD_ITEM', payload: id });
  };

  const renderItem = ({ item }: { item: { id: number; name: string; calories: number; protein: number; cost: number } }) => (
    <View style={[styles.item, getDynamicStyles(isDarkMode).item]}>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemText, getDynamicStyles(isDarkMode).itemText]}>{item.name}</Text>
        <Text style={[styles.itemSubText, getDynamicStyles(isDarkMode).itemSubText]}>Calories: {item.calories}</Text>
        <Text style={[styles.itemSubText, getDynamicStyles(isDarkMode).itemSubText]}>Protein: {item.protein}g</Text>
        <Text style={[styles.itemSubText, getDynamicStyles(isDarkMode).itemSubText]}>Cost: {currency}{item.cost}</Text>
      </View>
      <CustomButton
        title="Delete"
        onPress={() => handleDelete(item.id)}
        style={getDynamicStyles(isDarkMode).deleteButton} // Ensure this style exists in your dynamic styles
      />
    </View>
  );

  return (
    <View style={[styles.container, getDynamicStyles(isDarkMode).container]}>
      {/* Custom Header */}
      <CustomHeader title="Calorie Tracker" isDarkMode={isDarkMode} />

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[CommonStyles.infoContainer, getDynamicStyles(isDarkMode).infoContainer]}>
        <Text style={[CommonStyles.infoText, getDynamicStyles(isDarkMode).infoText]}>Money Spent Today</Text>
        <Text style={[CommonStyles.infoValue, getDynamicStyles(isDarkMode).infoValue]}>{currency}{totalCost.toFixed(2)}</Text>
      </View>

      <View style={[CommonStyles.infoContainer, getDynamicStyles(isDarkMode).infoContainer]}>
        <Text style={[CommonStyles.infoText, getDynamicStyles(isDarkMode).infoText]}>Money Left for Spending Today</Text>
        <Text style={[CommonStyles.infoValue, getDynamicStyles(isDarkMode).infoValue]}>{currency}{moneyLeft.toFixed(2)}</Text>
      </View>

      <NutrientTracker totalCalories={totalCalories} totalProtein={totalProtein} totalCarbs={totalCarbs} />

      <Text style={[styles.addedFoodTitle, getDynamicStyles(isDarkMode).addedFoodTitle]}>Added Food Items</Text>
      {foodItems.length === 0 ? (
        <Text style={[styles.noItemsText, getDynamicStyles(isDarkMode).noItemsText]}>No added items yet.</Text>
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

export default HomeScreen;