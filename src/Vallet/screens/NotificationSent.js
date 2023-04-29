import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSent() {
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
      <ImageBackground
        source={require("../../../assets/donebg.png")}
        style={styles.backgroundimage}
      >
        <View style={styles.parentbox}>
          <View style={styles.childbox}>
            <Entypo
              name="cross"
              size={24}
              color="white"
              style={{ position: "absolute", left: 20 }}
              onPress={() => navigation.navigate("TabNavigation")}
            />
          </View>

          {loaded ? <Text style={styles.text1}>Send Notification</Text> : ""}
        </View>
        <View style={styles.greyline}></View>
        <View style={styles.whitebox}>
          <View style={styles.greenbox}>
            <View style={styles.greencircle}>
              <MaterialIcons name="done" size={24} color="white" />
            </View>
          </View>
          {loaded ? <Text style={styles.text2}>Notification Sent</Text> : ""}
          {loaded ? (
            <Text style={styles.text3}>
              You have successfully sent the notification!
            </Text>
          ) : (
            ""
          )}
        </View>
        <TouchableOpacity
          style={styles.buttoncontainer}
          onPress={() => {
            navigation.navigate("SendNotification");
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <AntDesign
              name="bells"
              size={24}
              color="#246BFD"
              style={{ marginLeft: 20, marginTop: 5 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {loaded ? (
                <Text style={styles.text4}>View All Notifications</Text>
              ) : (
                ""
              )}
              {loaded ? (
                <Text style={styles.text5}>
                  See All the previous notifications
                </Text>
              ) : (
                ""
              )}
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#94A1B2"
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              right: 20,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("TabNavigation")}
        >
          {loaded ? <Text style={styles.text6}>Back To Home</Text> : ""}
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#246BFD",
  },
  backgroundimage: {
    display: "flex",
    flex: 1,
  },
  parentbox: {
    display: "flex",
    marginTop: "5%",
  },

  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,

    color: "white",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 30,
  },
  whitebox: {
    display: "flex",
    backgroundColor: "white",
    width: "90%",
    height: 250,
    alignSelf: "center",
    borderRadius: 16,
    marginTop: 20,

    alignItems: "center",
  },
  greenbox: {
    display: "flex",
    width: "40%",
    height: 100,
    backgroundColor: "rgba(39, 174, 96, 0.1)",
    borderRadius: 16,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  greencircle: {
    width: 52,
    height: 52,
    backgroundColor: "#27AE60",
    borderRadius: 52,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    alignSelf: "center",
    fontFamily: "CircularStd-Bold",
    fontSize: 16,
    marginTop: 20,
  },
  text3: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    marginTop: 10,
    color: "#94A1B2",
  },
  reportbox: {
    display: "flex",
    width: "90%",
    height: 80,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 16,
  },
  buttoncontainer: {
    width: "90%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "white",

    elevation: 1,
    marginTop: 30,
  },
  text4: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 1,
  },
  text5: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
    color: "#94A1B2",
  },
  text6: {
    fontFamily: "CircularStd",
    fontSize: 14,
    color: "#246BFD",
  },
  back: {
    display: "flex",
    backgroundColor: "white",
    width: "90%",
    height: 60,
    borderRadius: 16,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
