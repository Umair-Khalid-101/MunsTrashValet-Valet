import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStateContext } from "../../context";
import {
  addDoc,
  db,
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  setDoc,
} from "../../services";
import Loader from "../components/Loader";
import Back from "../../Svgs/Back";

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

import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function SendNotification() {
  const {
    count,
    setCount,
    RouteResidents,
    setRouteResidents,
    user,
    storedCredentials,
    route,
    setRoute,
  } = useStateContext();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // console.log("ROUTE RESIDENTS:", RouteResidents);
  // console.log("User:", storedCredentials);
  console.log("Route: ", route);
  console.log("Count: ", count);

  useFocusEffect(
    React.useCallback(() => {
      loadfonts();
      getResidents();
    }, [])
  );

  const loadfonts = async () => {
    await Font.loadAsync({
      CircularStd: require("../../../assets/CircularStd.ttf"),
      "CircularStd-Bold": require("../../../assets/CircularStd-Bold.otf"),
      Montserrat: require("../../../assets/Montserrat.ttf"),
    });
    setloaded(true);
  };

  const handleNotifs = async () => {
    setCount((count) => count + 1);
    console.log("Count: ", count);

    if (count === 0) {
      AsyncStorage.setItem("count", JSON.stringify(1))
        .then(() => {
          setCount(1);
        })
        .catch((error) => {
          console.log(error);
        });
      const notif =
        "Dear resident your valet will be arriving in 1 hour. Please have your trash ready!";
      RouteResidents.forEach(async (doc) => {
        console.log("NOTIF TOKEN 1:", doc.NotifToken);
        await sendPushNotification(doc.NotifToken, notif);
      });
      await saveNotification(notif, count);
      navigation.navigate("NotificationSent");
    }

    if (count === 1) {
      AsyncStorage.setItem("count", JSON.stringify(2))
        .then(() => {
          setCount(2);
        })
        .catch((error) => {
          console.log(error);
        });
      const notif = "Dear resident your valet will arrive in 30 minutes!";
      RouteResidents.forEach(async (doc) => {
        console.log("NOTIF TOKEN 2:", doc.NotifToken);
        sendPushNotification(doc.NotifToken, notif);
      });
      saveNotification(notif, count);
      navigation.navigate("NotificationSent");
    }

    if (count === 2) {
      AsyncStorage.setItem("count", JSON.stringify(3))
        .then(() => {
          setCount(3);
        })
        .catch((error) => {
          console.log(error);
        });
      const notif =
        "Dear Resident we have now arrived at your location for trash pick-up!";
      RouteResidents.forEach(async (doc) => {
        console.log("NOTIF TOKEN 3:", doc.NotifToken);
        await sendPushNotification(doc.NotifToken, notif);
      });
      await saveNotification(notif, count);
      navigation.navigate("NotificationSent");
    }

    if (count === 3) {
      AsyncStorage.setItem("count", JSON.stringify(4))
        .then(() => {
          setCount(4);
        })
        .catch((error) => {
          console.log(error);
        });
      const notif =
        "We are leaving in 10 mins. Please Make sure your trash is picked!";
      RouteResidents.forEach(async (doc) => {
        console.log("NOTIF TOKEN 4:", doc.NotifToken);
        await sendPushNotification(doc.NotifToken, notif);
      });
      await saveNotification(notif, count);
      navigation.navigate("NotificationSent");
    }

    if (count === 4) {
      AsyncStorage.setItem("count", JSON.stringify(5))
        .then(() => {
          setCount(5);
        })
        .catch((error) => {
          console.log(error);
        });
      const notif = "Thank you!";
      RouteResidents.forEach(async (doc) => {
        console.log("NOTIF TOKEN 5:", doc.NotifToken);
        await sendPushNotification(doc.NotifToken, notif);
      });
      await saveNotification(notif, count);
      navigation.navigate("NotificationSent");
    }

    if (count === 5) {
      AsyncStorage.setItem("count", JSON.stringify(0))
        .then(() => {
          setCount(0);
        })
        .catch((error) => {
          console.log(error);
        });
      setCount(0);
      AsyncStorage.removeItem("route")
        .then(() => {
          setRoute(null);
        })
        .catch((error) => {
          console.log(error);
        });
      navigation.navigate("TabNavigation");
    }
  };

  const sendPushNotification = async (token, body) => {
    // if (Platform.OS === "ios") {
    //   const message = {
    //     to: token,
    //     priority: "high",
    //     sound: "default",
    //     title: "Muns TrashValet",
    //     body: body,
    //     data: { valet: body },
    //   };

    //   // SEND NOTIFICATION
    //   await fetch("https://exp.host/--/api/v2/push/send", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Accept-encoding": "gzip, deflate",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(message),
    //   });
    // }
    const message = {
      to: token,
      priority: "normal",
      data: {
        experienceId: "@muns/resident",
        scopeKey: "@muns/resident",
        title: "Muns TrashValet",
        message: body,
      },
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=AAAACyWutn4:APA91bH9RnpKrHCJhKTu4SD7GtCUgyqzfHyNj2hhDOfzrzWXZdSiO7anw2zO51l0kI_8j2smtuNPHwNWOzJ9wtXPd5xRtVD_W_DUdwbtVtKlBIKU2_s-3Jsn7pE024iQd0KOqUPx1RIe`,
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const saveNotification = async (body, count) => {
    // let Index;
    // let IndexId = "";
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const dateString =
      currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    // console.log("Date:", dateString);
    const timestamp = currentDate.getTime();
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12
    let time = `${hours}:${minutes} ${ampm}`;
    // console.log(`Time is: `, time);

    // GET NOTIF INDEX
    // const q = query(collection(db, "general"), orderBy("notifIndex", "asc"));
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot?.empty) {
    //   Alert.alert("Index Not Found!");
    // }
    // querySnapshot?.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc?.id, " => ", doc?.data()?.notifIndex);
    //   Index = doc?.data()?.notifIndex;
    //   IndexId = doc?.id;
    // });

    // SAVE NOTIFICATION DATA
    const docRef = {
      title: "Muns TrashValet",
      body: body,
      sentBy: storedCredentials?.email,
      sendingTime: time,
      sendingDate: dateString,
      NotifCount: count + 1,
      sentTo: route,
      timestamp,
    };
    await setDoc(doc(db, "notifications", timestamp.toString()), docRef);

    // UPDATE NOTIF INDEX
    // const washingtonRef = doc(db, "general", IndexId);

    // // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   notifIndex: Index + 1,
    // });
  };

  // GET ROUTE RESIDENTS
  const getResidents = async () => {
    setIsLoading(true);
    setRouteResidents([]);
    const myData = [];
    try {
      const q = query(
        collection(db, "users"),
        where("propertyname", "==", route)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot?.empty) {
        setIsLoading(false);
        return Alert.alert("No Properties to send Notifications to");
      }

      querySnapshot?.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        myData.push({
          id: doc?.id,
          NotifToken: doc.data()?.NotifToken,
          email: doc.data()?.email,
          apartment: doc.data()?.apartment,
          role: doc.data()?.role,
          cityname: doc.data()?.cityname,
          propertyname: doc.data()?.propertyname,
          statename: doc.data()?.statename,
        });
        console.log("MY DATA:", myData);
        setRouteResidents(myData);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Alert.alert(error);
    }
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TabNavigation")}
          >
            <Back
              style={styles.back}
              onPress={() => navigation.navigate("TabNavigation")}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Send Notifications</Text>
          <ScrollView>
            <View style={styles.redbutton}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  height: "100%",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    ...styles.circle2,
                    backgroundColor: count > 0 ? TrueColor : defaultColor,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={count > 0 ? "#FFFFFF" : darkDefaultColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: count > 0 ? Icon1BG : defaultColor,
                  }}
                >
                  <AntDesign
                    name="clockcircleo"
                    size={24}
                    color={count > 0 ? Icon1C : darkDefaultColor}
                  />
                </View>
                {loaded ? (
                  <Text
                    style={{
                      ...styles.text3,
                      color: count > 0 ? "#000000" : darkDefaultColor,
                    }}
                    numberOfLines={5}
                  >
                    Dear resident your valet will be arriving in 1 hour. Please
                    have your trash ready
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
            <View style={styles.verticalline}></View>
            <View style={styles.redbutton}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  height: "100%",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    ...styles.circle2,
                    backgroundColor: count > 1 ? TrueColor : defaultColor,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={count > 1 ? "#FFFFFF" : darkDefaultColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: count > 1 ? Icon2BG : defaultColor,
                  }}
                >
                  <MaterialCommunityIcons
                    name="timer-sand-empty"
                    size={24}
                    color={count > 1 ? Icon2C : darkDefaultColor}
                  />
                </View>
                {loaded ? (
                  <Text
                    style={{
                      ...styles.text3,
                      color: count > 1 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    Dear resident your valet will arrive in 30 minutes
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
            <View style={styles.verticalline}></View>
            <View style={styles.redbutton}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  height: "100%",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    ...styles.circle2,
                    backgroundColor: count > 2 ? TrueColor : defaultColor,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={count > 2 ? "#FFFFFF" : darkDefaultColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: count > 2 ? Icon3BG : defaultColor,
                  }}
                >
                  <Feather
                    name="trash-2"
                    size={24}
                    color={count > 2 ? Icon3C : darkDefaultColor}
                  />
                </View>
                {loaded ? (
                  <Text
                    style={{
                      ...styles.text3,
                      color: count > 2 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    Dear Resident we have now arrived at your location for trash
                    pick-up
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
            <View style={styles.verticalline}></View>
            <View style={styles.redbutton}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  height: "100%",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    ...styles.circle2,
                    backgroundColor: count > 3 ? TrueColor : defaultColor,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={count > 3 ? "#FFFFFF" : darkDefaultColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: count > 3 ? Icon4BG : defaultColor,
                  }}
                >
                  <MaterialCommunityIcons
                    name="bus-school"
                    size={24}
                    color={count > 3 ? Icon4C : darkDefaultColor}
                  />
                </View>
                {loaded ? (
                  <Text
                    style={{
                      ...styles.text3,
                      color: count > 3 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    We are leaving in 10 mins. Please Make sure your trash is
                    picked
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
            <View style={styles.verticalline}></View>
            <View style={styles.redbutton}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  height: "100%",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    ...styles.circle2,
                    backgroundColor: count > 4 ? TrueColor : defaultColor,
                  }}
                >
                  <MaterialIcons
                    name="done"
                    size={18}
                    color={count > 4 ? "#FFFFFF" : darkDefaultColor}
                  />
                </View>
                <View
                  style={{
                    ...styles.circle,
                    backgroundColor: count > 4 ? Icon5BG : defaultColor,
                  }}
                >
                  <MaterialCommunityIcons
                    name="check-all"
                    size={20}
                    color={count > 4 ? Icon5C : darkDefaultColor}
                  />
                </View>
                {loaded ? (
                  <Text
                    style={{
                      ...styles.text3,
                      color: count > 4 ? "#000000" : darkDefaultColor,
                    }}
                  >
                    Thank you
                  </Text>
                ) : (
                  ""
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.back3}
              onPress={async () => {
                await AsyncStorage.removeItem("route")
                  .then(() => {
                    setRoute(null);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                await AsyncStorage.removeItem("count")
                  .then(() => {
                    setCount(0);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                navigation.navigate("TabNavigation");
              }}
            >
              {loaded ? <Text style={styles.text6}>Clear Route</Text> : ""}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.back2}
              onPress={() => handleNotifs()}
            >
              {loaded ? (
                <Text style={styles.text6}>Send Notification</Text>
              ) : (
                ""
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Getting Data..."} />}
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: "5%",
    marginTop: "5%",
  },
  container: {
    flex: 1,
  },
  redbutton: {
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "white",
    borderColor: "black",
  },
  circle: {
    display: "flex",
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: defaultColor,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "2%",
  },
  back2: {
    display: "flex",
    backgroundColor: "#246BFD",
    width: "90%",
    height: 50,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  back3: {
    display: "flex",
    backgroundColor: "#246BFD",
    width: "90%",
    height: 50,
    borderRadius: 16,
    alignSelf: "center",
    marginVertical: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  circle2: {
    display: "flex",
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  text3: {
    fontFamily: "CircularStd",
    fontSize: 12,
    width: "65%",
    // backgroundColor: "yellow",
  },
  verticalline: {
    width: "0.5%",
    height: 30,
    backgroundColor: "#D6D6D6",
    position: "relative",
    left: 100,
    borderRadius: 20,
    marginVertical: "2%",
  },
  text6: {
    fontFamily: "CircularStd",
    fontSize: 14,
    color: "white",
  },
  heading: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: "2%",
    // backgroundColor: "blue",
  },
});
