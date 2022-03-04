import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { accountsScreenStyles } from "./AccountScreen.style";

export default function AccountsScreen({ navigation }) {
  return (
    <SafeAreaView style={accountsScreenStyles.container}>
      <Text>Accounts Screen</Text>
    </SafeAreaView>
  );
}
