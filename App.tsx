import React, { Suspense, lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';
import { FoodProvider } from './context/FoodContext';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { Text } from 'react-native';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AddFoodItemScreen = lazy(() => import('./screens/AddFoodItemScreen'));
const QuickAddScreen = lazy(() => import('./screens/QuickAddScreen'));
const StatisticsScreen = lazy(() => import('./screens/StatisticsScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <FoodProvider>
          <NavigationContainer>
            <Suspense fallback={<Text>Loading...</Text>}>
              <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ 
                    headerTitle: 'Welcome User', 
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center' // Center align the header title
                  }}
                />
                <Tab.Screen name="Quick Add" component={QuickAddScreen} 
                 options={{ 
                  headerTitle: 'Quick Add', 
                  headerTitleStyle: { fontWeight: 'bold' },
                  headerTitleAlign: 'center' // Center align the header title
                }}/>
                <Tab.Screen name="Add Food" component={AddFoodItemScreen} 
                 options={{ 
                  headerTitle: 'Add Food Item', 
                  headerTitleStyle: { fontWeight: 'bold' },
                  headerTitleAlign: 'center' // Center align the header title
                }}/>
                <Tab.Screen name="Statistics" component={StatisticsScreen} 
                 options={{ 
                  headerTitle: 'Statistics', 
                  headerTitleStyle: { fontWeight: 'bold' },
                  headerTitleAlign: 'center' // Center align the header title
                }}/>
                <Tab.Screen name="Settings" component={SettingsScreen} 
                 options={{ 
                  headerTitle: 'Settings', 
                  headerTitleStyle: { fontWeight: 'bold' },
                  headerTitleAlign: 'center' // Center align the header title
                }}/>
              </Tab.Navigator>
            </Suspense>
          </NavigationContainer>
        </FoodProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
