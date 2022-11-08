import * as React from "react";
import { Text, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { myCoursesScreenStyles } from "./MyCoursesScreen.style";
import { ActivityIndicator, Button, Headline, IconButton } from "react-native-paper";
import { colors } from "../../../utils/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SingleCourseContainer from "./SingleCourseContainer";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCoursesByUserId } from "../../../services/usercourse.service";
import { myCoursesScreenStyles as style } from "./MyCoursesScreen.style";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function MyCoursesScreen({ navigation }) {
  const [dimensions, setDimensions] = React.useState({ window, screen });
  const [selectedTab, setSelectedTab] = React.useState("ongoing");
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOngoingCourses = async (email) => {
    setIsLoading(true);
    const response = await getAllCoursesByUserId(email);
    setOngoingCourses(response);
    setIsLoading(false);
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      getOngoingCourses(data.attributes.email);
    });
  }, []);

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
      <View style={{ transform: [{ translateX: dimensions.screen.width / -1.5 }], ...styles.ongoingContainer }}>
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
      {selectedTab == "ongoing" && (
        <View style={styles.myCourseBody}>
          {isLoading ? (
            <View style={style.loadingContainer}>
              <ActivityIndicator size="large" color={colors.orange} />
            </View>
          ) : (
            <ScrollView style={style.myCoursesContainer}>
              {ongoingCourses.map((course) => (
                <SingleCourseContainer
                  key={course._id}
                  navigation={navigation}
                  id={course._id}
                  name={course.courseId.title}
                  completed={2}
                  total={course.learningPath[0].units.length + course.learningPath[1].units.length}
                  thumbnail={course.courseId.thumbnail.url}
                  progress={course.progress}
                  instructor={"Mr.Chandana Jayasinghe"}
                />
              ))}
            </ScrollView>
          )}
        </View>
      )}
      {selectedTab == "completed" && (
        <View style={styles.myCourseBody}>
          <Text>No completed courses</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
