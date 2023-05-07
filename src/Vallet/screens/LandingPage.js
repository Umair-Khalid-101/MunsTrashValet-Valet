import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import Vector from "../../Svgs/Vector";
import MunsTrashValet from "../../Svgs/MunsTrashValet";
import { useStateContext } from "../../context";
import Loader from "../components/Loader";

function LandingPage(props) {
  const { setCount, route, updatingToken } = useStateContext();
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadfonts = async () => {
    await Font.loadAsync({
      CircularStd: require("../../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../../assets/CircularStd-Bold.otf"),
      Montserrat: require("../../../assets/Montserrat.ttf"),
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
    try {
      const result = await AsyncStorage.getItem("route");
      if (result !== null) {
        console.log("Route:", JSON.parse(result));
        setCount(JSON.parse(result));
      } else {
        setCount(0);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // CHECK COUNT
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
      {!isLoading && !updatingToken && (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <Vector />
            {loaded ? (
              <Text
                style={{
                  // backgroundColor: "pink",
                  alignSelf: "center",
                  color: "#246BFD",
                  fontFamily: "Montserrat",
                  marginTop: "2%",
                  fontSize: 24,
                }}
              >
                Muns Trash Valet
              </Text>
            ) : (
              ""
            )}
          </View>
          <ScrollView>
            <View style={styles.parentcontainer}>
              <View style={styles.container1}>
                <ImageBackground
                  source={require("../../../assets/Dust.png")}
                  style={styles.dust}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                    }}
                  >
                    <View style={styles.bannertext}>
                      <View style={styles.secondtext}>
                        {loaded ? (
                          <Text style={styles.hitext}>Hi There</Text>
                        ) : (
                          ""
                        )}
                        <Image
                          source={require("../../../assets/hand.png")}
                          style={styles.hand}
                        />
                      </View>
                      {loaded ? (
                        <Text style={styles.welcometext}>
                          Welcome Back to Muns
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>
                    <Image
                      source={require("../../../assets/man.png")}
                      style={styles.man}
                    />
                  </View>
                </ImageBackground>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    `${route ? "SendNotification" : "SelectRoute"}`
                  )
                }
              >
                <View style={styles.container2}>
                  <Text style={styles.notificationtext}>
                    Send Notifications
                  </Text>
                  <Text style={styles.startext}>
                    Start your route and inform residents
                  </Text>
                  <Image
                    source={require("../../../assets/notification.png")}
                    style={{
                      flex: 1,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Incident")}>
                <View style={styles.container3}>
                  <Text style={styles.incidenttext}>
                    Create Incident Report
                  </Text>
                  <Text style={styles.startext}>
                    Incident report for property manager
                  </Text>
                  <Image
                    source={require("../../../assets/Incident.png")}
                    style={{ flex: 1, resizeMode: "contain" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Getting Data..."} />}
      {updatingToken && <Loader title={"Getting Data..."} />}
    </>
  );
}

export default LandingPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  logotext: {
    marginTop: 10,
  },
  bannertext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  container1: {
    width: "90%",
    height: 120,
    backgroundColor: "#2C2C40",
    borderRadius: 16,
    marginTop: 15,
    display: "flex",
    alignSelf: "center",
  },
  container2: {
    width: "90%",
    height: 200,
    backgroundColor: "#F8D8F5",
    borderRadius: 16,
    marginTop: 15,
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container3: {
    width: "90%",
    height: 200,
    backgroundColor: "#D7FEDD",
    borderRadius: 16,
    marginTop: 15,
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "5%",
  },
  dust: {
    width: "100%",
    height: "100%",
  },
  secondtext: {
    display: "flex",
    flexDirection: "row",
  },
  hand: {
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  man: {
    width: 85,
    height: 110,
    marginTop: 10,
    marginLeft: 60,
  },
  hitext: {
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    color: "white",
  },
  notificationtext: {
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    marginTop: 10,
  },
  incidenttext: {
    fontSize: 20,
    fontFamily: "CircularStd-Bold",
    marginTop: 10,
  },
  welcometext: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "white",
  },
  startext: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "black",
  },
});
