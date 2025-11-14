import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MenuItem, { MenuItemType } from "../components/MenuItem";
import CustomButton from "../components/CustomButton";
import { styles } from "../styles";
import colors from "../constants/colors";

type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

interface HomeScreenComponentProps {
  menuItems: MenuItemType[];
  onAddItem: () => void;
  onFilter: () => void;
}

const HomeScreen: React.FC<HomeScreenComponentProps> = ({
  menuItems,
  onAddItem,
  onFilter,
}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Christoffel du Chef</Text>
      <View style={styles.headerButtons}>
        <View style={styles.headerButton}>
          <CustomButton
            title="+ Add Item"
            onPress={onAddItem}
            bgColor={colors.accent}
            textColor={colors.primary}
          />
        </View>
        <View style={styles.headerButton}>
          <CustomButton
            title="🔍 Filter"
            onPress={onFilter}
            bgColor={colors.primary}
            textColor={colors.accent}
          />
        </View>
      </View>
    </View>
  );

  const renderTotalItems = () => (
    <View style={styles.totalItemsContainer}>
      <Text style={styles.totalItemsText}>
        Total Items: {menuItems.length}
      </Text>
    </View>
  );

  const renderEmptyList = () => (
    <Text style={styles.emptyText}>No menu items yet. Add one!</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTotalItems()}
      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
