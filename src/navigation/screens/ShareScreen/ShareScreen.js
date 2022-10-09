import * as React from "react";
import { Text, View, Image } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, Caption, Headline, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ShareScreenStyles } from "./ShareScreen.styles";
const sharingImage = require("../../../../assets/images/share.png");

export default function ShareScreen({ navigation }) {
  const styles = ShareScreenStyles;

  const [step, setStep] = React.useState(1);
  const [password, setPassword] = React.useState();
  const [isConnectClicked, setIsConnectClicked] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {step == 1 ? (
        <View>
          <Headline style={styles.shareHeading}>Adaptivo Sharing</Headline>
          <Caption>Share courses among your peers with ease</Caption>
          <Image source={sharingImage} style={styles.sharingImage} />
          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton}>
            Set Up as a Content Hub
          </Button>
          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(2)}>
            Connect to a Content Hub
          </Button>
        </View>
      ) : step == 2 ? (
        <View>
          <Headline style={styles.searchingHeading}>Searching for Devices</Headline>
          <AnimatedCircularProgress style={styles.animatedLoading} size={180} width={5} fill={100} tintColor="#ff9c3f" backgroundColor="#999" duration={10000} onAnimationComplete={() => setStep(3)} />
          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(1)}>
            Back to Adaptivo Sharing
          </Button>
        </View>
      ) : step == 3 ? (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Select a Device</Headline>
          <View>
            <Text
              style={styles.wifiDevices}
              onPress={() => {
                setStep(4);
                setIsConnectClicked(false);
              }}
            >
              Sandaru's Phone
            </Text>
            <Text style={styles.wifiDevices}>Rishard's Phone</Text>
          </View>

          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(1)}>
            Back to Adaptivo Sharing
          </Button>
        </View>
      ) : step == 4 ? (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Enter Password</Headline>
          <View>
            <TextInput label="Password" placeholder="Enter Password" value={password} mode="outlined" onChangeText={(text) => setPassword(text)} style={styles.passwordInput} />

            <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setIsConnectClicked(true)}>
              Connect
            </Button>
            {isConnectClicked && (
              <AnimatedCircularProgress
                style={styles.animatedLoading}
                size={80}
                width={5}
                fill={100}
                tintColor="#ff9c3f"
                backgroundColor="#999"
                duration={8000}
                onAnimationComplete={() => setStep(5)}
              />
            )}
          </View>

          <Button mode="contained" dark={true} uppercase={false} color={"#999"} style={styles.shareButton} onPress={() => setStep(3)}>
            Connect Another Device
          </Button>
        </View>
      ) : (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Connected to Sandaru's Phone</Headline>

          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(3)}>
            Connect Another Device
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
