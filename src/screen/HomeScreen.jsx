
import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '../assets/products';
import { useShop } from '../context/ShopContext';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#FAF8F5',
  card: '#F4F1EC',
  white: '#FFFFFF',
  black: '#080808',
  text: '#292724',
  muted: '#89827A',
  border: '#E7E1DA',
  brown: '#A65316',
};

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200';

const OSLO_IMAGE =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200';

const ARRIVAL_IMAGE =
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200';

const SOFA_IMAGES = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900',
  'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=900',
];

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { wishlist, toggleWishlist, cart } = useShop();

  const categories = [
    { name: 'All', icon: 'apps' },
    { name: 'Sofas', icon: 'bed-outline' },
    { name: 'Sectionals', icon: 'albums-outline' },
    { name: 'Recliners', icon: 'armchair-outline' },
    { name: 'Chairs', icon: 'chair-outline' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const featuredProducts = filteredProducts.slice(0, 2);

  const osloProduct =
    PRODUCTS.find((product) => product.id === 'oslo') ||
    PRODUCTS[3];

  const isWishlisted = (product) =>
    wishlist.some((item) => item.id === product.id);

  const openProduct = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  const formatPrice = (price) =>
    '₹' + Number(price).toLocaleString('en-IN');

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
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Explore')}
          >
            <Ionicons
              name="menu-outline"
              size={25}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <Text style={styles.logo}>SOFALIVING</Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Notifications',
                  'You are all caught up!'
                )
              }
            >
              <Ionicons
                name="notifications-outline"
                size={23}
                color={COLORS.black}
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Wishlist')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH BAR */}

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={21}
              color={COLORS.muted}
            />

            <TextInput
              placeholder="Find your perfect sofa"
              placeholderTextColor={COLORS.muted}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('Explore')}
          >
            <Ionicons
              name="options-outline"
              size={23}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>

        {/* HERO BANNER */}

        <TouchableOpacity
          activeOpacity={0.95}
          style={styles.hero}
          onPress={() => navigation.navigate('Explore')}
        >
          <Image
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
          />

          <View style={styles.heroShade} />

          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>
              ARTISANAL WORKSHOP
            </Text>

            <Text style={styles.heroTitle}>
              Crafted For Serenity
            </Text>

            <Text style={styles.heroSubtitle}>
              Bespoke handcrafted living room pieces
            </Text>

            <View style={styles.heroButton}>
              <Text style={styles.heroButtonText}>
                Explore Collection
              </Text>

              <Ionicons
                name="arrow-forward"
                size={17}
                color={COLORS.black}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* CATEGORY PILLS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => {
            const active =
              selectedCategory === category.name;

            return (
              <TouchableOpacity
                key={category.name}
                onPress={() =>
                  setSelectedCategory(category.name)
                }
                style={[
                  styles.categoryButton,
                  active && styles.activeCategory,
                ]}
              >
                <Ionicons
                  name={category.icon}
                  size={16}
                  color={active ? '#FFFFFF' : '#514B45'}
                />

                <Text
                  style={[
                    styles.categoryText,
                    active && styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* FEATURED SOFAS HEADER */}

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Featured Sofas
            </Text>

            <Text style={styles.sectionSubtitle}>
              Signature silhouettes designed for enduring
              comfort
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Explore')}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View all</Text>
            <Ionicons
              name="chevron-forward"
              size={15}
              color={COLORS.brown}
            />
          </TouchableOpacity>
        </View>

        {/* TWO FEATURED PRODUCT CARDS */}

        <View style={styles.productGrid}>
          {featuredProducts.map((product, index) => (
            <TouchableOpacity
              key={product.id}
              activeOpacity={0.9}
              style={styles.productCard}
              onPress={() => openProduct(product)}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{
                    uri:
                      product.image ||
                      SOFA_IMAGES[index % SOFA_IMAGES.length],
                  }}
                  style={styles.productImage}
                />

                <TouchableOpacity
                  style={styles.wishlistButton}
                  onPress={() => handleWishlist(product)}
                >
                  <Ionicons
                    name={
                      isWishlisted(product)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={19}
                    color={
                      isWishlisted(product)
                        ? '#B65332'
                        : COLORS.black
                    }
                  />
                </TouchableOpacity>

                <View style={styles.ratingBadge}>
                  <Ionicons
                    name="star"
                    size={11}
                    color={COLORS.brown}
                  />

                  <Text style={styles.ratingText}>
                    {product.rating || '4.9'}
                  </Text>
                </View>
              </View>

              <Text style={styles.fabricText}>
                {product.fabric || 'Premium Upholstery'}
              </Text>

              <Text
                style={styles.productName}
                numberOfLines={1}
              >
                {product.name}
              </Text>

              <Text style={styles.productPrice}>
                {formatPrice(product.id === 'luna' ? 42999 : product.price)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* OSLO MODULAR FEATURE CARD */}

        {osloProduct && (
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.osloCard}
            onPress={() => openProduct(osloProduct)}
          >
            <View style={styles.osloImageContainer}>
              <Image
                source={{ uri: OSLO_IMAGE }}
                style={styles.osloImage}
              />

              <TouchableOpacity
                style={styles.osloWishlist}
                onPress={() => handleWishlist(osloProduct)}
              >
                <Ionicons
                  name={
                    isWishlisted(osloProduct)
                      ? 'heart'
                      : 'heart-outline'
                  }
                  size={19}
                  color={
                    isWishlisted(osloProduct)
                      ? '#B65332'
                      : COLORS.black
                  }
                />
              </TouchableOpacity>

              <View style={styles.ratingBadge}>
                <Ionicons
                  name="star"
                  size={11}
                  color={COLORS.brown}
                />

                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <View style={styles.osloDetails}>
              <View style={styles.modularLabel}>
                <View style={styles.brownDot} />
                <Text style={styles.modularText}>
                  MODULAR CONFIG
                </Text>
              </View>

              <Text style={styles.osloTitle}>
                Oslo Modular
              </Text>

              <Text style={styles.osloDescription}>
                Flexible 3-piece layout engineered with
                cloud-soft feather and high-density pocket
                cores.
              </Text>

              <View style={styles.osloDivider} />

              <View style={styles.osloPriceRow}>
                <View>
                  <Text style={styles.fromText}>From</Text>
                  <Text style={styles.osloPrice}>
                    {formatPrice(52000)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.configureButton}
                  onPress={() => openProduct(osloProduct)}
                >
                  <Text style={styles.configureText}>
                    Configure
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* NEW ARRIVALS SECTION */}

        <View style={styles.arrivalsCard}>
          <View style={styles.arrivalsTopRow}>
            <Text style={styles.arrivalsLabel}>
              NEW ARRIVALS
            </Text>

            <View style={styles.seasonBadge}>
              <Text style={styles.seasonText}>
                Autumn Salon
              </Text>
            </View>
          </View>

          <Text style={styles.arrivalsTitle}>
            Tactile Velvet Textures
          </Text>

          <Text style={styles.arrivalsDescription}>
            Explore 18 new muted mineral velvets and
            customizable modular depth options.
          </Text>

          {/* FABRIC COLOUR SWATCHES */}

          <View style={styles.swatchRow}>
            <View style={[styles.swatch, { backgroundColor: '#A58B80' }]} />
            <View style={[styles.swatch, { backgroundColor: '#657367' }]} />
            <View style={[styles.swatch, { backgroundColor: '#A96F50' }]} />
            <View style={[styles.swatch, { backgroundColor: '#383A3B' }]} />

            <Text style={styles.moreFabrics}>
              +14 fabrics
            </Text>
          </View>

          {/* TAILORED SEATING BANNER */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.tailoredBanner}
            onPress={() => navigation.navigate('Explore')}
          >
            <Image
              source={{ uri: ARRIVAL_IMAGE }}
              style={styles.tailoredImage}
            />

            <View style={styles.tailoredShade} />

            <View style={styles.tailoredContent}>
              <View>
                <Text style={styles.tailoredSmall}>
                  Custom Dimensions
                </Text>

                <Text style={styles.tailoredTitle}>
                  Tailored Seating
                </Text>
              </View>

              <View style={styles.discoverButton}>
                <Text style={styles.discoverText}>
                  Discover
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTTOM SPACING */}

        <View style={{ height: 20 }} />
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
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  // HEADER

  header: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEAE4',
  },

  headerIcon: {
    width: 40,
    alignItems: 'flex-start',
  },

  logo: {
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: COLORS.text,
  },

  headerRight: {
    width: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  notificationDot: {
    position: 'absolute',
    right: -1,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.brown,
  },

  avatar: {
    height: 33,
    width: 33,
    borderRadius: 18,
  },

  // SEARCH

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 26,
    gap: 9,
  },

  searchBox: {
    height: 53,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F1ED',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },

  filterButton: {
    width: 53,
    height: 53,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F1ED',
  },

  // HERO

  hero: {
    width: '100%',
    height: 322,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.34)',
  },

  heroContent: {
    padding: 25,
    paddingBottom: 27,
  },

  heroLabel: {
    color: '#F6E9DD',
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  heroTitle: {
    fontFamily: 'serif',
    fontSize: 30,
    color: COLORS.white,
  },

  heroSubtitle: {
    color: '#E8E2DB',
    fontSize: 13,
    marginTop: 6,
  },

  heroButton: {
    backgroundColor: '#FFFFFF',
    height: 45,
    paddingHorizontal: 21,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 15,
    gap: 8,
  },

  heroButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.black,
  },

  // CATEGORIES

  categoryScroll: {
    marginTop: 35,
    marginBottom: 24,
    marginHorizontal: -18,
  },

  categoryContainer: {
    paddingHorizontal: 18,
    gap: 9,
  },

  categoryButton: {
    height: 42,
    paddingHorizontal: 17,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#F5F2EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  activeCategory: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },

  categoryText: {
    fontSize: 13,
    color: '#514B45',
  },

  activeCategoryText: {
    color: COLORS.white,
  },

  // FEATURED HEADER

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  sectionHeading: {
    flex: 1,
  },

  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 2,
    maxWidth: 245,
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  viewAllText: {
    color: COLORS.brown,
    fontSize: 13,
  },

  // PRODUCT CARDS

  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  productCard: {
    flex: 1,
    backgroundColor: '#F5F2EE',
    borderRadius: 19,
    padding: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },

  productImageContainer: {
    height: width * 0.34,
    borderRadius: 55,
    overflow: 'hidden',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 7,
    width: 37,
    height: 37,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingBadge: {
    position: 'absolute',
    left: 5,
    bottom: 5,
    backgroundColor: '#F8F4EC',
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 11,
    color: COLORS.text,
  },

  fabricText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 13,
  },

  productName: {
    color: COLORS.text,
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  productPrice: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 5,
  },

  // OSLO MODULAR

  osloCard: {
    backgroundColor: '#F5F2EE',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 16,
    padding: 12,
  },

  osloImageContainer: {
    height: 220,
    borderRadius: 55,
    overflow: 'hidden',
    position: 'relative',
  },

  osloImage: {
    width: '100%',
    height: '100%',
  },

  osloWishlist: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  osloDetails: {
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 5,
  },

  modularLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  brownDot: {
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: COLORS.brown,
  },

  modularText: {
    fontSize: 11,
    color: COLORS.muted,
    letterSpacing: 0.7,
  },

  osloTitle: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 21,
    color: COLORS.text,
    marginTop: 7,
  },

  osloDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#625D57',
    marginTop: 7,
  },

  osloDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 13,
    marginBottom: 12,
  },

  osloPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fromText: {
    fontSize: 12,
    color: COLORS.muted,
  },

  osloPrice: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  configureButton: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },

  configureText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  // NEW ARRIVALS

  arrivalsCard: {
    backgroundColor: '#EAE7E2',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E1DCD5',
    marginTop: 26,
    padding: 18,
  },

  arrivalsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  arrivalsLabel: {
    color: COLORS.brown,
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1.2,
  },

  seasonBadge: {
    backgroundColor: '#F9F6F2',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },

  seasonText: {
    color: '#625D57',
    fontSize: 10,
  },

  arrivalsTitle: {
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 14,
  },

  arrivalsDescription: {
    fontSize: 14,
    lineHeight: 23,
    color: '#625D57',
    marginTop: 6,
  },

  // FABRIC SWATCHES

  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
    gap: 12,
  },

  swatch: {
    width: 34,
    height: 34,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F8F5F0',
  },

  moreFabrics: {
    color: COLORS.muted,
    fontSize: 11,
    marginLeft: 2,
  },

  // TAILORED SEATING BANNER

  tailoredBanner: {
    height: 160,
    borderRadius: 55,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  tailoredImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  tailoredShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },

  tailoredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },

  tailoredSmall: {
    color: '#F6E6D9',
    fontSize: 11,
  },

  tailoredTitle: {
    color: '#FFFFFF',
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 4,
  },

  discoverButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 25,
  },

  discoverText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.black,
  },
});
