
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';

export default function CartScreen({ navigation }) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
  } = useShop();

  const cartItems = cart || [];

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty', 'Add a product before checkout.');
      return;
    }

    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }) => {
    const quantity = Number(item.quantity || 1);

    return (
      <View style={styles.cartCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.productInfo}>
          <Text style={styles.category}>{item.category}</Text>

          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.price}>
            {formatPrice(item.price)}
          </Text>

          <View style={styles.bottomRow}>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  quantity > 1
                    ? updateQuantity(item.id, quantity - 1)
                    : removeFromCart(item.id)
                }
              >
                <Ionicons name="remove" size={16} color="#29251F" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  updateQuantity(item.id, quantity + 1)
                }
              >
                <Ionicons name="add" size={16} color="#29251F" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              style={styles.removeButton}
            >
              <Ionicons
                name="trash-outline"
                size={17}
                color="#B45B50"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR SELECTION</Text>
          <Text style={styles.title}>My Cart</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {cartItems.reduce(
              (total, item) => total + Number(item.quantity || 1),
              0
            )}
          </Text>
        </View>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(subtotal)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.freeDelivery}>FREE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {formatPrice(subtotal)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.85}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <Ionicons
                name="arrow-forward"
                size={19}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="bag-handle-outline"
              size={45}
              color="#A18D75"
            />
          </View>

          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptyDescription}>
            Looks like you haven't added anything yet. Explore our
            collection and find something you love.
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
    marginBottom: 22,
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
    paddingBottom: 20,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
  },
  productImage: {
    width: 112,
    height: 125,
    borderRadius: 12,
    backgroundColor: '#EEE9E1',
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  category: {
    color: '#A18D75',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F0EB',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  quantityButton: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '700',
    minWidth: 25,
    textAlign: 'center',
  },
  removeButton: {
    padding: 7,
  },
  summary: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  summaryLabel: {
    color: '#8C8378',
    fontSize: 13,
  },
  summaryValue: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '600',
  },
  freeDelivery: {
    color: '#6D8A69',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAE5DD',
    marginVertical: 5,
  },
  totalLabel: {
    color: '#29251F',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#29251F',
    fontSize: 19,
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: '#383229',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
