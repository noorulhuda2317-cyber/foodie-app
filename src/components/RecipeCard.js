import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function RecipeCard({ recipe, onPress, width }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(recipe.id);

  return (
    <TouchableOpacity style={[styles.card, width ? { width } : null]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ fontSize: 18, color: fav ? '#E0453D' : '#fff' }}>{fav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
      <Text style={styles.meta}>{recipe.prepTime} · {recipe.difficulty}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, marginRight: 12 },
  imageWrap: { borderRadius: 14, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: 120, backgroundColor: '#eee' },
  heartBtn: {
    position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16, width: 30, height: 30, alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 14, fontWeight: '600', marginTop: 6, color: '#2B2B2B' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
});
