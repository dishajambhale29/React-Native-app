
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Share,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#FAF8F5',
  white: '#FFFFFF',
  black: '#080808',
  text: '#292724',
  muted: '#89827A',
  border: '#E9E3DD',
  brown: '#A65316',
  lightBrown: '#F5E6DC',
  green: '#C8EBD3',
};

export default function OrderSuccessScreen({ route, navigation }) {
  const order = route.params?.order || {};

  const customer = order.customer || {};
  const items = order.items || [];

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const total = Number(order.total || subtotal);

  const paymentMethod = order.paymentMethod || 'UPI';

  const isPaid =
    paymentMethod.toLowerCase().includes('upi') ||
    paymentMethod.toLowerCase().includes('card') ||
    paymentMethod.toLowerCase().includes('online');

  const orderReference =
    order.reference ||
    order.orderId ||
    'SL-892401';

  const formatPrice = (price) =>
    '₹' + Number(price || 0).toLocaleString('en-IN');

  const customerName = customer.name || 'Customer';

  const address = [
    customer.address,
    customer.city,
    customer.pincode,
  ]
    .filter(Boolean)
    .join(', ');

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainTabs',
          params: { screen: 'Home' },
        },
      ],
    });
  };

  const handleTrackOrder = () => {
    Alert.alert(
      'Order Tracking',
      'Your furniture is being prepared at our craft atelier. Tracking updates will be available soon.'
    );
  };

  const handleConcierge = () => {
    Alert.alert(
      'Personal Atelier Concierge',
      'Our design team is ready to help with customization and delivery scheduling.'
    );
  };

  const handleCopyReference = async () => {
    try {
      await Share.share({
        message: `SOFALIVING Order Reference: #${orderReference}`,
      });
    } catch (error) {
      Alert.alert('Order Reference', `#${orderReference}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.background}
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerDot} />

          <Text style={styles.logo}>
            SOFALIVING
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleContinueShopping}
          >
            <Ionicons
              name="close"
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>

        {/* SUCCESS CARD */}

        <View style={styles.successCard}>
          <View style={styles.successIconOuter}>
            <View style={styles.successIconInner}>
              <Ionicons
                name="checkmark"
                size={27}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.smallSuccessIcon}>
            <Ionicons
              name="print-outline"
              size={16}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.successTitle}>
            Order Placed Successfully!
          </Text>

          <Text style={styles.successSubtitle}>
            Thank you, {customerName}. Your bespoke sofa is now
            being handcrafted in our atelier.
          </Text>

          {/* ORDER REFERENCE */}

          <TouchableOpacity
            style={styles.referenceButton}
            onPress={handleCopyReference}
          >
            <Text style={styles.referenceLabel}>
              ORDER REF
            </Text>

            <Text style={styles.referenceValue}>
              #{orderReference}
            </Text>

            <Ionicons
              name="copy-outline"
              size={16}
              color={COLORS.muted}
            />
          </TouchableOpacity>

          <View style={styles.successDivider} />

          {/* DELIVERY ESTIMATE */}

          <View style={styles.deliveryRow}>
            <Ionicons
              name="car-outline"
              size={24}
              color={COLORS.brown}
            />

            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryLabel}>
                ESTIMATED DELIVERY
              </Text>

              <Text style={styles.deliveryDate}>
                Ships in 5–7 days
              </Text>
            </View>

            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryBadgeText}>
                Ships in 5–7 days
              </Text>
            </View>
          </View>
        </View>

        {/* CRAFTSMANSHIP JOURNEY */}

        <View style={styles.journeyCard}>
          <View style={styles.journeyHeader}>
            <Text style={styles.cardHeading}>
              Craftsmanship Journey
            </Text>

            <Text style={styles.liveText}>
              LIVE ATELIER
            </Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineIconDone}>
                <Ionicons
                  name="checkmark"
                  size={18}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.timelineTitle}>
                Order
              </Text>

              <Text style={styles.timelineSubtitle}>
                Placed
              </Text>

              <Text style={styles.timelineStatus}>
                Confirmed
              </Text>
            </View>

            <View style={styles.timelineLineActive} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconActive}>
                <Ionicons
                  name="hammer-outline"
                  size={19}
                  color={COLORS.brown}
                />
              </View>

              <View style={styles.timelineDot} />

              <Text style={styles.timelineTitle}>
                Woodworking
              </Text>

              <Text style={styles.timelineSubtitleActive}>
                In Progress
              </Text>
            </View>

            <View style={styles.timelineLineInactive} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconInactive}>
                <Ionicons
                  name="layers-outline"
                  size={18}
                  color="#BEB9B3"
                />
              </View>

              <Text style={styles.timelineTitleMuted}>
                Upholstery
              </Text>

              <Text style={styles.timelineMuted}>
                Tailoring
              </Text>
            </View>

            <View style={styles.timelineLineInactive} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineIconInactive}>
                <Ionicons
                  name="gift-outline"
                  size={18}
                  color="#BEB9B3"
                />
              </View>

              <Text style={styles.timelineTitleMuted}>
                White Glove
              </Text>

              <Text style={styles.timelineMuted}>
                Room Setup
              </Text>
            </View>
          </View>
        </View>

        {/* ORDER DETAILS CARD */}

        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.cardHeading}>
              Order Details
            </Text>

            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>
                {items.length || 0} Bespoke Items
              </Text>
            </View>
          </View>

          <View style={styles.detailsDivider} />

          {/* ORDERED PRODUCTS */}

          {items.map((item, index) => (
            <View
              key={`${item.id || item.name}-${index}`}
              style={styles.itemRow}
            >
              <Image
                source={{
                  uri:
                    item.image ||
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
                }}
                style={styles.itemImage}
              />

              <View style={styles.itemInformation}>
                <Text
                  style={styles.itemName}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text style={styles.itemDescription}>
                  {item.seats || '3 Seater'} •{' '}
                  {item.color || item.fabric || 'Premium Fabric'}
                </Text>

                <View style={styles.quantityRow}>
                  <View
                    style={[
                      styles.colorDot,
                      {
                        backgroundColor:
                          item.colorCode || '#D9C9BC',
                      },
                    ]}
                  />

                  <Text style={styles.quantityText}>
                    Qty: {item.quantity || 1}
                  </Text>
                </View>
              </View>

              <Text style={styles.itemPrice}>
                {formatPrice(
                  Number(item.price || 0) *
                    Number(item.quantity || 1)
                )}
              </Text>
            </View>
          ))}

          <View style={styles.dashedDivider} />

          {/* DELIVERY ADDRESS */}

          <View style={styles.addressSection}>
            <View style={styles.addressHeading}>
              <Ionicons
                name="location-outline"
                size={22}
                color={COLORS.muted}
              />

              <Text style={styles.addressLabel}>
                WHITE GLOVE DELIVERY ADDRESS
              </Text>
            </View>

            <Text style={styles.addressText}>
              {address || 'Delivery address not provided'}
            </Text>

            <Text style={styles.recipientText}>
              Recipient: {customerName}
              {customer.phone ? ` (${customer.phone})` : ''}
            </Text>
          </View>

          {/* PAYMENT METHOD */}

          <View style={styles.paymentBox}>
            <View style={styles.paymentIcon}>
              <Ionicons
                name="business-outline"
                size={21}
                color={COLORS.text}
              />
            </View>

            <View style={styles.paymentInformation}>
              <Text style={styles.paymentLabel}>
                PAYMENT METHOD
              </Text>

              <Text style={styles.paymentMethod}>
                {paymentMethod}
              </Text>
            </View>

            <View
              style={[
                styles.paidBadge,
                !isPaid && styles.pendingBadge,
              ]}
            >
              <Text style={styles.paidText}>
                {isPaid ? 'PAID' : 'PENDING'}
              </Text>
            </View>
          </View>

          {/* PRICE BREAKDOWN */}

          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Subtotal
              </Text>

              <Text style={styles.priceValue}>
                {formatPrice(subtotal)}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                White Glove Delivery & Assembly
              </Text>

              <Text style={styles.includedText}>
                COMPLIMENTARY
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                Craft Atelier Insurance
              </Text>

              <Text style={styles.includedText}>
                INCLUDED
              </Text>
            </View>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              {isPaid ? 'Total Paid' : 'Total Due'}
            </Text>

            <Text style={styles.totalPrice}>
              {formatPrice(total)}
            </Text>
          </View>
        </View>

        {/* PERSONAL CONCIERGE */}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.conciergeCard}
          onPress={handleConcierge}
        >
          <View style={styles.conciergeIcon}>
            <Ionicons
              name="headset-outline"
              size={24}
              color={COLORS.brown}
            />
          </View>

          <View style={styles.conciergeInfo}>
            <Text style={styles.conciergeTitle}>
              Personal Atelier Concierge
            </Text>

            <Text style={styles.conciergeDescription}>
              Questions about customization or delivery
              scheduling? Our design masters are on standby.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.muted}
          />
        </TouchableOpacity>

        {/* TRACK ORDER */}

        <TouchableOpacity
          style={styles.trackButton}
          activeOpacity={0.85}
          onPress={handleTrackOrder}
        >
          <Ionicons
            name="analytics-outline"
            size={21}
            color={COLORS.text}
          />

          <Text style={styles.trackButtonText}>
            Track Order Status
          </Text>
        </TouchableOpacity>

        {/* CONTINUE SHOPPING */}

        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueButtonText}>
            Continue Shopping
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <View style={{ height: 35 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  // HEADER

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE7E1',
    marginBottom: 19,
  },

  headerDot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: '#F6A16F',
    borderWidth: 4,
    borderColor: '#FCE9DD',
  },

  logo: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 1,
    color: COLORS.text,
  },

  closeButton: {
    height: 43,
    width: 43,
    borderRadius: 25,
    backgroundColor: '#F2F0EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SUCCESS CARD

  successCard: {
    backgroundColor: COLORS.white,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 24,
    paddingTop: 29,
    paddingBottom: 25,
    alignItems: 'center',
    marginBottom: 29,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  successIconOuter: {
    width: 97,
    height: 97,
    borderRadius: 50,
    backgroundColor: '#F4F2EE',
    borderWidth: 1,
    borderColor: '#DDD8D1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successIconInner: {
    width: 62,
    height: 62,
    borderRadius: 35,
    backgroundColor: COLORS.brown,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallSuccessIcon: {
    position: 'absolute',
    top: 94,
    left: '55%',
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successTitle: {
    fontFamily: 'serif',
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 22,
  },

  successSubtitle: {
    fontSize: 15,
    lineHeight: 27,
    color: '#625B55',
    textAlign: 'center',
    marginTop: 7,
  },

  referenceButton: {
    backgroundColor: '#F5F2EE',
    borderWidth: 1,
    borderColor: '#E1D9D1',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 19,
  },

  referenceLabel: {
    fontSize: 11,
    letterSpacing: 0.7,
    color: '#5D5650',
  },

  referenceValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },

  successDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginTop: 20,
    marginBottom: 19,
  },

  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },

  deliveryTextContainer: {
    flex: 1,
  },

  deliveryLabel: {
    color: '#625B55',
    fontSize: 11,
    fontWeight: '600',
  },

  deliveryDate: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
  },

  deliveryBadge: {
    backgroundColor: '#FFDDCD',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
  },

  deliveryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#57321E',
  },

  // JOURNEY CARD

  journeyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 36,
    padding: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 29,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  cardHeading: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  liveText: {
    fontSize: 11,
    color: COLORS.brown,
    fontWeight: '600',
  },

  timeline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  timelineItem: {
    width: '21%',
    alignItems: 'center',
    position: 'relative',
  },

  timelineIconDone: {
    width: 39,
    height: 39,
    borderRadius: 22,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  timelineIconActive: {
    width: 39,
    height: 39,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.brown,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  timelineIconInactive: {
    width: 39,
    height: 39,
    borderRadius: 22,
    backgroundColor: '#F6F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  timelineLineActive: {
    height: 2,
    backgroundColor: COLORS.black,
    width: '9%',
    marginTop: 19,
  },

  timelineLineInactive: {
    height: 2,
    backgroundColor: '#E5E1DB',
    width: '8%',
    marginTop: 19,
  },

  timelineDot: {
    position: 'absolute',
    top: -3,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: COLORS.brown,
  },

  timelineTitle: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
  },

  timelineSubtitle: {
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
  },

  timelineStatus: {
    fontSize: 11,
    color: '#625B55',
    textAlign: 'center',
    marginTop: 3,
  },

  timelineSubtitleActive: {
    fontSize: 11,
    color: COLORS.brown,
    textAlign: 'center',
    marginTop: 3,
  },

  timelineTitleMuted: {
    fontSize: 11,
    color: '#9B948C',
    textAlign: 'center',
  },

  timelineMuted: {
    fontSize: 11,
    color: '#A7A098',
    textAlign: 'center',
    marginTop: 3,
  },

  // ORDER DETAILS

  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginBottom: 29,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemCountBadge: {
    backgroundColor: '#F5F2EE',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2DBD3',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  itemCountText: {
    fontSize: 11,
    color: COLORS.text,
  },

  detailsDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 13,
    marginBottom: 17,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE7',
  },

  itemImage: {
    width: 83,
    height: 94,
    borderRadius: 7,
    backgroundColor: '#F1ECE5',
  },

  itemInformation: {
    flex: 1,
    marginLeft: 13,
    marginRight: 5,
  },

  itemName: {
    fontFamily: 'serif',
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  itemDescription: {
    color: '#625B55',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 7,
  },

  colorDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6CCC1',
  },

  quantityText: {
    fontSize: 11,
    color: '#B9AFA5',
  },

  itemPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    alignSelf: 'flex-start',
  },

  dashedDivider: {
    height: 1,
    borderWidth: 0.7,
    borderColor: '#D6C6B8',
    borderStyle: 'dashed',
    marginTop: 0,
    marginBottom: 20,
  },

  // ADDRESS

  addressSection: {
    marginBottom: 19,
  },

  addressHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  addressLabel: {
    fontSize: 11,
    color: '#625B55',
    fontWeight: '600',
  },

  addressText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 23,
    marginLeft: 26,
    marginTop: 3,
  },

  recipientText: {
    color: COLORS.brown,
    fontSize: 12,
    marginLeft: 26,
    marginTop: 9,
  },

  // PAYMENT

  paymentBox: {
    backgroundColor: '#F5F2EE',
    borderWidth: 1,
    borderColor: '#E6DED6',
    borderRadius: 9,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  paymentIcon: {
    width: 39,
    height: 39,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentInformation: {
    flex: 1,
    marginLeft: 10,
  },

  paymentLabel: {
    fontSize: 10,
    color: '#625B55',
  },

  paymentMethod: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 3,
  },

  paidBadge: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 15,
  },

  pendingBadge: {
    backgroundColor: '#FFE0C2',
  },

  paidText: {
    fontSize: 10,
    color: '#173B26',
    fontWeight: '600',
  },

  // PRICE BREAKDOWN

  priceBreakdown: {
    gap: 10,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },

  priceLabel: {
    color: '#625B55',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },

  priceValue: {
    color: '#625B55',
    fontSize: 13,
  },

  includedText: {
    color: COLORS.brown,
    fontSize: 11,
    textAlign: 'right',
  },

  totalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 12,
    marginBottom: 14,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.text,
  },

  totalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // CONCIERGE

  conciergeCard: {
    backgroundColor: '#F5F2EE',
    borderWidth: 1,
    borderColor: '#E8E2DB',
    borderRadius: 35,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 33,
  },

  conciergeIcon: {
    width: 49,
    height: 49,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E2DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  conciergeInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  conciergeTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },

  conciergeDescription: {
    color: '#625B55',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 3,
  },

  // TRACK BUTTON

  trackButton: {
    height: 61,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#D8CEC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },

  trackButtonText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },

  // CONTINUE SHOPPING

  continueButton: {
    height: 62,
    backgroundColor: COLORS.black,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
