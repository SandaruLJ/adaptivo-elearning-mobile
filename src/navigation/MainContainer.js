import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import ExploreScreen from "./screens/ExploreScreen/ExploreScreen";
import { constants } from "../utils/constants";
import { colors } from "../utils/colors";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import MyCoursesScreen from "./screens/MyCoursesScreen/MyCoursesScreen";
import StatisticScreen from "./screens/StatiscticScreen/StatisticScreen";
import AccountsScreen from "./screens/AccountScreen/AccountScreen";
import SingleCourseScreen from "./screens/SingleCourseScreen/SingleCourseScreen";
import BottomNavigation from "./BottomNavigation";
import { useNetInfo } from "@react-native-community/netinfo";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { getUserByEmail } from "../services/user.service";
import { getAllCoursesByUserId, getUserCourseById } from "../services/usercourse.service";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainContainer() {
  const netInfo = useNetInfo();

  const storeUserInfo = async (email) => {
    const response = await getUserByEmail(email);

    if (response) {
      try {
        await AsyncStorage.setItem("userId", response._id);
        await AsyncStorage.setItem("email", response.email);
        await AsyncStorage.setItem("firstname", response.firstname);
        await AsyncStorage.setItem("lastname", response.lastname);
        await AsyncStorage.setItem("phone", response.phone);
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  };

  const storeCourseInfo = async (email) => {
    const response = await getAllCoursesByUserId(email);

    if (response) {
      try {
        const jsonValue = JSON.stringify(response);
        await AsyncStorage.setItem("courses", jsonValue);
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  };

  React.useEffect(() => {
    if (netInfo.isConnected) {
      Auth.currentAuthenticatedUser().then((data) => {
        storeUserInfo(data.attributes.email);
        storeCourseInfo(data.attributes.email);
      });
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={constants.tabs} component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
