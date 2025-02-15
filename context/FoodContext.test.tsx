import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodProvider, useFoodContext } from './FoodContext';

describe('FoodContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a food item', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <FoodProvider>{children}</FoodProvider>;
    const { result } = renderHook(() => useFoodContext(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'ADD_FOOD_ITEM',
        payload: { id: '1', name: 'Apple', calories: 95, protein: 0.5, cost: 0.5 },
      });
    });

    expect(result.current.state.foodItems).toHaveLength(1);
    expect(result.current.state.foodItems[0].name).toBe('Apple');
  });

  it('should remove a food item', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <FoodProvider>{children}</FoodProvider>;
    const { result } = renderHook(() => useFoodContext(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'ADD_FOOD_ITEM',
        payload: { id: '1', name: 'Apple', calories: 95, protein: 0.5, cost: 0.5 },
      });
    });

    act(() => {
      result.current.dispatch({ type: 'REMOVE_FOOD_ITEM', payload: '1' });
    });

    expect(result.current.state.foodItems).toHaveLength(0);
  });

  it('should set food items from storage', async () => {
    const storedFoodItems = [{ id: '1', name: 'Banana', calories: 105, protein: 1.3, cost: 0.3 }];
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce(JSON.stringify(storedFoodItems));

    const wrapper = ({ children }: { children: React.ReactNode }) => <FoodProvider>{children}</FoodProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useFoodContext(), { wrapper });

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.state.foodItems).toEqual(storedFoodItems);
  });
});