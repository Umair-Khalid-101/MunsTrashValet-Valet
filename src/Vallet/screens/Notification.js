import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const defaultColor = "#F5F5F5";
const darkDefaultColor = "#94A1B2";
const TrueColor = "#27AE60";
const Icon1BG = "rgba(255, 179, 23,0.1)";
const Icon1C = "#FFB317";
const Icon2BG = "rgba(36, 162, 253,0.1)";
const Icon2C = "#24A2FD";
const Icon3BG = "rgba(118, 36, 253,0.1)";
const Icon3C = "#7624FD";
const Icon4BG = "rgba(253, 36, 127,0.1)";
const Icon4C = "#FD247F";
const Icon5BG = "rgba(36, 253, 58,0.1)";
const Icon5C = "#1ECB2F";

export default function Notification({ route }) {
  const { item } = route.params;
  const NotifCount = item.NotifCount;
  // console.log("NOTIFICATION: ", NotifCount);
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);

  const loadfonts = async () => {
    await Font.loadAsync({
      CircularStd: require("../../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../../assets/CircularStd-Bold.otf"),
      Montserrat: require("../../../assets/Montserrat.ttf"),
    });
    setloaded(true);
  };
  useEffect(() => {
    loadfonts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          style={{
            marginLeft: "5%",
          }}
        >
          Notification Status
        </Text>
        <View style={styles.redbutton}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "blue",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.circle2,
                backgroundColor: NotifCount > 0 ? TrueColor : defaultColor,
              }}
            >
              <MaterialIcons
                name="done"
                size={18}
                color={NotifCount > 0 ? "#FFFFFF" : darkDefaultColor}
              />
            </View>
            <View
              style={{
                ...styles.circle,
                backgroundColor: NotifCount > 0 ? Icon1BG : defaultColor,
              }}
            >
              <AntDesign
                name="clockcircleo"
                size={24}
                color={NotifCount > 0 ? Icon1C : darkDefaultColor}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "65%",
                // backgroundColor: "pink",
                marginLeft: "5%",
              }}
            >
              {loaded ? (
                <>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 0 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    Dear resident your valet will be arriving in 1 hour. Please
                    have your trash ready
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 0 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingTime}
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 0 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingDate}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
        <View style={styles.verticalline}></View>
        <View style={styles.redbutton}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.circle2,
                backgroundColor: NotifCount > 1 ? TrueColor : defaultColor,
              }}
            >
              <MaterialIcons
                name="done"
                size={18}
                color={NotifCount > 1 ? "#FFFFFF" : darkDefaultColor}
              />
            </View>
            <View
              style={{
                ...styles.circle,
                backgroundColor: NotifCount > 1 ? Icon2BG : defaultColor,
              }}
            >
              <MaterialCommunityIcons
                name="timer-sand-empty"
                size={24}
                color={NotifCount > 1 ? Icon2C : darkDefaultColor}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "65%",
                // backgroundColor: "pink",
                marginLeft: "5%",
              }}
            >
              {loaded ? (
                <>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 1 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    Dear resident your valet will arrive in 30 minutes
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 1 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingTime}
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 1 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingDate}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
        <View style={styles.verticalline}></View>
        <View style={styles.redbutton}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.circle2,
                backgroundColor: NotifCount > 2 ? TrueColor : defaultColor,
              }}
            >
              <MaterialIcons
                name="done"
                size={18}
                color={NotifCount > 2 ? "#FFFFFF" : darkDefaultColor}
              />
            </View>
            <View
              style={{
                ...styles.circle,
                backgroundColor: NotifCount > 2 ? Icon3BG : defaultColor,
              }}
            >
              <Feather
                name="trash-2"
                size={24}
                color={NotifCount > 2 ? Icon3C : darkDefaultColor}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "65%",
                // backgroundColor: "pink",
                marginLeft: "5%",
              }}
            >
              {loaded ? (
                <>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 2 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    Dear Resident we have now arrived at your location for trash
                    pick-up
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 2 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingTime}
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 2 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingDate}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
        <View style={styles.verticalline}></View>
        <View style={styles.redbutton}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.circle2,
                backgroundColor: NotifCount > 3 ? TrueColor : defaultColor,
              }}
            >
              <MaterialIcons
                name="done"
                size={18}
                color={NotifCount > 3 ? "#FFFFFF" : darkDefaultColor}
              />
            </View>
            <View
              style={{
                ...styles.circle,
                backgroundColor: NotifCount > 3 ? Icon4BG : defaultColor,
              }}
            >
              <MaterialCommunityIcons
                name="bus-school"
                size={24}
                color={NotifCount > 3 ? Icon4C : darkDefaultColor}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "65%",
                // backgroundColor: "pink",
                marginLeft: "5%",
              }}
            >
              {loaded ? (
                <>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 3 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    We are leaving in 10 mins. Please enter app and request
                    pickup
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 3 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingTime}
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 3 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingDate}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
        <View style={styles.verticalline}></View>
        <View style={styles.redbutton}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                ...styles.circle2,
                backgroundColor: NotifCount > 4 ? TrueColor : defaultColor,
              }}
            >
              <MaterialIcons
                name="done"
                size={18}
                color={NotifCount > 4 ? "#FFFFFF" : darkDefaultColor}
              />
            </View>
            <View
              style={{
                ...styles.circle,
                backgroundColor: NotifCount > 4 ? Icon5BG : defaultColor,
              }}
            >
              <MaterialCommunityIcons
                name="check-all"
                size={20}
                color={NotifCount > 4 ? Icon5C : darkDefaultColor}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "65%",
                // backgroundColor: "pink",
                marginLeft: "5%",
              }}
            >
              {loaded ? (
                <>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 4 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    Thank you
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 4 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingTime}
                  </Text>
                  <Text
                    style={{
                      ...styles.text3,
                      color: NotifCount > 4 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    {item.sendingDate}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.back2}
          onPress={() => navigation.navigate("TabNavigation")}
        >
          {loaded ? <Text style={styles.buttonText}>Go To Home</Text> : ""}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  scrollView: {
    marginVertical: "5%",
  },
  redbutton: {
    width: "90%",
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "white",
    borderColor: "black",
    marginTop: "5%",
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 10,
  },
  circle: {
    display: "flex",
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "rgba(255, 179, 23,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  back2: {
    display: "flex",
    backgroundColor: "#246BFD",
    width: "90%",
    height: 60,
    borderRadius: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
  },
  circle2: {
    display: "flex",
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27AE60",
    marginLeft: "2%",
  },
  text3: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginBottom: "2%",
    width: "100%",
    // backgroundColor: "yellow",
  },
  verticalline: {
    width: "0.5%",
    height: 30,
    backgroundColor: "#D6D6D6",
    position: "relative",
    left: 100,
    borderRadius: 20,
    marginTop: 5,
  },
  buttonText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
