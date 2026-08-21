import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useApp } from '../context/AppContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const { getRecipeById, isFavorite, toggleFavorite } = useApp();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ padding: 20 }}>Recipe not found.</Text>
      </SafeAreaView>
    );
  }

  const fav = isFavorite(recipe.id);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#fff', fontSize: 18 }}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(recipe.id)}>
            <Text style={{ fontSize: 20, color: fav ? '#E0453D' : '#fff' }}>{fav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.category}>{recipe.category}</Text>

          <View style={styles.statsRow}>
            <Stat label="Prep Time" value={recipe.prepTime} />
            <Stat label="Servings" value={String(recipe.servings)} />
            <Stat label="Calories" value={`${recipe.calories} kcal`} />
            <Stat label="Difficulty" value={recipe.difficulty} />
          </View>

          <Text style={styles.sectionHeader}>Ingredients</Text>
          {(recipe.ingredients || []).map((ing, i) => (
            <Text key={i} style={styles.listItem}>• {ing}</Text>
          ))}

          <Text style={styles.sectionHeader}>Instructions</Text>
          {(recipe.instructions || []).map((step, i) => (
            <Text key={i} style={styles.listItem}>{i + 1}. {step}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 260, backgroundColor: '#eee' },
  backBtn: {
    position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(0,0,0,0.4)',
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
  },
  heartBtn: {
    position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.4)',
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
  },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: '800', color: '#2B2B2B' },
  category: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 14, fontWeight: '700', color: '#E0453D' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  sectionHeader: { fontSize: 17, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#2B2B2B' },
  listItem: { fontSize: 14, color: '#444', marginBottom: 6, lineHeight: 20 },
});
