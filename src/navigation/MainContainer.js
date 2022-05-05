import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MainContainer() {
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
