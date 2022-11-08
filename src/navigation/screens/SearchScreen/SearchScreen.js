import * as React from "react";
import { Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchScreenStyles as styles } from "./SearchScreen.styles";

export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar placeholder="Search for courses" style={styles.searchbar} />
    </SafeAreaView>
  );
}
