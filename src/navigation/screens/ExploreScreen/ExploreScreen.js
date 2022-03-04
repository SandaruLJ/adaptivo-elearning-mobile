import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { exploreScreenStyles } from "./ExploreScreen.styles";

export default function ExploreScreen({ navigation }) {
  return (
    <SafeAreaView style={exploreScreenStyles.container}>
      <Text>Explore Screen</Text>
    </SafeAreaView>
  );
}
