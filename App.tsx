import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DailyIntakeScreen from './screens/DailyIntakeScreen';
import AddFoodItemScreen from './screens/AddFoodItemScreen';
import AddedFoodItemsScreen from './screens/AddedFoodItemsScreen';
import CustomTabBar from './components/CustomTabBar';
import { FoodProvider } from './context/FoodContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FoodProvider>
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Daily Intake" component={DailyIntakeScreen} />
        <Tab.Screen name="Add Food" component={AddFoodItemScreen} />
        <Tab.Screen name="Added Foods" component={AddedFoodItemsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </FoodProvider>
  );
}