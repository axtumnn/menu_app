import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import { styles } from "../styles";
import colors from "../constants/colors";

export interface MenuItemType {
  id: string;
  name: string;
  course: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
}

interface MenuItemProps {
  item: MenuItemType;
  style?: ViewStyle;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, style }) => {
  return (
    <View style={[styles.menuItemCard, style]}>
      <Image source={item.image} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemCourse}>{item.course}</Text>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );
};

export default MenuItem;
