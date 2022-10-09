import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const ShareScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  shareHeading: {
    color: colors.orange,
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 5,
  },
  sharingImage: {
    height: 200,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    marginBottom: 30,
  },
  shareButton: {
    borderRadius: 20,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 15,
  },
});
