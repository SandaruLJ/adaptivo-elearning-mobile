import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { Auth } from "aws-amplify";
import { headerStyles as styles } from "./Header.styles";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const background = require("../../../../../../assets/header-background.png");
const handWave = require("../../../../../../assets/hand-wave.png");

export default function Header(props) {
  const [firstname, setFirstname] = useState("");
  const [initials, setInitials] = useState("");
  const netInfo = useNetInfo();

  useEffect(async () => {
    if (netInfo.isConnected) {
      Auth.currentAuthenticatedUser().then((user) => {
        setFirstname(user.attributes["given_name"]);
        setInitials(`${user.attributes["given_name"][0]}${user.attributes["family_name"][0]}`);
      });
    } else {
      try {
        const firstName = await AsyncStorage.getItem("firstname");
        const lastName = await AsyncStorage.getItem("lastname");
        setFirstname(firstName);
        setInitials(`${firstName[0]}${lastName[0]}`);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <LinearGradient colors={["#ff9e43", "#ffd25a"]} end={{ x: 0.6, y: 0.5 }} style={styles.container}>
      <ImageBackground source={background} style={styles.headerBackground}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hi, {firstname}</Text>
          <Image source={handWave} style={styles.handWave} />
        </View>
        <Text style={styles.subGreeting}>Let's start learning</Text>
        <Searchbar placeholder="Search for courses" style={styles.searchbar} />
        <Avatar rounded size="large" title={initials} containerStyle={styles.avatar} />
      </ImageBackground>
    </LinearGradient>
  );
}
