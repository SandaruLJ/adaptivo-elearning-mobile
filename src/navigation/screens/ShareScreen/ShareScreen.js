import * as React from "react";
import { Text, View, Image } from "react-native";
import { Button, Caption, Headline } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ShareScreenStyles } from "./ShareScreen.styles";
const sharingImage = require("../../../../assets/images/share.png");

export default function ShareScreen({ navigation }) {
  const styles = ShareScreenStyles;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Headline style={styles.shareHeading}>Adaptivo Sharing</Headline>
        <Caption>Share courses among your peers with ease</Caption>
        <Image source={sharingImage} style={styles.sharingImage} />
        <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton}>
          Set Up as a Content Hub
        </Button>
        <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton}>
          Connect to a Content Hub
        </Button>
      </View>
    </SafeAreaView>
  );
}
