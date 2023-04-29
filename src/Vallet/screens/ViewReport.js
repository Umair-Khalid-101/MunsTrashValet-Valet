import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import * as Font from "expo-font";
import Back from "../../Svgs/Back";
import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
export default function ViewReport({ route }) {
  const { item } = route.params;
  console.log("ITEM:", item);
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
      <ScrollView>
        <View style={styles.nav}>
          <TouchableOpacity>
            <View>
              <Back
                style={styles.back}
                onPress={() => navigation.navigate("TabNavigation")}
              />
            </View>
          </TouchableOpacity>
          {loaded ? <Text style={styles.text1}>View Report</Text> : ""}
        </View>
        <View style={styles.greyline}></View>
        {item?.incidentImage && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item?.incidentImage }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginTop: "2%",
              }}
            />
          </View>
        )}
        <Text style={styles.title}>State </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.statename} </Text>
        </View>
        <Text style={styles.title}>City </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.cityname}</Text>
        </View>
        <Text style={styles.title}>Property </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.propertyname}</Text>
        </View>
        <Text style={styles.title}>Apartment # (optional)</Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.apartment}</Text>
        </View>
        <Text style={styles.title}>Other</Text>
        <View style={styles.inputbox2}>
          <Text style={styles.title2}>{item?.other}</Text>
        </View>
        <Text style={styles.title}>Issue</Text>
        <View style={styles.inputbox2}>
          <Text style={styles.title2}>{item?.issue}</Text>
        </View>
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    display: "flex",
    marginTop: 60,
  },
  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,
    position: "absolute",
  },
  back: {
    alignSelf: "flex-start",

    position: "absolute",

    left: 16,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 50,
  },
  title: {
    fontFamily: "CircularStd",
    fontSize: 12,
    color: "#94A1B2",
    marginLeft: 10,
    marginTop: 10,
  },
  title2: {
    fontFamily: "CircularStd",
    fontSize: 12,
    color: "#94A1B2",
    marginLeft: 10,
  },
  inputbox: {
    width: "90%",
    borderRadius: 12,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    height: 50,
    alignSelf: "center",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  inputbox2: {
    width: "90%",
    borderRadius: 12,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    height: 120,
    alignSelf: "center",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  imagebutton: {
    width: "90%",
    backgroundColor: "#ECECEC",
    height: 70,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconbox: {
    display: "flex",
    width: 50,
    height: 50,

    borderRadius: 12,
    marginLeft: 10,
    borderColor: "",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textitem: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 10,
  },
  editicon: {
    backgroundColor: "rgba(36, 162, 253,0.1)",
    width: 60,
    height: 40,
    borderRadius: 12,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bluetext: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: "CircularStd",
  },
});
