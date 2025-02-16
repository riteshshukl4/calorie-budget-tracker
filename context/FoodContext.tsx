import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  cost: number;
}

type State = {
  foodItems: FoodItem[];
};

type Action =
  | { type: 'ADD_FOOD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_FOOD_ITEM'; payload: number } // Changed payload type from string to number
  | { type: 'SET_FOOD_ITEMS'; payload: FoodItem[] };

const initialState: State = {
  foodItems: [],
};

const FoodContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const foodReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_FOOD_ITEM':
      return { ...state, foodItems: [...state.foodItems, action.payload] };
    case 'REMOVE_FOOD_ITEM':
      return { ...state, foodItems: state.foodItems.filter(item => item.id !== action.payload) };
    case 'SET_FOOD_ITEMS':
      return { ...state, foodItems: action.payload };
    default:
      return state;
  }
};

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(foodReducer, initialState);

  useEffect(() => {
    const loadFoodItems = async () => {
      try {
        const storedFoodItems = await AsyncStorage.getItem('foodItems');
        if (storedFoodItems) {
          dispatch({ type: 'SET_FOOD_ITEMS', payload: JSON.parse(storedFoodItems) });
        }
      } catch (error) {
        console.error('Failed to load food items from storage', error);
      }
    };

    loadFoodItems();
  }, []);

  useEffect(() => {
    const saveFoodItems = async () => {
      try {
        await AsyncStorage.setItem('foodItems', JSON.stringify(state.foodItems));
      } catch (error) {
        console.error('Failed to save food items to storage', error);
      }
    };

    saveFoodItems();
  }, [state.foodItems]);

  return <FoodContext.Provider value={{ state, dispatch }}>{children}</FoodContext.Provider>;
};

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};