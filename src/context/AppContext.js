import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_RECIPES } from '../data/recipesData';

const AppContext = createContext(null);

const FAVORITES_KEY = 'foodie:favorites';
const USER_RECIPES_KEY = 'foodie:userRecipes';

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // array of recipe ids
  const [userRecipes, setUserRecipes] = useState([]); // recipes added by the user
  const [loaded, setLoaded] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    (async () => {
      try {
        const favRaw = await AsyncStorage.getItem(FAVORITES_KEY);
        const userRaw = await AsyncStorage.getItem(USER_RECIPES_KEY);
        if (favRaw) setFavorites(JSON.parse(favRaw));
        if (userRaw) setUserRecipes(JSON.parse(userRaw));
      } catch (e) {
        console.log('Failed to load persisted data', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(userRecipes)).catch(() => {});
  }, [userRecipes, loaded]);

  const allRecipes = [...INITIAL_RECIPES, ...userRecipes];

  const getRecipeById = useCallback(
    (id) => allRecipes.find((r) => r.id === id),
    [allRecipes]
  );

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const addRecipe = useCallback((recipe) => {
    const newRecipe = {
      ...recipe,
      id: 'user-' + Date.now().toString(),
      category: 'My Food',
      source: 'user',
    };
    setUserRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  }, []);

  const editRecipe = useCallback((id, updates) => {
    setUserRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const deleteRecipe = useCallback((id) => {
    setUserRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((f) => f !== id));
  }, []);

  const value = {
    builtInRecipes: INITIAL_RECIPES,
    userRecipes,
    allRecipes,
    favorites,
    getRecipeById,
    toggleFavorite,
    isFavorite,
    addRecipe,
    editRecipe,
    deleteRecipe,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
