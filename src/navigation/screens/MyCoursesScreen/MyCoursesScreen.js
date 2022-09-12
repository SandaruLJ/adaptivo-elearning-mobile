import * as React from "react";
import { Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { myCoursesScreenStyles } from "./MyCoursesScreen.style";
import { Button, Headline, IconButton } from "react-native-paper";
import { colors } from "../../../utils/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SingleCourseContainer from "./SingleCourseContainer";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function MyCoursesScreen({ navigation }) {
  const [dimensions, setDimensions] = React.useState({ window, screen });
  const [selectedTab, setSelectedTab] = React.useState("ongoing");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });
  const styles = myCoursesScreenStyles;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={{ flex: 0.8 }}>
          <Headline style={styles.topBarHeading}>My Courses</Headline>
        </View>
        <View style={styles.topBarIconContainer}>
          <IconButton icon="magnify" style={styles.topBarIcon} size={30} onPress={() => console.log("Pressed")} />
          <IconButton icon="filter-variant" style={styles.topBarIcon} size={30} onPress={() => console.log("Pressed")} />
        </View>
      </View>
      <View style={{ transform: [{ translateX: dimensions.screen.width / -1.4 }], ...styles.ongoingContainer }}>
        <Button
          mode="contained"
          style={selectedTab == "ongoing" ? styles.activeButton : styles.inActiveButton}
          labelStyle={{ color: colors.black }}
          uppercase={false}
          onPress={() => handleTabChange("ongoing")}
        >
          Ongoing
        </Button>
        <Button
          mode="contained"
          style={selectedTab == "completed" ? styles.activeButton : styles.inActiveButton}
          labelStyle={{ color: colors.black }}
          uppercase={false}
          onPress={() => handleTabChange("completed")}
        >
          Completed
        </Button>
      </View>
      <View style={styles.myCourseBody}>
        <SingleCourseContainer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
