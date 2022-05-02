import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import { exploreScreenStyles } from "./ExploreScreen.styles";

export default function ExploreScreen({ navigation }) {
  return (
    <SafeAreaView style={exploreScreenStyles.container}>
      <Header />
    </SafeAreaView>
  );
}
