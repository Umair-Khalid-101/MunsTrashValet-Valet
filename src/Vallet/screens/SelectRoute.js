import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStateContext } from "../../context";

export default function SelectRoute() {
  const navigation = useNavigation();
  const { route, setRoute } = useStateContext();

  const handlePress = async () => {
    await AsyncStorage.setItem("route", JSON.stringify(route))
      .then(() => {
        setRoute(route);
        navigation.navigate("SendNotification");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = [
    { value: "Independance Place" },
    { value: "Lake Fairway" },
    { value: "Sun Hollow" },
    { value: "Ridgemar" },
    { value: "Spring Park" },
    { value: "Cliffside at Mountain Park" },
    { value: "Desert Commons" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>SelectRoute</Text>
      <SelectList
        setSelected={(val) => setRoute(val)}
        data={data}
        boxStyles={styles.input}
        placeholder="Route"
        inputStyles={{
          width: "80%",
          alignSelf: "center",
        }}
        dropdownStyles={{
          width: "90%",
          alignSelf: "center",
        }}
      />
      {route && (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Start Route</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.Homebutton}
        onPress={() => navigation.navigate("TabNavigation")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 45,
    borderRadius: 12,
    backgroundColor: "#246BFD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: "5%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Homebutton: {
    width: "90%",
    height: 45,
    borderRadius: 12,
    backgroundColor: "#246BFD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "80%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontSize: 14,
    display: "flex",
  },
  text: {
    fontSize: 20,
    marginBottom: "5%",
  },
});
