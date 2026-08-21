import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const CATEGORIES = [
  "All", "Breakfast", "Lunch", "Dinner", "Desserts",
  "Italian", "Asian", "Mexican", "Healthy", "Drinks", "Snacks", "My Food"
];

const SEED_RECIPES = [
  {
    id: "1", name: "Avocado Toast", category: "Breakfast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80",
    ingredients: ["2 slices whole-grain bread", "1 ripe avocado", "1 egg", "Salt and pepper", "Chili flakes"],
    instructions: ["Toast the bread.", "Mash the avocado with salt and pepper.", "Cook the egg to your preference.", "Spread avocado on toast and top with egg.", "Finish with chili flakes."],
    prepTime: "10 min", servings: 1, calories: 320, difficulty: "Easy"
  },
  {
    id: "2", name: "Chicken Pasta", category: "Italian",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    ingredients: ["200g pasta", "200g chicken breast", "1 cup cream", "2 cloves garlic", "Parmesan", "Olive oil"],
    instructions: ["Boil pasta until al dente.", "Sauté sliced chicken in olive oil.", "Add garlic and cook for 1 minute.", "Stir in cream and Parmesan.", "Toss with pasta and serve."],
    prepTime: "30 min", servings: 2, calories: 620, difficulty: "Medium"
  },
  {
    id: "3", name: "Berry Pancakes", category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
    ingredients: ["1 cup flour", "1 tbsp sugar", "1 tsp baking powder", "1 egg", "3/4 cup milk", "Mixed berries"],
    instructions: ["Mix dry ingredients.", "Whisk egg and milk.", "Combine wet and dry ingredients.", "Cook small pancakes on a hot pan.", "Serve with berries."],
    prepTime: "20 min", servings: 3, calories: 410, difficulty: "Easy"
  },
  {
    id: "4", name: "Chicken Tacos", category: "Mexican",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80",
    ingredients: ["6 tortillas", "250g chicken", "Lettuce", "Tomato", "Cheese", "Salsa"],
    instructions: ["Season and cook the chicken.", "Warm the tortillas.", "Fill with chicken, lettuce and tomato.", "Add cheese and salsa.", "Serve immediately."],
    prepTime: "25 min", servings: 3, calories: 480, difficulty: "Easy"
  },
  {
    id: "5", name: "Sushi Bowl", category: "Asian",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    ingredients: ["2 cups cooked rice", "150g salmon", "Cucumber", "Avocado", "Soy sauce", "Sesame seeds"],
    instructions: ["Cook and cool the rice.", "Slice salmon, cucumber and avocado.", "Place rice in a bowl.", "Arrange toppings over rice.", "Drizzle soy sauce and sesame seeds."],
    prepTime: "25 min", servings: 2, calories: 520, difficulty: "Medium"
  },
  {
    id: "6", name: "Greek Salad", category: "Healthy",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Cucumber", "Tomatoes", "Feta cheese", "Olives", "Red onion", "Olive oil"],
    instructions: ["Chop vegetables.", "Combine vegetables and olives.", "Add feta.", "Dress with olive oil.", "Toss gently and serve."],
    prepTime: "15 min", servings: 2, calories: 280, difficulty: "Easy"
  },
  {
    id: "7", name: "Chocolate Cake", category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    ingredients: ["1 1/2 cups flour", "1 cup sugar", "1/2 cup cocoa", "2 eggs", "1 cup milk", "1/2 cup oil"],
    instructions: ["Preheat oven to 180°C.", "Mix dry ingredients.", "Whisk wet ingredients.", "Combine wet and dry mixtures.", "Bake for 30–35 minutes and cool."],
    prepTime: "50 min", servings: 8, calories: 390, difficulty: "Medium"
  },
  {
    id: "8", name: "Mango Smoothie", category: "Drinks",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80",
    ingredients: ["1 mango", "1 cup yogurt", "1/2 cup milk", "1 tsp honey", "Ice"],
    instructions: ["Peel and chop mango.", "Add all ingredients to a blender.", "Blend until smooth.", "Taste and add honey if needed.", "Serve chilled."],
    prepTime: "5 min", servings: 2, calories: 210, difficulty: "Easy"
  },
  {
    id: "9", name: "Garlic Bread", category: "Snacks",
    image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=900&q=80",
    ingredients: ["1 baguette", "4 tbsp butter", "3 cloves garlic", "Parsley", "Parmesan"],
    instructions: ["Mix softened butter with garlic and parsley.", "Slice the baguette.", "Spread garlic butter over slices.", "Top with Parmesan.", "Bake until golden."],
    prepTime: "20 min", servings: 4, calories: 260, difficulty: "Easy"
  },
  {
    id: "10", name: "Chicken Rice Bowl", category: "Lunch",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    ingredients: ["2 cups cooked rice", "250g chicken", "Carrot", "Cucumber", "Soy sauce", "Sesame oil"],
    instructions: ["Cook seasoned chicken.", "Slice carrot and cucumber.", "Place rice in bowls.", "Add chicken and vegetables.", "Finish with soy sauce and sesame oil."],
    prepTime: "30 min", servings: 2, calories: 540, difficulty: "Medium"
  },
  {
    id: "11", name: "Creamy Mushroom Dinner", category: "Dinner",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    ingredients: ["250g mushrooms", "200g pasta", "1 cup cream", "Garlic", "Parmesan"],
    instructions: ["Cook pasta.", "Sauté mushrooms and garlic.", "Add cream and simmer.", "Stir in Parmesan.", "Toss with pasta and serve."],
    prepTime: "25 min", servings: 2, calories: 570, difficulty: "Medium"
  }
];

const EMPTY_FORM = {
  name: "", category: "Breakfast", image: "", ingredients: "", instructions: "",
  prepTime: "20 min", servings: "2", calories: "400", difficulty: "Easy"
};

function Chip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function RecipeCard({ recipe, favorite, onFavorite, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View style={{ flex: 1 }}>
          <Text style={styles.categoryLabel}>{recipe.category}</Text>
          <Text style={styles.cardTitle}>{recipe.name}</Text>
          <Text style={styles.meta}>{recipe.prepTime}  •  {recipe.difficulty}</Text>
        </View>
        <Pressable
          accessibilityLabel={favorite ? "Unfavorite recipe" : "Favorite recipe"}
          onPress={(e) => { e.stopPropagation?.(); onFavorite(); }}
          style={styles.heartButton}
        >
          <Text style={styles.heart}>{favorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [recipes, setRecipes] = useState(SEED_RECIPES);
  const [favorites, setFavorites] = useState([]);
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem("foodie_my_recipes");
        const savedFavorites = await AsyncStorage.getItem("foodie_favorites");
        if (savedRecipes) setRecipes(JSON.parse(savedRecipes));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.log(e);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem("foodie_my_recipes", JSON.stringify(recipes));
  }, [recipes, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem("foodie_favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    const handler = () => {
      if (screen !== "home") {
        goBack();
        return true;
      }
      return false;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", handler);
    return () => sub.remove();
  }, [screen, selectedRecipe]);

  const myRecipes = useMemo(() => recipes.filter(r => r.isMine), [recipes]);
  const favoriteRecipes = useMemo(() => recipes.filter(r => favorites.includes(r.id)), [recipes, favorites]);

  const visibleRecipes = useMemo(() => {
    if (selectedCategory === "My Food") return [];
    if (selectedCategory === "All") return recipes;
    return recipes.filter(r => r.category === selectedCategory);
  }, [recipes, selectedCategory]);

  function goBack() {
    if (screen === "detail" && selectedRecipe) {
      setScreen("home");
      setSelectedRecipe(null);
      return;
    }
    if (screen === "form") {
      setScreen("myRecipes");
      setEditingId(null);
      setForm(EMPTY_FORM);
      return;
    }
    if (screen === "myRecipes" || screen === "favorites") {
      setScreen("home");
      return;
    }
    setScreen("home");
  }

  function openRecipe(recipe) {
    setSelectedRecipe(recipe);
    setScreen("detail");
  }

  function toggleFavorite(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setScreen("form");
  }

  function openEdit(recipe) {
    setEditingId(recipe.id);
    setForm({
      name: recipe.name,
      category: recipe.category,
      image: recipe.image,
      ingredients: recipe.ingredients.join("\n"),
      instructions: recipe.instructions.join("\n"),
      prepTime: recipe.prepTime,
      servings: String(recipe.servings),
      calories: String(recipe.calories),
      difficulty: recipe.difficulty
    });
    setScreen("form");
  }

  function deleteRecipe(id) {
    Alert.alert("Delete recipe", "Are you sure you want to delete this recipe?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: () => {
          setRecipes(prev => prev.filter(r => r.id !== id));
          setFavorites(prev => prev.filter(x => x !== id));
        }
      }
    ]);
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow photo-library access to choose an image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setForm(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  }

  function saveRecipe() {
    if (!form.name.trim()) return Alert.alert("Missing name", "Enter a recipe name.");
    if (!form.ingredients.trim()) return Alert.alert("Missing ingredients", "Enter at least one ingredient.");
    if (!form.instructions.trim()) return Alert.alert("Missing instructions", "Enter step-by-step instructions.");

    const data = {
      name: form.name.trim(),
      category: form.category,
      image: form.image || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      ingredients: form.ingredients.split("\n").map(x => x.trim()).filter(Boolean),
      instructions: form.instructions.split("\n").map(x => x.trim()).filter(Boolean),
      prepTime: form.prepTime || "20 min",
      servings: Number(form.servings) || 2,
      calories: Number(form.calories) || 400,
      difficulty: form.difficulty || "Easy",
      isMine: true
    };

    if (editingId) {
      setRecipes(prev => prev.map(r => r.id === editingId ? { ...r, ...data } : r));
      Alert.alert("Saved", "Your recipe was updated.");
    } else {
      const newRecipe = { id: `mine-${Date.now()}`, ...data };
      setRecipes(prev => [newRecipe, ...prev]);
      Alert.alert("Saved", "Your recipe was added to My Recipes.");
    }

    setEditingId(null);
    setForm(EMPTY_FORM);
    setScreen("myRecipes");
  }

  function Header({ title, back = false }) {
    return (
      <View style={styles.header}>
        {back ? (
          <Pressable onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
        ) : <View style={{ width: 40 }} />}
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>
    );
  }

  function Home() {
    return (
      <View style={styles.container}>
        <Header title="Foodie" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>DISCOVER & COOK</Text>
            <Text style={styles.heroTitle}>What are you craving today?</Text>
            <Text style={styles.heroSubtitle}>Browse recipes, save favorites, and create your own.</Text>
          </View>

          <TextInput
            placeholder="Search recipes..."
            placeholderTextColor="#8B8B8B"
            style={styles.search}
            onChangeText={(text) => {}}
          />

          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {CATEGORIES.map(cat => (
              <Chip
                key={cat}
                label={cat}
                selected={selectedCategory === cat}
                onPress={() => {
                  if (cat === "My Food") {
                    setScreen("myRecipes");
                  } else {
                    setSelectedCategory(cat);
                  }
                }}
              />
            ))}
          </ScrollView>

          {selectedCategory !== "My Food" && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{selectedCategory === "All" ? "Popular Recipes" : selectedCategory}</Text>
                <Text style={styles.count}>{visibleRecipes.length} recipes</Text>
              </View>
              <View style={styles.grid}>
                {visibleRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    favorite={favorites.includes(recipe.id)}
                    onFavorite={() => toggleFavorite(recipe.id)}
                    onPress={() => openRecipe(recipe)}
                  />
                ))}
              </View>
            </>
          )}

          <View style={styles.quickRow}>
            <Pressable style={styles.quickCard} onPress={() => setScreen("favorites")}>
              <Text style={styles.quickIcon}>♥</Text>
              <Text style={styles.quickTitle}>Favorites</Text>
              <Text style={styles.quickMeta}>{favoriteRecipes.length} saved</Text>
            </Pressable>
            <Pressable style={styles.quickCard} onPress={() => setScreen("myRecipes")}>
              <Text style={styles.quickIcon}>＋</Text>
              <Text style={styles.quickTitle}>My Recipes</Text>
              <Text style={styles.quickMeta}>{myRecipes.length} created</Text>
            </Pressable>
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  function Detail() {
    const r = selectedRecipe;
    if (!r) return null;
    return (
      <View style={styles.container}>
        <Header title="Recipe Details" back />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: r.image }} style={styles.detailImage} />
          <View style={styles.detailBody}>
            <View style={styles.detailTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.categoryLabel}>{r.category}</Text>
                <Text style={styles.detailTitle}>{r.name}</Text>
              </View>
              <Pressable style={styles.bigHeart} onPress={() => toggleFavorite(r.id)}>
                <Text style={styles.bigHeartText}>{favorites.includes(r.id) ? "♥" : "♡"}</Text>
              </Pressable>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}><Text style={styles.statValue}>{r.prepTime}</Text><Text style={styles.statLabel}>Prep time</Text></View>
              <View style={styles.stat}><Text style={styles.statValue}>{r.servings}</Text><Text style={styles.statLabel}>Servings</Text></View>
              <View style={styles.stat}><Text style={styles.statValue}>{r.calories}</Text><Text style={styles.statLabel}>Calories</Text></View>
              <View style={styles.stat}><Text style={styles.statValue}>{r.difficulty}</Text><Text style={styles.statLabel}>Difficulty</Text></View>
            </View>

            <Text style={styles.detailSection}>Ingredients</Text>
            {r.ingredients.map((item, i) => <Text key={i} style={styles.ingredient}>• {item}</Text>)}

            <Text style={styles.detailSection}>Instructions</Text>
            {r.instructions.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{i + 1}</Text></View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            {r.isMine && (
              <View style={styles.editActions}>
                <Pressable style={styles.primaryButton} onPress={() => openEdit(r)}>
                  <Text style={styles.primaryButtonText}>Edit Recipe</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => deleteRecipe(r.id)}>
                  <Text style={styles.deleteButtonText}>Delete Recipe</Text>
                </Pressable>
              </View>
            )}
            <View style={{ height: 50 }} />
          </View>
        </ScrollView>
      </View>
    );
  }

  function MyRecipes() {
    return (
      <View style={styles.container}>
        <Header title="My Food" back />
        <ScrollView>
          <View style={styles.myHero}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitleSmall}>My Recipes</Text>
              <Text style={styles.heroSubtitle}>Create and manage your personal recipe collection.</Text>
            </View>
            <Pressable style={styles.addCircle} onPress={openAdd}><Text style={styles.addCircleText}>＋</Text></Pressable>
          </View>
          <Pressable style={styles.primaryButton} onPress={openAdd}>
            <Text style={styles.primaryButtonText}>＋ Add New Recipe</Text>
          </Pressable>
          {myRecipes.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🍳</Text>
              <Text style={styles.emptyTitle}>No recipes yet</Text>
              <Text style={styles.emptyText}>Tap “Add New Recipe” to create your first recipe.</Text>
            </View>
          ) : (
            myRecipes.map(recipe => (
              <View key={recipe.id} style={styles.myCard}>
                <Pressable style={{ flexDirection: "row", flex: 1 }} onPress={() => openRecipe(recipe)}>
                  <Image source={{ uri: recipe.image }} style={styles.myImage} />
                  <View style={{ flex: 1, paddingLeft: 12 }}>
                    <Text style={styles.categoryLabel}>{recipe.category}</Text>
                    <Text style={styles.myTitle}>{recipe.name}</Text>
                    <Text style={styles.meta}>{recipe.prepTime} • {recipe.difficulty}</Text>
                  </View>
                </Pressable>
                <View style={styles.myActions}>
                  <Pressable style={styles.smallButton} onPress={() => openEdit(recipe)}><Text>Edit</Text></Pressable>
                  <Pressable style={styles.smallDelete} onPress={() => deleteRecipe(recipe.id)}><Text style={styles.smallDeleteText}>Delete</Text></Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  function Favorites() {
    return (
      <View style={styles.container}>
        <Header title="Favorites" back />
        <ScrollView>
          <Text style={styles.pageSubtitle}>Recipes you have saved with the heart button.</Text>
          {favoriteRecipes.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>♡</Text>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyText}>Tap the heart on any recipe to save it here.</Text>
            </View>
          ) : favoriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              favorite={true}
              onFavorite={() => toggleFavorite(recipe.id)}
              onPress={() => openRecipe(recipe)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  function FormScreen() {
    const field = (label, key, placeholder, multiline = false) => (
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          value={form[key]}
          onChangeText={value => setForm(prev => ({ ...prev, [key]: value }))}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          style={[styles.input, multiline && styles.textarea]}
        />
      </View>
    );

    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Header title={editingId ? "Edit Recipe" : "Add New Recipe"} back />
        <ScrollView contentContainerStyle={styles.formContent}>
          {field("Recipe name *", "name", "e.g. My Special Pasta")}
          <Text style={styles.fieldLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
            {CATEGORIES.filter(c => !["All", "My Food"].includes(c)).map(cat => (
              <Chip key={cat} label={cat} selected={form.category === cat} onPress={() => setForm(p => ({ ...p, category: cat }))} />
            ))}
          </ScrollView>

          <Text style={styles.fieldLabel}>Image upload</Text>
          <Pressable style={styles.imageUpload} onPress={pickImage}>
            {form.image ? (
              <Image source={{ uri: form.image }} style={styles.uploadPreview} />
            ) : (
              <>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Choose image from gallery</Text>
              </>
            )}
          </Pressable>

          {field("Ingredients list *", "ingredients", "Enter one ingredient per line", true)}
          {field("Step-by-step instructions *", "instructions", "Enter one step per line", true)}
          {field("Preparation time", "prepTime", "e.g. 30 min")}
          {field("Number of servings", "servings", "e.g. 4")}
          {field("Calories", "calories", "e.g. 450")}
          {field("Difficulty level", "difficulty", "Easy / Medium / Hard")}

          <Pressable style={styles.primaryButton} onPress={saveRecipe}>
            <Text style={styles.primaryButtonText}>Save Recipe</Text>
          </Pressable>
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  let content = <Home />;
  if (screen === "detail") content = <Detail />;
  if (screen === "myRecipes") content = <MyRecipes />;
  if (screen === "favorites") content = <Favorites />;
  if (screen === "form") content = <FormScreen />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      {content}
      {screen === "home" && (
        <View style={styles.bottomNav}>
          <Pressable onPress={() => { setSelectedCategory("All"); setScreen("home"); }} style={styles.navItem}>
            <Text style={styles.navIcon}>⌂</Text><Text style={styles.navText}>Home</Text>
          </Pressable>
          <Pressable onPress={() => setScreen("favorites")} style={styles.navItem}>
            <Text style={styles.navIcon}>♥</Text><Text style={styles.navText}>Favorites</Text>
          </Pressable>
          <Pressable onPress={() => setScreen("myRecipes")} style={styles.navItem}>
            <Text style={styles.navIcon}>＋</Text><Text style={styles.navText}>My Food</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF9F3" },
  container: { flex: 1, backgroundColor: "#FFF9F3" },
  header: {
    height: 62, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#F0E5DA", backgroundColor: "#FFF9F3"
  },
  headerTitle: { fontSize: 21, fontWeight: "800", color: "#24201D" },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  backText: { fontSize: 38, lineHeight: 38, color: "#24201D" },
  hero: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 18 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5, color: "#C86B3C" },
  heroTitle: { fontSize: 30, fontWeight: "900", color: "#24201D", marginTop: 7, lineHeight: 36 },
  heroTitleSmall: { fontSize: 25, fontWeight: "900", color: "#24201D" },
  heroSubtitle: { color: "#766F68", fontSize: 14, lineHeight: 21, marginTop: 6 },
  search: {
    marginHorizontal: 20, marginBottom: 20, height: 50, borderRadius: 15, backgroundColor: "#FFFFFF",
    borderWidth: 1, borderColor: "#E9DED3", paddingHorizontal: 16, fontSize: 15, color: "#24201D"
  },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: "#24201D", paddingHorizontal: 20, marginBottom: 10 },
  chipRow: { paddingHorizontal: 20, paddingBottom: 18, gap: 8 },
  chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 22, backgroundColor: "#F2E9E0", marginRight: 7 },
  chipSelected: { backgroundColor: "#C86B3C" },
  chipText: { color: "#655D56", fontWeight: "700", fontSize: 13 },
  chipTextSelected: { color: "#FFFFFF" },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20 },
  count: { color: "#968C84", fontSize: 12 },
  grid: { paddingHorizontal: 20 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 15, borderWidth: 1, borderColor: "#EEE4DA" },
  cardImage: { width: "100%", height: 185 },
  cardBody: { flexDirection: "row", padding: 14, alignItems: "center" },
  categoryLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#C86B3C", fontWeight: "800" },
  cardTitle: { fontSize: 19, fontWeight: "800", color: "#24201D", marginTop: 3 },
  meta: { fontSize: 12, color: "#81786F", marginTop: 5 },
  heartButton: { width: 43, height: 43, borderRadius: 22, backgroundColor: "#FFF1E8", alignItems: "center", justifyContent: "center" },
  heart: { fontSize: 26, color: "#C84F42" },
  quickRow: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginTop: 6 },
  quickCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 15, borderWidth: 1, borderColor: "#EEE4DA" },
  quickIcon: { fontSize: 22, color: "#C86B3C" },
  quickTitle: { fontSize: 16, fontWeight: "800", marginTop: 7, color: "#24201D" },
  quickMeta: { color: "#887E75", fontSize: 12, marginTop: 3 },
  bottomNav: { height: 70, flexDirection: "row", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#EDE2D8" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  navIcon: { fontSize: 21, color: "#C86B3C" },
  navText: { fontSize: 11, fontWeight: "700", color: "#6E665F", marginTop: 2 },
  detailImage: { width: "100%", height: 270 },
  detailBody: { padding: 20 },
  detailTop: { flexDirection: "row", alignItems: "center" },
  detailTitle: { fontSize: 30, fontWeight: "900", color: "#24201D", marginTop: 5 },
  bigHeart: { width: 55, height: 55, borderRadius: 28, backgroundColor: "#FFF1E8", alignItems: "center", justifyContent: "center" },
  bigHeartText: { fontSize: 32, color: "#C84F42" },
  statsRow: { flexDirection: "row", backgroundColor: "#F7EFE8", borderRadius: 16, marginTop: 22, marginBottom: 25, paddingVertical: 15 },
  stat: { flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: "#E5D9CE" },
  statValue: { fontWeight: "800", color: "#24201D", fontSize: 14 },
  statLabel: { color: "#8A8179", fontSize: 10, marginTop: 4, textAlign: "center" },
  detailSection: { fontSize: 21, fontWeight: "900", color: "#24201D", marginTop: 8, marginBottom: 12 },
  ingredient: { fontSize: 15, color: "#4F4944", lineHeight: 24, marginBottom: 5 },
  stepRow: { flexDirection: "row", marginBottom: 15, alignItems: "flex-start" },
  stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#C86B3C", alignItems: "center", justifyContent: "center", marginRight: 10 },
  stepNumberText: { color: "#FFFFFF", fontWeight: "800" },
  stepText: { flex: 1, color: "#4F4944", fontSize: 15, lineHeight: 23 },
  editActions: { marginTop: 18 },
  primaryButton: { backgroundColor: "#C86B3C", borderRadius: 14, height: 50, alignItems: "center", justifyContent: "center", marginHorizontal: 20, marginTop: 15 },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },
  deleteButton: { borderWidth: 1, borderColor: "#D65B52", borderRadius: 14, height: 50, alignItems: "center", justifyContent: "center", marginTop: 10 },
  deleteButtonText: { color: "#C84F42", fontWeight: "800" },
  myHero: { flexDirection: "row", padding: 20, alignItems: "center" },
  addCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#C86B3C", alignItems: "center", justifyContent: "center" },
  addCircleText: { color: "#FFFFFF", fontSize: 28 },
  empty: { alignItems: "center", paddingHorizontal: 35, paddingTop: 55 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 21, fontWeight: "800", color: "#24201D", marginTop: 10 },
  emptyText: { textAlign: "center", color: "#81786F", lineHeight: 21, marginTop: 5 },
  myCard: { backgroundColor: "#FFFFFF", marginHorizontal: 20, marginTop: 15, padding: 12, borderRadius: 17, borderWidth: 1, borderColor: "#EEE4DA" },
  myImage: { width: 90, height: 90, borderRadius: 12 },
  myTitle: { fontSize: 17, fontWeight: "800", color: "#24201D", marginTop: 4 },
  myActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10, gap: 8 },
  smallButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9, backgroundColor: "#F2E9E0" },
  smallDelete: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9, backgroundColor: "#FCE9E7" },
  smallDeleteText: { color: "#B5443D", fontWeight: "700" },
  pageSubtitle: { padding: 20, paddingBottom: 5, color: "#81786F" },
  formContent: { paddingTop: 8 },
  field: { marginHorizontal: 20, marginTop: 14 },
  fieldLabel: { fontSize: 14, fontWeight: "800", color: "#38312C", marginHorizontal: 20, marginTop: 14 },
  input: { height: 48, borderWidth: 1, borderColor: "#E2D7CD", borderRadius: 12, backgroundColor: "#FFFFFF", paddingHorizontal: 13, marginTop: 7, color: "#24201D" },
  textarea: { height: 130, textAlignVertical: "top", paddingTop: 12 },
  imageUpload: { height: 150, marginHorizontal: 20, marginTop: 8, borderRadius: 14, borderWidth: 1.5, borderStyle: "dashed", borderColor: "#C86B3C", backgroundColor: "#FFF3EA", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  uploadIcon: { fontSize: 35 },
  uploadText: { color: "#8A5A43", fontWeight: "700", marginTop: 5 },
  uploadPreview: { width: "100%", height: "100%" }
});
