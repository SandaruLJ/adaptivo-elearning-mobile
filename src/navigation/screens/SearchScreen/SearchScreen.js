import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchScreenStyles } from "./SearchScreen.styles";

export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView style={searchScreenStyles.container}>
      <Text>Search Screen</Text>
    </SafeAreaView>
  );
}
