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
import ShareScreen from "./screens/ShareScreen/ShareScreen";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={constants.explore}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === constants.explore) {
            iconName = focused ? "compass" : "compass-outline";
          } else if (rn === constants.search) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === constants.myCourses) {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (rn === constants.statistics) {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (rn === constants.share) {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (rn === constants.account) {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { padding: 10 },
        tabBarButton: [constants.singleCourse].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen
        name={constants.explore}
        component={ExploreScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Tab.Screen name={constants.search} component={SearchScreen} /> */}
      <Tab.Screen
        name={constants.search}
        options={{
          headerShown: false,
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name={constants.myCourses}
        options={{
          headerShown: false,
        }}
        component={MyCoursesScreen}
      />
      <Tab.Screen
        name={constants.share}
        options={{
          headerShown: false,
        }}
        component={ShareScreen}
      />
      {/* <Tab.Screen name={constants.statistics} component={StatisticScreen} /> */}
      <Tab.Screen name={constants.account} component={AccountsScreen} />
      <Tab.Screen
        name={constants.singleCourse}
        component={SingleCourseScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
