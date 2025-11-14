import { StyleSheet } from "react-native";
import colors from "./constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerButton: {
    flex: 1,
    marginHorizontal: 4,
  },

  // BUTTON
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  customButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },

  totalItemsContainer: {
    backgroundColor: colors.accent,
    padding: 12,
    alignItems: "center",
  },
  totalItemsText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  listContainer: {
    padding: 16,
  },

  menuItemCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
    justifyContent: "center",
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: colors.accent,
    alignSelf: "center",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.gray,
    marginTop: 32,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 24,
    textAlign: "center",
  },

  formContainer: {
    padding: 16,
  },
  inputFieldContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
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
    textAlignVertical: "top",
  },

  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pickerOption: {
    flex: 1,
    minWidth: "45%",
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.lightGray,
    alignItems: "center",
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
    fontWeight: "600",
  },

  formButtons: {
    marginTop: 24,
    gap: 12,
  },
  formButton: {
    width: "100%",
  },

  filterHeader: {
    backgroundColor: colors.primary,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
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
    fontWeight: "600",
  },
});
