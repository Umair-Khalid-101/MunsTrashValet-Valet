import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { collection, query, where, getDocs, db } from "../../services";
import { useStateContext } from "../../context";
import Loader from "../components/Loader";

export default function AllIncidents() {
  const { user, storedCredentials } = useStateContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  // useEffect(() => {
  //   getIncidents();
  //   loadfonts();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getIncidents();
      loadfonts();
    }, [])
  );

  // REVERSE INCIDENT ARRAY
  function reverseArray(arr) {
    // Make a copy of the original array
    const copyArr = [...arr];
    // Loop through half of the array and swap elements
    for (let i = 0; i < Math.floor(copyArr.length / 2); i++) {
      const temp = copyArr[i];
      copyArr[i] = copyArr[copyArr.length - 1 - i];
      copyArr[copyArr.length - 1 - i] = temp;
    }
    // Return the reversed array
    return copyArr;
  }

  const getIncidents = async () => {
    setIsLoading(true);
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "incident"),
      where("reportedBy", "==", storedCredentials?.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      setIsLoading(false);
      setData([]);
      return;
    }

    querySnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc?.id, " => ", doc?.data());
      myData.push({
        id: doc?.id,
        apartment: doc?.data()?.apartment,
        incidentImage: doc?.data()?.incidentImage,
        other: doc?.data()?.other,
        issue: doc?.data()?.issue,
        statename: doc?.data()?.statename,
        cityname: doc?.data()?.cityname,
        propertyname: doc?.data()?.propertyname,
        reportedDate: doc?.data()?.reportedDate,
        reportedTime: doc?.data()?.reportedTime,
      });
      let incidents = reverseArray(myData);
      setData(incidents);
      setIsLoading(false);
    });
  };

  const Item = ({ issue, item, reportedDate, reportedTime }) => (
    <TouchableOpacity
      style={styles.buttoncontainer}
      onPress={() => {
        navigation.navigate("ViewReport", {
          item,
        });
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          // backgroundColor: "blue",
        }}
      >
        <View style={styles.box}>
          <FontAwesome name="file-text-o" size={22} color="#246BFD" />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "pink",
            height: "100%",
            width: "65%",
          }}
        >
          {loaded ? (
            <Text style={styles.text2} numberOfLines={5}>
              {issue}
            </Text>
          ) : (
            ""
          )}
          {loaded ? <Text style={styles.text3}>{reportedTime}</Text> : ""}
          {loaded ? <Text style={styles.text3}>{reportedDate}</Text> : ""}
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
  );

  return (
    <>
      {!isLoading && data.length > 0 && (
        <SafeAreaView style={styles.container}>
          <Text style={{ marginTop: "5%", marginLeft: "5%" }}>
            All Incidents
          </Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item
                issue={item?.issue}
                item={item}
                reportedTime={item?.reportedTime}
                reportedDate={item?.reportedDate}
              />
            )}
            keyExtractor={() => Math.random()}
            style={{
              width: "100%",
              marginLeft: "5%",
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getIncidents}
              />
            }
          />
        </SafeAreaView>
      )}
      {!isLoading && data.length === 0 && (
        <SafeAreaView
          style={{
            ...styles.container,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              width: "80%",
              textAlign: "center",
            }}
          >
            No Incidents Reported Yet!
          </Text>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Getting Incident Reports!"} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttoncontainer: {
    width: "90%",
    height: 120,
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: "5%",
    marginTop: "2%",
    width: "95%",
    // backgroundColor: "red",
  },
  text3: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginLeft: "5%",
    marginTop: "2%",
    color: "#94A1B2",
    width: "95%",
    // backgroundColor: "yellow",
  },
  box: {
    display: "flex",
    height: 55,
    width: 50,
    borderRadius: 12,
    backgroundColor: "rgba(36, 107, 253,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
  },
  dateAndTime: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
    // left: 60,
    // top: 30,
  },
});
