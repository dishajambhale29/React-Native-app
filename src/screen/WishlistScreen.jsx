
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';

export default function WishlistScreen({ navigation }) {
  const { wishlist, toggleWishlist } = useShop();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('ProductDetails', { product: item })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          ₹{Number(item.price).toLocaleString('en-IN')}
        </Text>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleWishlist(item)}
        >
          <Ionicons
            name="heart"
            size={16}
            color="#B45B50"
          />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#A49A8D"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
          <Text style={styles.title}>Wishlist</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {wishlist?.length || 0}
          </Text>
        </View>
      </View>

      {wishlist?.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="heart-outline"
              size={45}
              color="#A18D75"
            />
          </View>

          <Text style={styles.emptyTitle}>
            Your wishlist is empty
          </Text>

          <Text style={styles.emptyDescription}>
            Save your favourite furniture pieces here and find them
            whenever you need them.
          </Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.exploreButtonText}>
              Explore Products
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F2',
    paddingTop: 18,
  },
  header: {
    paddingHorizontal: 22,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#A18D75',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#29251F',
  },
  countBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#383229',
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 18,
    paddingBottom: 110,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
  },
  productImage: {
    width: 104,
    height: 104,
    borderRadius: 12,
    backgroundColor: '#EEE9E1',
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
  },
  category: {
    color: '#A18D75',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  productName: {
    color: '#29251F',
    fontSize: 15,
    fontWeight: '700',
  },
  price: {
    color: '#29251F',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#B45B50',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
    paddingBottom: 70,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  emptyTitle: {
    color: '#29251F',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#8C8378',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  exploreButton: {
    backgroundColor: '#383229',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 25,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
