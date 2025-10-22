import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

// ============================================
// THEME & COLORS
// ============================================
const colors = {
  primary: '#8B0000',      // Burgundy
  background: '#FDF6E3',   // Cream
  text: '#333333',         // Dark Gray
  accent: '#C49E60',       // Gold
  white: '#FFFFFF',
  gray: '#666666',
  lightGray: '#DDDDDD',
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// CustomButton Component
const CustomButton = ({ text, onPress, color = colors.primary, style }: { text: string; onPress: () => void; color?: string; style?: any }) => (
  <TouchableOpacity
    style={[styles.customButton, { backgroundColor: color }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.customButtonText}>{text}</Text>
  </TouchableOpacity>
);

// MenuItem Component
type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
  image: string;
};

const MenuItem = ({ item }: { item: MenuItemType }) => (
  <View style={styles.menuItemCard}>
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/80' }}
      style={styles.menuItemImage}
    />
    <View style={styles.menuItemInfo}>
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemCourse}>{item.course}</Text>
      <Text style={styles.menuItemDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
    <Text style={styles.menuItemPrice}>R{item.price.toFixed(2)}</Text>
  </View>
);

// InputField Component
const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  multiline, 
  keyboardType 
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
}) => (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.inputMultiline]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);

// ============================================
// SCREEN 1: HOME SCREEN
// ============================================

const HomeScreen = ({ menuItems, onNavigateToAdd, onNavigateToFilter }: { menuItems: MenuItemType[]; onNavigateToAdd: () => void; onNavigateToFilter: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Christoffel du Chef</Text>
        <View style={styles.headerButtons}>
          <CustomButton
            text="+ Add Item"
            onPress={onNavigateToAdd}
            style={styles.headerButton}
          />
          <CustomButton
            text="Filter"
            onPress={onNavigateToFilter}
            color={colors.accent}
            style={styles.headerButton}
          />
        </View>
      </View>

      <View style={styles.totalItemsContainer}>
        <Text style={styles.totalItemsText}>
          Total Items: {menuItems.length}
        </Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No menu items yet. Add your first dish!</Text>
        }
      />
    </SafeAreaView>
  );
};

// ============================================
// SCREEN 2: ADD MENU ITEM SCREEN
// ============================================

const AddMenuItemScreen = ({ onSave, onCancel }: { onSave: (item: MenuItemType) => void; onCancel: () => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starters');

  const courses = ['Starters', 'Mains', 'Desserts', 'Drinks'];

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
      course,
      image: 'https://via.placeholder.com/80'
    };

    onSave(newItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.screenTitle}>Add New Menu Item</Text>

        <InputField
          label="Dish Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g., Grilled Salmon"
        />

        <InputField
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the dish..."
          multiline
        />

        <InputField
          label="Price (R)"
          value={price}
          onChangeText={setPrice}
          placeholder="e.g., 150"
          keyboardType="numeric"
        />

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Course</Text>
          <View style={styles.pickerContainer}>
            {courses.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.pickerOption,
                  course === c && styles.pickerOptionSelected
                ]}
                onPress={() => setCourse(c)}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    course === c && styles.pickerOptionTextSelected
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formButtons}>
          <CustomButton
            text="Save Item"
            onPress={handleSave}
            style={styles.formButton}
          />
          <CustomButton
            text="Cancel"
            onPress={onCancel}
            color={colors.gray}
            style={styles.formButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================
// SCREEN 3: FILTER BY COURSE SCREEN
// ============================================

const FilterScreen = ({ menuItems, onBack }: { menuItems: MenuItemType[]; onBack: () => void }) => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const courses = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredItems =
    selectedCourse === 'All'
      ? menuItems
      : menuItems.filter((item) => item.course === selectedCourse);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterHeader}>
        <Text style={styles.screenTitle}>Filter Menu</Text>
        <CustomButton
          text="← Back"
          onPress={onBack}
          color={colors.gray}
          style={styles.backButton}
        />
      </View>

      <View style={styles.tabContainer}>
        {courses.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.tab,
              selectedCourse === c && styles.tabSelected
            ]}
            onPress={() => setSelectedCourse(c)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCourse === c && styles.tabTextSelected
              ]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.totalItemsContainer}>
        <Text style={styles.totalItemsText}>
          Showing {filteredItems.length} item(s)
        </Text>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItem item={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No items in this category
          </Text>
        }
      />
    </SafeAreaView>
  );
};

// ============================================
// MAIN APP COMPONENT (Navigation Logic)
// ============================================

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with parmesan and croutons',
      price: 85,
      course: 'Starters',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: '2',
      name: 'Ribeye Steak',
      description: 'Prime aged beef with herb butter',
      price: 285,
      course: 'Mains',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: '3',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with vanilla ice cream',
      price: 95,
      course: 'Desserts',
      image: 'https://via.placeholder.com/80'
    },
    {
      id: '4',
      name: 'Red Wine',
      description: 'Premium South African Cabernet Sauvignon',
      price: 120,
      course: 'Drinks',
      image: 'https://via.placeholder.com/80'
    }
  ]);

  const handleAddItem = (newItem: MenuItemType) => {
    setMenuItems([...menuItems, newItem]);
    setCurrentScreen('home');
    Alert.alert('Success', 'Menu item added successfully!');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            menuItems={menuItems}
            onNavigateToAdd={() => setCurrentScreen('add')}
            onNavigateToFilter={() => setCurrentScreen('filter')}
          />
        );
      case 'add':
        return (
          <AddMenuItemScreen
            onSave={handleAddItem}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      case 'filter':
        return (
          <FilterScreen
            menuItems={menuItems}
            onBack={() => setCurrentScreen('home')}
          />
        );
      default:
        return null;
    }
  };

  return renderScreen();
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // General Container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerButton: {
    flex: 1,
    marginHorizontal: 4,
  },

  // Custom Button
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },

  // Total Items
  totalItemsContainer: {
    backgroundColor: colors.accent,
    padding: 12,
    alignItems: 'center',
  },
  totalItemsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },

  // List
  listContainer: {
    padding: 16,
  },

  // Menu Item Card
  menuItemCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  menuItemCourse: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.gray,
  },
  menuItemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent,
    alignSelf: 'center',
  },

  // Empty State
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray,
    marginTop: 32,
  },

  // Screen Title
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },

  // Form
  formContainer: {
    padding: 16,
  },
  inputFieldContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    color: colors.text,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },

  // Course Picker
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: 'center',
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pickerOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  pickerOptionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  // Form Buttons
  formButtons: {
    marginTop: 24,
    gap: 12,
  },
  formButton: {
    width: '100%',
  },

  // Filter Screen
  filterHeader: {
    backgroundColor: colors.primary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  // Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabSelected: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.text,
  },
  tabTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
});