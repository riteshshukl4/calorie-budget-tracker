import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCurrency } from '../context/CurrencyContext';

const StatisticsScreen = () => {
  const { currency } = useCurrency();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.currency}>Current Currency: {currency}</Text>
      {/* Display statistics */}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto_700Bold',
  },
  currency: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default StatisticsScreen;