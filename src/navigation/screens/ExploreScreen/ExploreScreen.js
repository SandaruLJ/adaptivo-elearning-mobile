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
        <CustomScrollView title="Ongoing Courses" subtitle="2 enrolled courses" type="course-progress" navigation={navigation} />
        <CustomScrollView title="Popular Courses" type="course-details" navigation={navigation} />
        <CustomScrollView title="Categories" type="categories" navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
