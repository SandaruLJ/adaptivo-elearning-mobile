import * as React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Button, Caption, Headline, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ShareScreenStyles } from "./ShareScreen.styles";
const sharingImage = require("../../../../assets/images/share.png");
import { PermissionsAndroid } from "react-native";
import WifiManager from "react-native-wifi-reborn";
import { constants } from "../../../utils/constants";

import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  sendFile,
  receiveFile,
  getConnectionInfo,
  getGroupInfo,
  receiveMessage,
  sendMessage,
} from "react-native-wifi-p2p";

export default function OldShareScreen({ navigation }) {
  const styles = ShareScreenStyles;

  const [step, setStep] = React.useState(1);
  const [password, setPassword] = React.useState();
  const [isConnectClicked, setIsConnectClicked] = React.useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState();
  const [passwordError, setPasswordError] = React.useState();
  const [deviceList, setDeviceList] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [ssid, setSsid] = React.useState("");

  let peersUpdatesSubscription, connectionInfoUpdatesSubscription, thisDeviceChangedSubscription;

  React.useEffect(async () => {
    setPasswordError("");
    setIsPasswordCorrect(false);
    setPassword("");

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Location permission is required for WiFi connections",
      message: "This app needs location permission as this is required  " + "to scan for wifi networks.",
      buttonNegative: "DENY",
      buttonPositive: "ALLOW",
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log("Wifi Permission Granted");
      let wifiList = await getWifiConnectionList();
      setDeviceList(wifiList);
    } else {
      // Permission denied
      console.log("Wifi Permission Denied");
    }
  }, []);

  const getWifiConnectionList = async () => {
    return WifiManager.reScanAndLoadWifiList()
      .then((list) => {
        return list;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const verifyPassword = async () => {
    console.log;
    if (password == null || password.length == 0) {
      setPasswordError("Please Enter a Password");
      setIsPasswordCorrect(false);
    } else if (password == constants.password) {
      setPasswordError("");
      setIsPasswordCorrect(true);
      if (status) {
        WifiManager.connectToProtectedSSID(ssid, password, false)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      setIsPasswordCorrect(false);
      setPasswordError("Incorrect Password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step == 1 ? (
        <View>
          <Headline style={styles.shareHeading}>Adaptivo Sharing</Headline>
          <Caption>Share courses among your peers with ease</Caption>
          <Image source={sharingImage} style={styles.sharingImage} />
          {/* <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(6)}>
            Set Up as a Content Hub
          </Button> */}
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
          <ScrollView>
            {deviceList.map((device, i) => {
              return (
                <Text
                  key={device.BSSID}
                  style={styles.wifiDevices}
                  onPress={() => {
                    setStep(4);
                    setIsConnectClicked(false);
                    setPassword("");
                    setPasswordError("");
                  }}
                >
                  {device.SSID}
                </Text>
              );
            })}
            <Text
              style={styles.wifiDevices}
              onPress={() => {
                setStep(4);
                setIsConnectClicked(false);
                setPassword("");
                setPasswordError("");
              }}
            >
              {constants.device}
            </Text>
          </ScrollView>

          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(1)}>
            Back to Adaptivo Sharing
          </Button>
        </View>
      ) : step == 4 ? (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Enter Password</Headline>
          <View>
            <TextInput
              label="Password"
              placeholder="Enter Password"
              value={password}
              mode="outlined"
              onChangeText={(text) => setPassword(text)}
              style={styles.passwordInput}
              activeOutlineColor={colors.orange}
              secureTextEntry={true}
            />
            <Text style={styles.passwordError}>{passwordError}</Text>
            <Button
              mode="contained"
              dark={true}
              uppercase={false}
              color={colors.orange}
              style={styles.shareButton}
              onPress={() => {
                setIsConnectClicked(true);
                verifyPassword();
              }}
            >
              Connect
            </Button>
            {isConnectClicked && isPasswordCorrect && (
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
      ) : step == 5 ? (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Connected to the Device</Headline>

          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(3)}>
            Connect Another Device
          </Button>
        </View>
      ) : (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>{constants.contentHubTitle}</Headline>
          <View>
            <Text style={styles.contentHubDetails}>Please use the following details to connect to the content hub</Text>
            <Text style={styles.contentHubCredentials}>SSID: {constants.ssid}</Text>
            <Text style={styles.contentHubCredentials}>Password: {constants.ssidPass}</Text>
          </View>
          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(1)}>
            Back to Adaptivo Sharing
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
