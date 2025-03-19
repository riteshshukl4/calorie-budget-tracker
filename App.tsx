import React, { Suspense, lazy, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { FoodProvider } from './context/FoodContext';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Text, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import toastConfig from './styles/toastConfig';


const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AddFoodItemScreen = lazy(() => import('./screens/AddFoodItemScreen'));
const QuickAddScreen = lazy(() => import('./screens/QuickAddScreen'));
const StatisticsScreen = lazy(() => import('./screens/StatisticsScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Perform any necessary loading tasks here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a loading task
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <FoodProvider>
          <NavigationContainer>
          <Toast config ={toastConfig} />
            <Suspense fallback={<Text>Loading...</Text>}>
              <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ 
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="home" color={color} size={size} />
                    ),
                    headerTitle: 'Home', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
                <Tab.Screen
                  name="Quick Add"
                  component={QuickAddScreen}
                  options={{ 
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="fast-food" color={color} size={size} />
                    ),
                    headerTitle: 'Quick Add', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
                <Tab.Screen
                  name="Add Food"
                  component={AddFoodItemScreen}
                  options={{ 
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="add-circle" color={color} size={size} />
                    ),
                    headerTitle: 'Add Food Item', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
                <Tab.Screen
                  name="Statistics"
                  component={StatisticsScreen}
                  options={{ 
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="stats-chart" color={color} size={size} />
                    ),
                    headerTitle: 'Statistics', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
                <Tab.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{ 
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="settings" color={color} size={size} />
                    ),
                    headerTitle: 'Settings', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
              </Tab.Navigator>
            </Suspense>
          </NavigationContainer>
        </FoodProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
