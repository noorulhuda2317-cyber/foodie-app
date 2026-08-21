import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';

const PLACEHOLDER_IMAGE = 'https://picsum.photos/seed/newrecipe/500/350';

export default function AddEditRecipeScreen({ route, navigation }) {
  const { mode, recipeId } = route.params || { mode: 'add' };
  const { getRecipeById, addRecipe, editRecipe } = useApp();
  const existing = mode === 'edit' && recipeId ? getRecipeById(recipeId) : null;

  const [name, setName] = useState(existing?.name || '');
  const [image, setImage] = useState(existing?.image || '');
  const [prepTime, setPrepTime] = useState(existing?.prepTime || '');
  const [servings, setServings] = useState(existing ? String(existing.servings) : '');
  const [calories, setCalories] = useState(existing ? String(existing.calories) : '');
  const [difficulty, setDifficulty] = useState(existing?.difficulty || 'Easy');
  const [ingredients, setIngredients] = useState(existing?.ingredients?.length ? existing.ingredients : ['']);
  const [instructions, setInstructions] = useState(existing?.instructions?.length ? existing.instructions : ['']);

  useEffect(() => {
    navigation.setOptions({ title: mode === 'edit' ? 'Edit Recipe' : 'Add New Recipe' });
  }, [mode]);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets?.length) {
      setImage(result.assets[0].uri);
    }
  };

  const updateListItem = (list, setList, index, value) => {
    const copy = [...list];
    copy[index] = value;
    setList(copy);
  };
  const addListItem = (list, setList) => setList([...list, '']);
  const removeListItem = (list, setList, index) => {
    if (list.length === 1) return;
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const cleanIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const cleanInstructions = instructions.map((i) => i.trim()).filter(Boolean);

    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a recipe name.');
      return;
    }
    if (cleanIngredients.length === 0) {
      Alert.alert('Missing ingredients', 'Please add at least one ingredient.');
      return;
    }
    if (cleanInstructions.length === 0) {
      Alert.alert('Missing instructions', 'Please add at least one instruction step.');
      return;
    }

    const payload = {
      name: name.trim(),
      image: image || PLACEHOLDER_IMAGE,
      prepTime: prepTime.trim() || '—',
      servings: Number(servings) || 1,
      calories: Number(calories) || 0,
      difficulty,
      ingredients: cleanIngredients,
      instructions: cleanInstructions,
    };

    if (mode === 'edit' && existing) {
      editRecipe(existing.id, payload);
    } else {
      addRecipe(payload);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imagePickerText}>📷  Tap to upload image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Recipe Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Grandma's Lasagna" />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Prep Time</Text>
            <TextInput style={styles.input} value={prepTime} onChangeText={setPrepTime} placeholder="30 min" />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Servings</Text>
            <TextInput style={styles.input} value={servings} onChangeText={setServings} placeholder="4" keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>Calories</Text>
            <TextInput style={styles.input} value={calories} onChangeText={setCalories} placeholder="500" keyboardType="numeric" />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyRow}>
              {['Easy', 'Medium', 'Hard'].map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => setDifficulty(d)}
                  style={[styles.diffPill, difficulty === d && styles.diffPillActive]}
                >
                  <Text style={[styles.diffText, difficulty === d && styles.diffTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>Ingredients</Text>
        {ingredients.map((ing, i) => (
          <View key={i} style={styles.listRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={ing}
              onChangeText={(v) => updateListItem(ingredients, setIngredients, i, v)}
              placeholder={`Ingredient ${i + 1}`}
            />
            <TouchableOpacity onPress={() => removeListItem(ingredients, setIngredients, i)} style={styles.removeBtn}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={() => addListItem(ingredients, setIngredients)} style={styles.addRowBtn}>
          <Text style={styles.addRowText}>+ Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Instructions</Text>
        {instructions.map((step, i) => (
          <View key={i} style={styles.listRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={step}
              onChangeText={(v) => updateListItem(instructions, setInstructions, i, v)}
              placeholder={`Step ${i + 1}`}
              multiline
            />
            <TouchableOpacity onPress={() => removeListItem(instructions, setInstructions, i)} style={styles.removeBtn}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={() => addListItem(instructions, setInstructions)} style={styles.addRowBtn}>
          <Text style={styles.addRowText}>+ Add Step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  imagePicker: {
    height: 180, borderRadius: 14, backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, overflow: 'hidden',
  },
  imagePreview: { width: '100%', height: '100%' },
  imagePickerText: { color: '#888', fontSize: 14 },
  label: { fontSize: 13, fontWeight: '700', color: '#2B2B2B', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14,
  },
  row: { flexDirection: 'row' },
  difficultyRow: { flexDirection: 'row' },
  diffPill: {
    paddingHorizontal: 10, paddingVertical: 9, borderRadius: 8, backgroundColor: '#F1F1F1', marginRight: 6,
  },
  diffPillActive: { backgroundColor: '#E0453D' },
  diffText: { fontSize: 12, color: '#555', fontWeight: '600' },
  diffTextActive: { color: '#fff' },
  listRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  removeBtn: { marginLeft: 8, padding: 6 },
  removeText: { color: '#E0453D', fontSize: 16, fontWeight: '700' },
  addRowBtn: { marginBottom: 8 },
  addRowText: { color: '#E0453D', fontWeight: '700', fontSize: 13 },
  saveBtn: { backgroundColor: '#E0453D', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
