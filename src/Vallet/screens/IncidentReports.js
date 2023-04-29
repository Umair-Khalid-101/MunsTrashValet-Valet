import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function IncidentReports() {
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
    // <SafeAreaView style={styles.container}>
    // {loaded ? <Text style={styles.text1}>Incident Reports</Text> : ""}
    // <View style={styles.greyline}></View>
    <TouchableOpacity
      style={styles.buttoncontainer}
      onPress={() => navigation.navigate("ViewReport")}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={styles.box}>
          <FontAwesome name="file-text-o" size={22} color="#246BFD" />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loaded ? <Text style={styles.text2}>Incident Report</Text> : ""}
          {loaded ? <Text style={styles.text3}>2 A.M.</Text> : ""}
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
    // {/* </SafeAreaView> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  text1: {
    fontFamily: "CircularStd",
    fontSize: 16,
    marginTop: 60,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 20,
  },
  buttoncontainer: {
    width: "90%",
    height: 80,
    display: "flex",
    justifyContent: "center",

    borderRadius: 12,
    backgroundColor: "white",

    elevation: 1,
    marginTop: 30,
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
  text3: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginLeft: 20,
    marginTop: 5,
    color: "#94A1B2",
  },
  box: {
    display: "flex",
    height: 55,
    width: 50,
    borderRadius: 12,
    backgroundColor: "rgba(36, 107, 253,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
