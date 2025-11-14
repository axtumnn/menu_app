import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MenuItem, { MenuItemType } from "../components/MenuItem";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles";
import colors from "../constants/colors";

interface FilterScreenProps {
  menuItems: MenuItemType[];
  onBack: () => void;
}

const COURSES = ["All", "Appetizer", "Main Course", "Dessert", "Beverage"];

const FilterScreen: React.FC<FilterScreenProps> = ({ menuItems, onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("All");

  const filteredItems =
    selectedCourse === "All"
      ? menuItems
      : menuItems.filter((item) => item.course === selectedCourse);

  const renderHeader = () => (
    <View style={styles.filterHeader}>
      <Text style={styles.headerTitle}>Filter Menu</Text>
      <CustomButton
        title="← Back"
        onPress={onBack}
        bgColor={colors.accent}
        textColor={colors.primary}
        style={styles.backButton}
      />
    </View>
  );

  const renderCourseSelector = () => (
    <View style={styles.pickerContainer}>
      {COURSES.map((course) => (
        <TouchableOpacity
          key={course}
          style={[
            styles.pickerOption,
            selectedCourse === course && styles.pickerOptionSelected,
          ]}
          onPress={() => setSelectedCourse(course)}
        >
          <Text
            style={[
              styles.pickerOptionText,
              selectedCourse === course && styles.pickerOptionTextSelected,
            ]}
          >
            {course}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTotalItems = () => (
    <View style={styles.totalItemsContainer}>
      <Text style={styles.totalItemsText}>
        Results: {filteredItems.length} ({selectedCourse})
      </Text>
    </View>
  );

  const renderEmptyList = () => (
    <Text style={styles.emptyText}>
      No items found in {selectedCourse} category.
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderCourseSelector()}
      {renderTotalItems()}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default FilterScreen;
