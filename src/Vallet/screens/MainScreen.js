import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

import Vector from "../../Svgs/Vector";

const MainScreen = () => {
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
      <View style={styles.image}>
        <Image
          source={require("../../../assets/Frame.png")}
          style={styles.frame}
        />
      </View>
      <View style={styles.title}>
        {loaded ? <Text style={styles.welcometext}>Welcome to</Text> : ""}
        <View style={styles.secondtext}>
          {loaded ? <Text style={styles.welcometext}>Munsapp!</Text> : ""}
        </View>
        {loaded ? (
          <Text style={styles.description1}>
            Muns provides door pickup trash valet
          </Text>
        ) : (
          ""
        )}
        {loaded ? (
          <Text style={styles.description2}>
            services to apartment complexes
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.getstarted}
          onPress={() => navigation.replace("ValetSignIn")}
        >
          {loaded ? <Text style={styles.getstartedtext}>Get Started</Text> : ""}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default MainScreen;

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
  frame: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "40%",
    marginTop: "3%",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  welcometext: {
    fontSize: 32,
    fontFamily: "CircularStd-Bold",
  },
  secondtext: {
    display: "flex",
    flexDirection: "row",
  },
  hand: {
    marginLeft: 10,
  },
  description1: {
    fontSize: 16,
    color: "#94A1B2",
    marginTop: 20,
    fontFamily: "CircularStd",
  },
  description2: {
    fontSize: 16,
    color: "#94A1B2",
    fontFamily: "CircularStd",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  getstarted: {
    width: "90%",
    backgroundColor: "#246BFD",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  getstartedtext: {
    color: "white",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
});
