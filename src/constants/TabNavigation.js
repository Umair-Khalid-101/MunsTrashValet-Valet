import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingPage from "../Vallet/screens/LandingPage";
import { AntDesign } from "@expo/vector-icons";
import Setting from "../Vallet/screens/Setting";
import IncidentReports from "../Vallet/screens/IncidentReports";
import AllIncidents from "../Vallet/screens/AllIncidents";
import * as Font from "expo-font";
import NotificationsDetail from "../Vallet/screens/NotificationsDetail";
import { useFocusEffect } from "@react-navigation/native";
// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Vallet/components/Loader";
import { useStateContext } from "../context";

const TabNavigation = () => {
  const { setRoute, setCount } = useStateContext();
  const Tab = createBottomTabNavigator();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadfonts = async () => {
    await Font.loadAsync({
      CircularStd: require("../../assets/CircularStd.ttf"),
      CircularStd: require("../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../assets/CircularStd-Bold.otf"),
      Montserrat: require("../../assets/Montserrat.ttf"),
    });
    setloaded(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadfonts();
      checkData();
      checkCount();
    }, [])
  );

  // CHECK NOTIFICATION COUNT AND ROUTE
  const checkData = async () => {
    setIsLoading(true);
    AsyncStorage.getItem("route")
      .then((result) => {
        if (result !== null) {
          setRoute(JSON.parse(result));
        } else {
          setRoute(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  const checkCount = async () => {
    setIsLoading(true);
    try {
      const result = await AsyncStorage.getItem("count");
      if (result !== null) {
        console.log("Count:", JSON.parse(result));
        setCount(JSON.parse(result));
      } else {
        setCount(0);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Incident Reports") {
                iconName = focused ? "filetext1" : "filetext1";
              } else if (route.name === "NotificationsDetail") {
                iconName = focused ? "bells" : "bells";
              } else if (route.name === "Settings") {
                iconName = focused ? "setting" : "setting";
              }

              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#246BFD",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
              fontFamily: "CircularStd",
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Incident Reports"
            component={AllIncidents}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="NotificationsDetail"
            component={NotificationsDetail}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={Setting}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      )}
      {isLoading && <Loader title={"Getting Data..."} />}
    </>
  );
};

export default TabNavigation;
