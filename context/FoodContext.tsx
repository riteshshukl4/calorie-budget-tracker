import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  cost: number;
}

interface State {
  foodItems: FoodItem[];
  quickAddItems: FoodItem[];
}

type Action =
  | { type: 'ADD_FOOD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_FOOD_ITEM'; payload: number }
  | { type: 'SET_FOOD_ITEMS'; payload: FoodItem[] }
  | { type: 'ADD_QUICK_ADD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_QUICK_ADD_ITEM'; payload: number };

const initialState: State = {
  foodItems: [],
  quickAddItems: [],
};

const FoodContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const foodReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_FOOD_ITEM':
      return { ...state, foodItems: [...state.foodItems, action.payload] };
    case 'REMOVE_FOOD_ITEM':
      return { ...state, foodItems: state.foodItems.filter(item => item.id !== action.payload) };
    case 'SET_FOOD_ITEMS':
      return { ...state, foodItems: action.payload };
    case 'ADD_QUICK_ADD_ITEM':
      return { ...state, quickAddItems: [...state.quickAddItems, action.payload] };
    case 'REMOVE_QUICK_ADD_ITEM':
      return { ...state, quickAddItems: state.quickAddItems.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

interface FoodProviderProps {
  children: ReactNode;
}

export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
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

  return (
    <FoodContext.Provider value={{ state, dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodContext = () => useContext(FoodContext);