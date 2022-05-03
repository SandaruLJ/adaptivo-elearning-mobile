import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import CustomScrollView from "./components/CustomScrollView/CustomScrollView";
import Header from "./components/Header/Header";
import { exploreScreenStyles } from "./ExploreScreen.styles";

export default function ExploreScreen({ navigation }) {
  return (
    <SafeAreaView style={exploreScreenStyles.container}>
      <Header />
      <ScrollView style={exploreScreenStyles.scrollView}>
        <CustomScrollView
          title="Ongoing Courses"
          subtitle="10 enrolled courses"
          type="course-progress"
        />
        <CustomScrollView
          title="Popular Courses"
          type="course-details"
        />
        <CustomScrollView
          title="Categories"
          type="categories"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
