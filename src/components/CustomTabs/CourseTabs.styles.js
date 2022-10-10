import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const courseTabStyles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
  },
  sectionHead: {
    backgroundColor: "#e5e5e5",
    color: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    flex: 0.9,
  },
  sectionDownloadIcon: {
    flex: 0.1,
  },
  downloadProgress: {
    flex: 0.2,
    marginLeft: 25,
  },
  sectionBody: {
    marginTop: 5,
    flex: 1,
  },
  unit: {
    flexDirection: "row",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,

    alignItems: "center",
  },
  unitText: {
    fontWeight: "700",
    fontSize: 16,
  },
  conceptHeading: {
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "700",
  },
  conceptBody: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
