import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

const windowHeight = Dimensions.get('window').height;

export const exploreScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    width: '100%',
    marginTop: windowHeight * 25/100 + 4,
  }
});
