
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
  value = '',
  onChangeText = () => {},
  placeholder = 'Search furniture, sofas, chairs...',
}) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={21}
        color="#8C8378"
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A49A8D"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <Ionicons
            name="close-circle"
            size={19}
            color="#A49A8D"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE5DD',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#29251F',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
});
