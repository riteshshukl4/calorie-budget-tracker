import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddFoodItemScreen from './screens/AddFoodItemScreen';
import QuickAddScreen from './screens/QuickAddScreen';
import CustomTabBar from './components/CustomTabBar';
import { FoodProvider } from './context/FoodContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FoodProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Food" component={AddFoodItemScreen} />
          <Tab.Screen name="Quick Add" component={QuickAddScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FoodProvider>
  );
}
