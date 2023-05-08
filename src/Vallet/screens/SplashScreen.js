import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../../constants/colors";
import Logo from "../../Svgs/Logo";
import { useStateContext } from "../../context";

const SplashScreen = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } = useStateContext();
  const [loaded, setLoaded] = useState(false);
  const animation = useRef(null);
  const loadfonts = async () => {
    await Font.loadAsync({
      Montserrat: require("../../../assets/Montserrat.ttf"),
      CircularStd: require("../../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../../assets/CircularStd-Bold.otf"),
    });
    setLoaded(true);
  };
  useEffect(() => {
    loadfonts();
    AsyncStorage.getItem("userCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
          navigation.replace("TabNavigation");
        } else {
          setStoredCredentials(null);
          navigation.replace("MainScreen");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.parent}>
          <Logo />
          {loaded ? <Text style={styles.text1}>MUNS TRASHVALET</Text> : null}
        </View>

        <LottieView
          style={styles.lottie}
          autoPlay
          ref={animation}
          source={require("../../../assets/Loader.json")}
        />
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  parent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: "Montserrat",
    color: "white",
  },
  lottie: {
    width: 100,
    height: 100,

    alignSelf: "center",
  },
});
