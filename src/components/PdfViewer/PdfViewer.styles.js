import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";

export const PdfViewerStyles = StyleSheet.create({
  mainContainer: {
    height: 400,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: 400,
  },
});
