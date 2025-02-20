import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.tabBar, isDarkMode && styles.darkTabBar]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

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
        const textColor = isFocused ? (isDarkMode ? '#fff' : '#673ab7') : (isDarkMode ? '#aaa' : '#222');

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name={iconName(route.name, isFocused)} size={24} color={iconColor} />
            <Text style={{ color: textColor }}>{label as string}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  darkTabBar: {
    backgroundColor: '#333',
    borderTopColor: '#555',
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