import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { useApp } from '../context/AppContext';

export default function MyRecipesScreen({ navigation }) {
  const { userRecipes, deleteRecipe } = useApp();

  const handleDelete = (recipe) => {
    Alert.alert('Delete Recipe', `Are you sure you want to delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipe.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top:10,bottom:10,left:10,right:10}}>
          <Text style={{ fontSize: 22 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Recipes</Text>
        <View style={{ width: 22 }} />
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddEditRecipe', { mode: 'add' })}
      >
        <Text style={styles.addBtnText}>＋ Add New Recipe</Text>
      </TouchableOpacity>

      <FlatList
        data={userRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardTouchable}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.meta}>{item.ingredients?.length || 0} ingredients</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.editBtn]}
                onPress={() => navigation.navigate('AddEditRecipe', { mode: 'edit', recipeId: item.id })}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => handleDelete(item)}
              >
                <Text style={[styles.actionText, { color: '#fff' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#888', marginTop: 12 }}>
            You haven't added any recipes yet. Tap "Add New Recipe" to create one.
          </Text>
        }
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
  title: { fontSize: 20, fontWeight: '800', color: '#2B2B2B' },
  addBtn: {
    backgroundColor: '#E0453D', marginHorizontal: 16, marginBottom: 16,
    paddingVertical: 12, borderRadius: 12, alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  card: {
    backgroundColor: '#FAFAFA', borderRadius: 14, padding: 12, marginBottom: 12,
  },
  cardTouchable: { flexDirection: 'row', alignItems: 'center' },
  thumb: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#eee' },
  name: { fontSize: 15, fontWeight: '700', color: '#2B2B2B' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
  actionsRow: { flexDirection: 'row', marginTop: 10 },
  actionBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center', marginRight: 8 },
  editBtn: { backgroundColor: '#EEE' },
  deleteBtn: { backgroundColor: '#E0453D', marginRight: 0 },
  actionText: { fontSize: 13, fontWeight: '700', color: '#2B2B2B' },
});
