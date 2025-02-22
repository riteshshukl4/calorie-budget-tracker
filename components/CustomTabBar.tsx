import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.tabBarContainer, isDarkMode && styles.darkTabBarContainer]}>
      <View style={[styles.tabBar, isDarkMode && styles.darkTabBar]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconName = (routeName: string, focused: boolean) => {
            switch (routeName) {
              case 'Home':
                return focused ? 'home' : 'home-outline';
              case 'Quick Add':
                return focused ? 'fast-food' : 'fast-food-outline';
              case 'Add Food':
                return focused ? 'add-circle' : 'add-circle-outline';
              case 'Statistics':
                return focused ? 'stats-chart' : 'stats-chart-outline';
              case 'Settings':
                return focused ? 'settings' : 'settings-outline';
              default:
                return 'ellipse';
            }
          };

          const iconColor = isFocused ? (isDarkMode ? '#fff' : '#673ab7') : (isDarkMode ? '#aaa' : '#222');

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <Ionicons name={iconName(route.name, isFocused)} size={24} color={iconColor} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom position to make it float
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Add horizontal padding
  },
  darkTabBarContainer: {
    backgroundColor: 'transparent', // Make the container background transparent
  },
  tabBar: {
    flexDirection: 'row',
    height: 60, // Adjust the height to make it smaller
    width: width - 40, // Adjust the width to add more padding
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#8A9BB040',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 }, // Adjust shadow offset
    shadowRadius: 20, // Adjust shadow radius
    elevation: 20, // Adjust elevation
    paddingHorizontal: 10, // Add horizontal padding inside the tab bar
  },
  darkTabBar: {
    backgroundColor: '#22242E',
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedTab: {
    backgroundColor: '#e0e0e0',
  },
});

export default CustomTabBar;