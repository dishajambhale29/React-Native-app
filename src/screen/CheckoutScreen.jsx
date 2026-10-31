
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const cartItems = cart || [];

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty cart', 'Please add products before checkout.');
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim() ||
        !city.trim() || !pincode.trim()) {
      Alert.alert('Missing details', 'Please complete all delivery fields.');
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      Alert.alert('Invalid phone number', 'Enter a valid 10-digit phone number.');
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode.trim())) {
      Alert.alert('Invalid PIN code', 'Enter a valid 6-digit PIN code.');
      return;
    }

    const order = {
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        pincode: pincode.trim(),
      },
      items: cartItems,
      total: subtotal,
      paymentMethod,
    };

    clearCart();

    navigation.replace('OrderSuccess', { order });
  };

  const renderInput = (
    label,
    value,
    onChangeText,
    placeholder,
    options = {}
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, options.multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A49A8D"
        keyboardType={options.keyboardType || 'default'}
        autoCapitalize={options.autoCapitalize || 'sentences'}
        multiline={options.multiline || false}
        textAlignVertical={options.multiline ? 'top' : 'center'}
        maxLength={options.maxLength}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={21} color="#29251F" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <Text style={styles.sectionSubtitle}>
          Where should we deliver your furniture?
        </Text>

        {renderInput(
          'Full Name',
          name,
          setName,
          'Enter your full name'
        )}

        {renderInput(
          'Phone Number',
          phone,
          setPhone,
          '10-digit mobile number',
          { keyboardType: 'phone-pad', maxLength: 10 }
        )}

        {renderInput(
          'Street Address',
          address,
          setAddress,
          'House number, street, area',
          { multiline: true }
        )}

        {renderInput(
          'City',
          city,
          setCity,
          'Enter your city'
        )}

        {renderInput(
          'PIN Code',
          pincode,
          setPincode,
          '6-digit PIN code',
          { keyboardType: 'number-pad', maxLength: 6 }
        )}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'Cash on Delivery' && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod('Cash on Delivery')}
        >
          <Ionicons
            name="cash-outline"
            size={23}
            color="#786B59"
          />

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Cash on Delivery</Text>
            <Text style={styles.paymentSubtitle}>
              Pay when your order arrives
            </Text>
          </View>

          <Ionicons
            name={
              paymentMethod === 'Cash on Delivery'
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={21}
            color="#786B59"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'UPI' && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod('UPI')}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={23}
            color="#786B59"
          />

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>UPI</Text>
            <Text style={styles.paymentSubtitle}>
              Online payment
            </Text>
          </View>

          <Ionicons
            name={
              paymentMethod === 'UPI'
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={21}
            color="#786B59"
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Order Summary</Text>

        {cartItems.map((item) => (
          <View key={String(item.id)} style={styles.summaryItem}>
            <Text style={styles.summaryItemName}>
              {item.name} × {item.quantity || 1}
            </Text>
            <Text style={styles.summaryItemPrice}>
              {formatPrice(
                Number(item.price) * Number(item.quantity || 1)
              )}
            </Text>
          </View>
        ))}

        <View style={styles.summaryTotal}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
        </View>

        <Text style={styles.disclaimer}>
          By placing your order, you agree to our store's order and
          delivery terms.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomPrice}>{formatPrice(subtotal)}</Text>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.85}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
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
  header: {
    height: 65,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#29251F',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 35,
  },
  sectionTitle: {
    color: '#29251F',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 12,
  },
  sectionSubtitle: {
    color: '#8C8378',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    color: '#4C453C',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAE5DD',
    paddingHorizontal: 15,
    color: '#29251F',
    fontSize: 13,
  },
  multilineInput: {
    height: 85,
    paddingTop: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E2D9',
    marginVertical: 23,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAE5DD',
    marginTop: 12,
  },
  selectedPayment: {
    borderColor: '#A18D75',
    backgroundColor: '#F3F0EB',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 13,
  },
  paymentTitle: {
    color: '#29251F',
    fontSize: 13,
    fontWeight: '700',
  },
  paymentSubtitle: {
    color: '#8C8378',
    fontSize: 11,
    marginTop: 4,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  summaryItemName: {
    flex: 1,
    color: '#776F65',
    fontSize: 12,
    marginRight: 10,
  },
  summaryItemPrice: {
    color: '#29251F',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E8E2D9',
    paddingTop: 17,
    marginTop: 20,
  },
  totalLabel: {
    color: '#29251F',
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: '#29251F',
    fontSize: 17,
    fontWeight: '700',
  },
  disclaimer: {
    color: '#A49A8D',
    fontSize: 10,
    lineHeight: 16,
    marginTop: 20,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE9E1',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLabel: {
    color: '#8C8378',
    fontSize: 11,
  },
  bottomPrice: {
    color: '#29251F',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 3,
  },
  placeOrderButton: {
    backgroundColor: '#383229',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
