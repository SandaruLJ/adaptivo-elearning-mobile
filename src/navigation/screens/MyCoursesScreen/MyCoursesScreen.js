import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myCoursesScreenStyles } from "./MyCoursesScreen.style";

export default function MyCoursesScreen({ navigation }) {
  return (
    <SafeAreaView style={myCoursesScreenStyles.container}>
      <Text>My Courses Screen</Text>
    </SafeAreaView>
  );
}
