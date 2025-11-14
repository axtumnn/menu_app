import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles";
import colors from "../constants/colors";
import { MenuItemType } from "../components/MenuItem";

type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
};

type AddMenuItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddItem"
>;

interface AddMenuItemScreenComponentProps {
  onAddItem: (item: MenuItemType) => void;
  onCancel: () => void;
}

const COURSES = ["Appetizer", "Main Course", "Dessert", "Beverage"];

const AddMenuItemScreen: React.FC<AddMenuItemScreenComponentProps> = ({
  onAddItem,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleAddItem = () => {
    if (!name.trim() || !description.trim() || !price.trim() || !selectedCourse) {
      Alert.alert("Validation Error", "Please fill in all fields and select a course");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert("Invalid Price", "Please enter a valid price");
      return;
    }

    const newItem: MenuItemType = {
      id: Date.now().toString(),
      name: name.trim(),
      course: selectedCourse,
      description: description.trim(),
      price: parsedPrice,
      image: require("../assets/icon.png"),
    };

    onAddItem(newItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Menu Item</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <InputField
          label="Item Name"
          placeholder="e.g., Grilled Salmon"
          value={name}
          onChangeText={setName}
        />

        <InputField
          label="Description"
          placeholder="e.g., Fresh salmon with lemon butter sauce"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />

        <InputField
          label="Price"
          placeholder="e.g., 29.99"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Course</Text>
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
                    selectedCourse === course &&
                      styles.pickerOptionTextSelected,
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formButtons}>
          <CustomButton
            title="Save Item"
            onPress={handleAddItem}
            bgColor={colors.primary}
            style={styles.formButton}
          />
          <CustomButton
            title="Cancel"
            onPress={onCancel}
            bgColor={colors.lightGray}
            textColor={colors.text}
            style={styles.formButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMenuItemScreen;
