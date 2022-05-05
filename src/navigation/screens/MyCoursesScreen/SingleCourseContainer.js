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
import { TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native";
import { constants } from "../../../utils/constants";

export default function SingleCourseContainer(props) {
  const styles = myCoursesScreenStyles;
  return (
    <TouchableHighlight style={styles.courseContainer} onPress={() => props.navigation.navigate(constants.singleCourse)}>
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 10, width: "100%" }}
          resizeMode="cover"
          source={{ uri: "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/courses/thumbnail/2415973.jpg" }}
          style={styles.courseImage}
        >
          <LinearGradient colors={["#0000004D", "#0000004D"]} useAngle={true} angle={45} angleCenter={{ x: 0.5, y: 0.5 }} style={{ borderRadius: 20 }}>
            <View style={styles.courseContainerBody}>
              <IconButton icon="dots-vertical" style={styles.dotIcon} size={30} color={colors.white} onPress={() => console.log("Pressed")} />

              <View style={styles.courseContainerDetails}>
                <View>
                  <Text style={styles.courseName}>Grade 10 Science</Text>
                  <Text style={styles.instructorName}>Dr. Angela Yu</Text>
                </View>
                <View style={styles.progressContainer}>
                  <AnimatedCircularProgress size={50} width={5} fill={75} tintColor="#fff" backgroundColor="#ffffff4D">
                    {(fill) => <Text style={{ color: "white" }}>75</Text>}
                  </AnimatedCircularProgress>
                  <Text style={styles.lessonCount}>25/30 lessons</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );
}
