import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/context/AppContext';
import MainFeedScreen from './src/screens/MainFeedScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import AddEditRecipeScreen from './src/screens/AddEditRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainFeed"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainFeed" component={MainFeedScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
          <Stack.Screen
            name="AddEditRecipe"
            component={AddEditRecipeScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
