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
  searchingHeading: {
    color: colors.orange,
    fontWeight: "700",
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
  animatedLoading: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 20,
  },
  wifiDevices: {
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#999",
    width: 250,
  },
  devicesContainer: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  passwordInput: {
    height: 50,
    width: 300,
  },
  passwordError: {
    color: "#ff0000",
  },
  contentHubDetails: {
    padding: 10,
    paddingBottom: 50,
  },
  contentHubCredentials: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    padding: 10,
  },
});
