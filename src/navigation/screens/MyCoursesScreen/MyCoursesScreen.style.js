import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const myCoursesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  topBarHeading: {
    position: "absolute",
    left: "40%",
    top: -20,
    fontWeight: "700",
  },
  topBarIconContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  topBarIcon: {
    padding: 0,
    margin: 0,
  },
  ongoingContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#e5e5e5",
    width: 212,
    borderRadius: 10,
    left: "50%",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 10,
  },
  inActiveButton: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  myCourseBody: {
    marginTop: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 2,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  courseContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "white",

    borderRadius: 20,
    // padding: 20,
  },
  courseImage: {
    height: 200,
    width: "100%",
  },
  courseContainerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 80,
    alignItems: "center",
    // position: "relative",
    // bottom: 20,
  },
  courseName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
  courseContainerBody: {
    padding: 20,
  },
  instructorName: {
    color: colors.white,
  },
  percentage: {
    color: colors.white,
  },
  progressContainer: {
    alignItems: "center",
  },
  lessonCount: {
    color: "white",
    paddingTop: 10,
  },
  dotIcon: {
    right: 10,
    top: 10,
    position: "absolute",
  },
});
