
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const isWishlisted = wishlist?.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert(
      'Added to cart',
      `${product.name} has been added to your cart.`,
      [{ text: 'Continue Shopping' }]
    );
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#29251F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={handleWishlist}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={23}
              color={isWishlisted ? '#B45B50' : '#29251F'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={15} color="#C49A55" />
            <Text style={styles.rating}>
              {product.rating || '4.8'}
            </Text>
            <Text style={styles.reviews}>
              ({product.reviews || 0} reviews)
            </Text>
          </View>

          <Text style={styles.price}>
            ₹{Number(product.price).toLocaleString('en-IN')}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description ||
              'Designed for comfort and timeless style, this piece brings warmth and elegance to your living space.'}
          </Text>

          <Text style={styles.sectionTitle}>Product Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>
              {product.category}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Material</Text>
            <Text style={styles.detailValue}>
              {product.fabric || 'Premium Fabric'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Size</Text>
            <Text style={styles.detailValue}>
              {product.seats || 'Standard'}
            </Text>
          </View>

          <View style={styles.deliveryBox}>
            <Ionicons
              name="cube-outline"
              size={22}
              color="#786B59"
            />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryTitle}>
                Secure Delivery
              </Text>
              <Text style={styles.deliverySubtitle}>
                Carefully packed and delivered to your doorstep.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPriceLabel}>Total Price</Text>
          <Text style={styles.bottomPrice}>
            ₹{Number(product.price).toLocaleString('en-IN')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Ionicons name="bag-outline" size={19} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F2',
  },
  imageContainer: {
    height: 360,
    position: 'relative',
    backgroundColor: '#EEE9E1',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistButton: {
    position: 'absolute',
    top: 45,
    right: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 22,
    paddingBottom: 35,
  },
  category: {
    color: '#A18D75',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  productName: {
    fontSize: 27,
    fontWeight: '700',
    color: '#29251F',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  reviews: {
    color: '#8C8378',
    fontSize: 12,
    marginLeft: 5,
  },
  price: {
    color: '#29251F',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E2D9',
    marginVertical: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#29251F',
    marginBottom: 10,
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 23,
    color: '#776F65',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EAE5DD',
  },
  detailLabel: {
    color: '#8C8378',
    fontSize: 13,
  },
  detailValue: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '600',
  },
  deliveryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAE2',
    padding: 16,
    borderRadius: 14,
    marginTop: 25,
  },
  deliveryText: {
    marginLeft: 12,
    flex: 1,
  },
  deliveryTitle: {
    color: '#29251F',
    fontWeight: '700',
    fontSize: 13,
  },
  deliverySubtitle: {
    color: '#776F65',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 17,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE9E1',
  },
  bottomPriceLabel: {
    color: '#8C8378',
    fontSize: 11,
  },
  bottomPrice: {
    color: '#29251F',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 3,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#383229',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 9,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
