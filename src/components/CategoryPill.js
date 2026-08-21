import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryPill({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, marginRight: 8,
  },
  pillActive: { backgroundColor: '#E0453D' },
  pillInactive: { backgroundColor: '#F1F1F1' },
  text: { fontSize: 13, fontWeight: '600' },
  textActive: { color: '#fff' },
  textInactive: { color: '#555' },
});
