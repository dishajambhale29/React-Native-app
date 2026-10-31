
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../assets/products';

const CATEGORIES = [
  'All',
  'Sofas',
  'Sectionals',
  'Chairs',
  'Tables',
  'Storage',
];

export default function ExploreScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        (product.fabric || '').toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const renderProduct = ({ item }) => (
    <View style={styles.productWrapper}>
      <ProductCard
        product={item}
        onPress={() =>
          navigation.navigate('ProductDetails', { product: item })
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>FIND YOUR STYLE</Text>
          <Text style={styles.title}>Explore</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="options-outline" size={22} color="#29251F" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const active = selectedCategory === item;

            return (
              <Text
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  active && styles.activeCategoryChip,
                  active && styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            );
          }}
        />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>All Products</Text>
        <Text style={styles.resultsCount}>
          {filteredProducts.length} items
        </Text>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={42}
              color="#A49A8D"
            />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F2',
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#A18D75',
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#29251F',
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  categoryContainer: {
    marginBottom: 22,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: '#EFEAE2',
    color: '#6E655A',
    fontSize: 13,
    fontWeight: '500',
  },
  activeCategoryChip: {
    backgroundColor: '#383229',
    color: '#FFFFFF',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#29251F',
  },
  resultsCount: {
    fontSize: 12,
    color: '#8C8378',
  },
  productList: {
    paddingHorizontal: 14,
    paddingBottom: 110,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '49%',
    marginBottom: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#29251F',
    marginTop: 14,
  },
  emptyText: {
    fontSize: 13,
    color: '#8C8378',
    marginTop: 6,
    textAlign: 'center',
  },
});
