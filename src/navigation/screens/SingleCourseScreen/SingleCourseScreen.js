import React, { useRef } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";
import { View } from "react-native";
import { singleCourseScreenStyles } from "./SingleCourseScreen.style";
import { Caption, Colors, Headline, IconButton, Subheading, Title } from "react-native-paper";

import { Tabs, TabScreen } from "react-native-paper-tabs";

import CourseTabs from "../../../components/CustomTabs/CourseTabs";
import BottomNavigation from "../../BottomNavigation";

export default function SingleCourseScreen({ navigation }) {
  const style = singleCourseScreenStyles;
  const videoPlayer = useRef();
  return (
    <SafeAreaView style={style.container}>
      <Video
        source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }} // Can be a URL or a local file.
        ref={(ref) => {
          videoPlayer.current = ref;
        }}
        controls={true}
        resizeMode="cover"
        style={style.backgroundVideo}
      />
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
        <View style={style.courseDetails}>
          <View style={{ flex: 0.8 }}>
            <Title>Newtons' law</Title>
            <Caption>Grade 10 Science</Caption>
          </View>
          <View style={{ flex: 0.4, flexDirection: "row" }}>
            <IconButton icon="bookmark-outline" size={34} onPress={() => console.log("Pressed")} />
            <IconButton icon="download" size={34} onPress={() => console.log("Pressed")} />
          </View>
        </View>
        <CourseTabs />
      </View>
    </SafeAreaView>
  );
}
