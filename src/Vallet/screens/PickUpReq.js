import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { collection, query, where, getDocs, db } from "../../services/index";
import { useStateContext } from "../../context";
import Loader from "../components/Loader";

export default function PickUpReq() {
  const navigation = useNavigation();
  const { storedCredentials } = useStateContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  // REVERSE NOTIF ARRAY
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

  const getNotifications = async () => {
    // GET DETAILS OF NOTIFICATIONS
    setIsLoading(true);
    setData([]);
    const myData = [];
    const q = query(
      collection(db, "request"),
      where("sentTo", "==", storedCredentials?.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      // Alert.alert("No Notifications sent yet!");
      setData([]);
      setIsLoading(false);
    }

    try {
      querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc?.id, " => ", doc?.data());
        myData.push({
          id: doc?.id,
          sendingDate: doc?.data()?.sendingDate,
          sendingTime: doc?.data()?.sendingTime,
          title: doc?.data()?.title,
          apartment: doc?.data()?.apartment,
        });
      });
      let notif = reverseArray(myData);
      setData(notif);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error);
      setIsLoading(false);
    }
  };

  const Item = ({ title, sendingTime, sendingDate, apartment }) => (
    <TouchableOpacity style={styles.buttoncontainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={styles.box}>
          <AntDesign name="delete" size={24} color="#FFB317" />
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
          <Text style={styles.text2} numberOfLines={5}>
            {title}
          </Text>
          <Text style={styles.text2} numberOfLines={5}>
            Apartment No: {apartment}
          </Text>
          <View>
            <Text style={styles.text3}>{sendingTime}</Text>
            <Text style={styles.text3}>{sendingDate}</Text>
          </View>
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
          <Text style={{ marginVertical: "5%", marginLeft: "5%" }}>
            PickUp Requests
          </Text>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item
                title={item?.title}
                sendingTime={item?.sendingTime}
                sendingDate={item?.sendingDate}
                apartment={item?.apartment}
              />
            )}
            keyExtractor={() => Math.random()}
            style={{
              width: "100%",
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getNotifications}
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
            No PickUp Requests
          </Text>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Getting Notification Details..."} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
  buttoncontainer: {
    width: "90%",
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  iconbox: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(36, 162, 253,0.1)",
    borderRadius: 12,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconbox2: {
    width: 50,
    height: 50,
    backgroundColor: "'rgba(253, 36, 127,0.1)'",
    borderRadius: 12,
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 14,
    fontFamily: "CircularStd",
    marginTop: 20,
    marginLeft: 10,
    color: "#94A1B2",
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: "5%",
    width: "95%",
    // backgroundColor: "blue",
  },
  text3: {
    fontFamily: "CircularStd",
    fontSize: 12,
    marginLeft: "5%",
    marginTop: "2%",
    width: "95%",
    color: "#94A1B2",
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
});
