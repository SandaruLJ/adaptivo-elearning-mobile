import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { statisticsScreenStyles } from "./StatisticScreen.styles";

export default function StatisticScreen({ navigation }) {
  return (
    <SafeAreaView style={statisticsScreenStyles.container}>
      <Text>Statistics Screen</Text>
    </SafeAreaView>
  );
}
