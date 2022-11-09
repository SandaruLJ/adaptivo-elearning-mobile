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

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ListItem } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import { getAllCoursesByUserId } from "../../../services/usercourse.service";
import { Auth } from "aws-amplify";

export default function ShareScreen({ navigation }) {
  const styles = ShareScreenStyles;

  const [step, setStep] = React.useState(1);
  const [password, setPassword] = React.useState();
  const [isConnectClicked, setIsConnectClicked] = React.useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState();
  const [passwordError, setPasswordError] = React.useState();
  const [deviceList, setDeviceList] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [ssid, setSsid] = React.useState("");
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [selectedUnits, setSelectedUnits] = React.useState({});

  let peersUpdatesSubscription, connectionInfoUpdatesSubscription, thisDeviceChangedSubscription;

  const [ongoingCourses, setOngoingCourses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getOngoingCourses = async (email) => {
    setIsLoading(true);
    const response = await getAllCoursesByUserId(email);
    console.log("Done");
    setOngoingCourses(response);
    setIsLoading(false);
  };
  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      getOngoingCourses(data.attributes.email);
    });
  }, []);

  React.useEffect(async () => {
    setPasswordError("");
    setIsPasswordCorrect(false);
    setPassword("");

    try {
      await initialize();
      // since it's required in Android >= 6.0
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
        title: "Access to wi-fi P2P mode",
        message: "ACCESS_COARSE_LOCATION",
      });

      console.log(granted === PermissionsAndroid.RESULTS.GRANTED ? "You can use the p2p mode" : "Permission denied: p2p mode will not work");

      this.peersUpdatesSubscription = subscribeOnPeersUpdates(this.handleNewPeers);
      this.connectionInfoUpdatesSubscription = subscribeOnConnectionInfoUpdates(this.handleNewInfo);
      this.thisDeviceChangedSubscription = subscribeOnThisDeviceChanged(this.handleThisDeviceChanged);

      const status = await startDiscoveringPeers();

      console.log("startDiscoveringPeers status: ", status);
      onGetAvailableDevices();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleNewPeers = ({ devices }) => {
    console.log("OnPeersUpdated", devices);
    setDeviceList(devices);
  };

  const handleThisDeviceChanged = (groupInfo) => {
    console.log("THIS_DEVICE_CHANGED_ACTION", groupInfo);
  };

  const connectToFirstDevice = () => {
    console.log("Connect to: ", deviceList[0]);
    connect(deviceList[0].deviceAddress)
      .then(() => console.log("Successfully connected"))
      .catch((err) => console.error("Something gone wrong. Details: ", err));
  };

  const onCancelConnect = () => {
    cancelConnect()
      .then(() => console.log("cancelConnect", "Connection successfully canceled"))
      .catch((err) => console.error("cancelConnect", "Something gone wrong. Details: ", err));
  };

  const onCreateGroup = () => {
    createGroup()
      .then(() => console.log("Group created successfully!"))
      .catch((err) => console.error("Something gone wrong. Details: ", err));
  };

  const onRemoveGroup = () => {
    removeGroup()
      .then(() => console.log("Currently you don't belong to group!"))
      .catch((err) => console.error("Something gone wrong. Details: ", err));
  };

  const onStopInvestigation = () => {
    stopDiscoveringPeers()
      .then(() => console.log("Stopping of discovering was successful"))
      .catch((err) => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details`, err));
  };

  const onStartInvestigate = () => {
    startDiscoveringPeers()
      .then((status) => console.log("startDiscoveringPeers", `Status of discovering peers: ${status}`))
      .catch((err) => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`));
  };

  const onGetAvailableDevices = () => {
    getAvailablePeers().then((peers) => {
      console.log(peers);
      setDeviceList(peers.devices);
    });
  };

  const onGetConnectionInfo = () => {
    getConnectionInfo().then((info) => console.log("getConnectionInfo", info));
  };

  const onGetGroupInfo = () => {
    getGroupInfo().then((info) => console.log("getGroupInfo", info));
  };
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

  const onConnectToContentHubClick = async () => {
    setStep(2);
    const status = await startDiscoveringPeers();

    console.log("startDiscoveringPeers status: ", status);
    onGetAvailableDevices();
  };

  const onSelectCourseCheckbox = (id, value) => {
    console.log(1);
    if (value) {
      const course = ongoingCourses.filter((elem) => elem._id == id);
      let ids = [id];
      let unitIds = [];
      course[0].learningPath.map((section) => {
        ids.push(section._id);
        section.units.map((unit) => {
          ids.push(unit._id);
          unitIds.push(unit._id);
        });
      });
      setSelectedCheckbox([...selectedCheckbox, ...ids]);
      setSelectedUnits({ ...selectedUnits, [id]: unitIds });
    } else {
      const course = ongoingCourses.filter((elem) => elem._id == id);
      let ids = [id];
      course[0].learningPath.map((section) => {
        ids.push(section._id);
        section.units.map((unit) => {
          ids.push(unit._id);
        });
      });
      let temp = selectedCheckbox.filter((elem) => !ids.includes(elem));
      setSelectedCheckbox(temp);
      setSelectedUnits({ ...selectedUnits, [id]: [] });
    }
  };
  const onSelectSectionCheckbox = (courseId, sectionId, value) => {
    console.log(2);

    if (value) {
      const course = ongoingCourses.filter((elem) => elem._id == courseId);
      const section = course[0].learningPath.filter((elem) => elem._id == sectionId);

      let ids = [sectionId];
      let unitIds = [];

      section[0].units.map((unit) => {
        ids.push(unit._id);
        unitIds.push(unit._id);
      });

      setSelectedCheckbox([...selectedCheckbox, ...ids]);

      if (selectedUnits.hasOwnProperty(courseId)) {
        setSelectedUnits({ ...selectedUnits, [courseId]: [...selectedUnits[courseId], ...unitIds] });
      } else {
        setSelectedUnits({ ...selectedUnits, [courseId]: unitIds });
      }
    } else {
      const course = ongoingCourses.filter((elem) => elem._id == courseId);
      const section = course[0].learningPath.filter((elem) => elem._id == sectionId);

      let ids = [sectionId];
      let unitIds = [];
      section[0].units.map((unit) => {
        ids.push(unit._id);
        unitIds.push(unit._id);
      });
      let temp = selectedCheckbox.filter((elem) => !ids.includes(elem));
      setSelectedCheckbox(temp);

      if (selectedUnits.hasOwnProperty(courseId)) {
        let temp = selectedUnits[courseId].filter((elem) => !unitIds.includes(elem));
        setSelectedUnits({ ...selectedUnits, [courseId]: temp });
      }
    }
  };
  const onSelectUnitCheckbox = (id, courseId, value) => {
    if (value) {
      setSelectedCheckbox([...selectedCheckbox, id]);
      if (selectedUnits.hasOwnProperty(courseId)) {
        setSelectedUnits({ ...selectedUnits, [courseId]: [...selectedUnits[courseId], id] });
      } else {
        setSelectedUnits({ ...selectedUnits, [courseId]: [id] });
      }
      console.log(selectedUnits);
    } else {
      let temp = selectedCheckbox.filter((elem) => elem != id);
      setSelectedCheckbox(temp);
      if (selectedUnits.hasOwnProperty(courseId)) {
        let temp = selectedUnits[courseId].filter((elem) => elem != id);
        setSelectedUnits({ ...selectedUnits, [courseId]: temp });
      }
      console.log(selectedUnits);
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
          <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => onConnectToContentHubClick()}>
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
          <Headline style={styles.searchingHeading}>Select Transfer Type</Headline>
          <View>
            <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => onConnectToContentHubClick()}>
              Automatic Transfer
            </Button>
            <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(5)}>
              Manual Transfer
            </Button>
          </View>
          {/* <Headline style={styles.searchingHeading}>Enter Password</Headline>
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
          </View> */}
          <Button mode="contained" dark={true} uppercase={false} color={"#999"} style={styles.shareButton} onPress={() => setStep(3)}>
            Connect Another Device
          </Button>
        </View>
      ) : step == 5 ? (
        <View style={styles.devicesContainer}>
          <Headline style={styles.searchingHeading}>Manual Transfer</Headline>
          <ScrollView style={styles.accordion}>
            {ongoingCourses.map((course) => {
              return (
                <Collapse style={styles.accordion} key={course._id}>
                  <CollapseHeader>
                    <View style={styles.accordionHeader}>
                      <View style={styles.checkboxContainer}>
                        <CheckBox value={selectedCheckbox.includes(course._id)} onValueChange={(newValue) => onSelectCourseCheckbox(course._id, newValue)} />
                        <Text>{course.courseId.title}</Text>
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    {course.learningPath.map((section) => {
                      return (
                        <Collapse key={section._id}>
                          <CollapseHeader>
                            <View style={styles.sectionHeader}>
                              <View style={styles.checkboxContainer}>
                                <CheckBox value={selectedCheckbox.includes(section._id)} onValueChange={(newValue) => onSelectSectionCheckbox(course._id, section._id, newValue)} />
                                <Text>{section.name}</Text>
                              </View>
                            </View>
                          </CollapseHeader>
                          <CollapseBody>
                            {section.units.map((unit) => {
                              return (
                                <ListItem key={unit._id} style={styles.unitList}>
                                  <View style={styles.checkboxContainer}>
                                    <CheckBox value={selectedCheckbox.includes(unit._id)} onValueChange={(newValue) => onSelectUnitCheckbox(unit._id, course._id, newValue)} />
                                    <Text>{unit.name}</Text>
                                  </View>
                                </ListItem>
                              );
                            })}
                          </CollapseBody>
                        </Collapse>
                      );
                    })}
                  </CollapseBody>
                </Collapse>
              );
            })}
            <Button mode="contained" dark={true} uppercase={false} color={colors.orange} style={styles.shareButton} onPress={() => setStep(3)}>
              Start Transfer
            </Button>
          </ScrollView>
        </View>
      ) : step == 10 ? (
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
