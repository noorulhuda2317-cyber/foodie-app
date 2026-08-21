# Foodie — Recipe App (React Native / Expo)

Browse recipes by category, view full recipe details, favorite recipes, and manage your own
recipes (add / edit / delete) — all in one Expo app.

## Tech
- Expo SDK 51, React Native 0.74
- React Navigation (native-stack)
- Context API + AsyncStorage for state/persistence (favorites & user recipes survive app restarts)
- expo-image-picker for uploading recipe photos

## Run locally
```
npm install
npx expo start
```
Then scan the QR code with **Expo Go**, or press `w` for web.

## Grading criteria → where to find it
1. Standard Expo project, importable via Snack's "Import Git Repository".
2. Main feed (`MainFeedScreen`) shows 11 horizontally scrollable categories + "My Food" (12 total).
3. Tapping a recipe opens `RecipeDetailScreen`: ingredients, instructions, prep time, servings,
   calories, difficulty.
4. Tapping a category filters the feed to that category's recipes.
5. Heart icon on every recipe card / detail page toggles favorite (❤️ / 🤍).
6. Favorited recipes appear in the Favorites screen (heart icon in the main feed header).
7. "My Food" tab in the category bar opens `MyRecipesScreen`, which includes "Add New Recipe".
8. `AddEditRecipeScreen`: name, image upload, dynamic ingredients list, dynamic step-by-step
   instructions, and a "Save Recipe" button.
9. Newly saved recipes appear immediately in "My Recipes".
10. Tapping a recipe in "My Recipes" opens the full detail page (name, image, ingredients,
    instructions, etc).
11. Each recipe in "My Recipes" has functional **Edit** and **Delete** buttons.
12. Every inner screen has a working back button (custom back arrow or native header back).

## Project structure
```
App.js
src/
  context/AppContext.js       — global state (favorites, user recipes) + AsyncStorage
  data/recipesData.js         — 11 built-in categories, 22 seed recipes
  components/RecipeCard.js
  components/CategoryPill.js
  screens/MainFeedScreen.js
  screens/RecipeDetailScreen.js
  screens/FavoritesScreen.js
  screens/MyRecipesScreen.js
  screens/AddEditRecipeScreen.js
```
