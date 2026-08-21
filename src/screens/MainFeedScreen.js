import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { CATEGORIES } from '../data/recipesData';
import { useApp } from '../context/AppContext';
import CategoryPill from '../components/CategoryPill';
import RecipeCard from '../components/RecipeCard';

export default function MainFeedScreen({ navigation }) {
  const { builtInRecipes } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  const allTabs = useMemo(() => [...CATEGORIES, 'My Food'], []);

  const filtered = useMemo(
    () => builtInRecipes.filter((r) => r.category === selectedCategory),
    [builtInRecipes, selectedCategory]
  );

  const handleCategoryPress = (cat) => {
    if (cat === 'My Food') {
      navigation.navigate('MyRecipes');
    } else {
      setSelectedCategory(cat);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Foodie</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} hitSlop={{top:10,bottom:10,left:10,right:10}}>
          <Text style={{ fontSize: 22 }}>❤️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {allTabs.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            active={cat === selectedCategory}
            onPress={() => handleCategoryPress(cat)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>{selectedCategory} Recipes</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            width="48%"
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={{ color: '#888', paddingLeft: 4 }}>No recipes in this category yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12,
  },
  title: { fontSize: 26, fontWeight: '800', color: '#2B2B2B' },
  categoryScroll: { marginBottom: 12, flexGrow: 0 },
  sectionTitle: { fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginBottom: 10, color: '#2B2B2B' },
});
