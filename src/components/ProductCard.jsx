
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product, onPress }) {
  const { wishlist, toggleWishlist } = useShop();

  const isWishlisted = wishlist?.some(
    (item) => item.id === product.id
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={19}
            color={isWishlisted ? '#B45B50' : '#29251F'}
          />
        </TouchableOpacity>

        {product.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            {formatPrice(product.price)}
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#C49A55" />
            <Text style={styles.rating}>
              {product.rating || '4.8'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 4,
  },
  imageContainer: {
    height: 165,
    backgroundColor: '#EEE9E1',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    left: 9,
    top: 10,
    backgroundColor: '#383229',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  info: {
    padding: 11,
  },
  category: {
    color: '#A18D75',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },
  price: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    color: '#776F65',
    fontSize: 10,
    fontWeight: '600',
  },
});
