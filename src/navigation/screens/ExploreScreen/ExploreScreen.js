import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import CustomScrollView from "./components/CustomScrollView/CustomScrollView";
import Header from "./components/Header/Header";
import { exploreScreenStyles } from "./ExploreScreen.styles";
import { useNetInfo } from "@react-native-community/netinfo";
import { useState } from "react";
import { useEffect } from "react";

export default function ExploreScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    setIsConnected(netInfo.isConnected);
  }, [netInfo.isConnected]);

  return (
    <SafeAreaView style={exploreScreenStyles.container}>
      <Header />
      <ScrollView style={exploreScreenStyles.scrollView}>
        {/* <CustomScrollView title="Ongoing Courses" subtitle="2 enrolled courses" type="course-progress" navigation={navigation} /> */}
        {isConnected && <CustomScrollView title="Popular Courses" type="course-details" navigation={navigation} />}
        {isConnected && <CustomScrollView title="Categories" type="categories" navigation={navigation} />}
      </ScrollView>
    </SafeAreaView>
  );
}
