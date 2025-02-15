import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './app/(tabs)/index';

const App = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

export default App;