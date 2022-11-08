import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const singleCourseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: "center",
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    height: 250,
    width: "100%",
    backgroundColor: "black",
  },
  courseDetails: {
    backgroundColor: colors.white,
    width: "100%",
    // height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -5,
    padding: 15,
    marginBottom: -10,
    flexDirection: "row",
  },
  courseDetailIcon: {
    padding: 0,
    margin: 0,
  },
});
