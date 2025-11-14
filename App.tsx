import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddMenuItemScreen from "./screens/AddMenuItemScreen";
import FilterScreen from "./screens/FilterScreen";
import { MenuItemType } from "./components/MenuItem";

const Stack = createNativeStackNavigator();

// Initial menu items
const INITIAL_MENU_ITEMS: MenuItemType[] = [
  {
    id: "1",
    name: "Caesar Salad",
    course: "Appetizer",
    description: "Crisp romaine lettuce with homemade caesar dressing",
    price: 12.99,
    image: require("./assets/icon.png"),
  },
  {
    id: "2",
    name: "Ribeye Steak",
    course: "Main Course",
    description: "Perfectly grilled 16oz ribeye with seasonal vegetables",
    price: 34.99,
    image: require("./assets/icon.png"),
  },
  {
    id: "3",
    name: "Chocolate Lava Cake",
    course: "Dessert",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 9.99,
    image: require("./assets/icon.png"),
  },
  {
    id: "4",
    name: "Red Wine",
    course: "Beverage",
    description: "Selection of premium red wines from around the world",
    price: 15.99,
    image: require("./assets/icon.png"),
  },
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(INITIAL_MENU_ITEMS);

  const handleAddItem = (newItem: MenuItemType) => {
    setMenuItems([...menuItems, newItem]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          options={{}}
        >
          {(props) => (
            <HomeScreen
              menuItems={menuItems}
              onAddItem={() => props.navigation.navigate("AddItem")}
              onFilter={() => props.navigation.navigate("Filter")}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AddItem"
          options={{}}
        >
          {(props) => (
            <AddMenuItemScreen
              onAddItem={(item) => {
                handleAddItem(item);
                props.navigation.navigate("Home");
              }}
              onCancel={() => props.navigation.navigate("Home")}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Filter"
          options={{}}
        >
          {(props) => (
            <FilterScreen
              menuItems={menuItems}
              onBack={() => props.navigation.navigate("Home")}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
