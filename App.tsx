import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FoodProvider } from './context/FoodContext';
import HomeScreen from './screens/HomeScreen';
import DailyIntakeScreen from './screens/DailyIntakeScreen';
import AddFoodItemScreen from './screens/AddFoodItemScreen';
import AddedFoodItemsScreen from './screens/AddedFoodItemsScreen'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FoodProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Daily Intake" component={DailyIntakeScreen} />
          <Tab.Screen name="Add Food Item" component={AddFoodItemScreen} />
          <Tab.Screen name="Added Food Items" component={AddedFoodItemsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FoodProvider>
  );
}