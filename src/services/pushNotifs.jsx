import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { useStateContext } from "../context";

import {
  db,
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
} from "../services/index";

export const useNotifications = () => {
  const { token, setToken, user, storedCredentials, setUpdatingToken } =
    useStateContext();
  console.log("storedCredentials:", storedCredentials);

  const registerForPushNotificationsAsync = async () => {
    setUpdatingToken(true);
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        setUpdatingToken(false);
        return;
      }
      try {
        if (Platform.OS === "ios") {
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log("Token: ", token);
          setToken(token);

          const q = query(
            collection(db, "users"),
            where("email", "==", storedCredentials?.email)
          );
          let docid = "";
          const querySnapshot = await getDocs(q);

          if (querySnapshot?.empty) {
            Alert.alert("Unable to Update Notification Token!");
            setUpdatingToken(false);
            return;
          }

          querySnapshot?.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            docid = doc?.id;
          });

          console.log("Email: ", storedCredentials?.email);
          const washingtonRef = doc(db, "users", docid);
          await updateDoc(washingtonRef, {
            expoToken: token,
          });
          setUpdatingToken(false);
        } else {
          token = (await Notifications.getDevicePushTokenAsync()).data;
          console.log("Token: ", token);
          setToken(token);

          const q = query(
            collection(db, "users"),
            where("email", "==", storedCredentials?.email)
          );
          let docid = "";
          const querySnapshot = await getDocs(q);

          if (querySnapshot?.empty) {
            Alert.alert("Unable to Update Notification Token!");
            setUpdatingToken(false);
            return;
          }

          querySnapshot?.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            docid = doc?.id;
          });

          console.log("Email: ", storedCredentials?.email);
          const washingtonRef = doc(db, "users", docid);
          await updateDoc(washingtonRef, {
            NotifToken: token,
          });
          setUpdatingToken(false);
        }
      } catch (error) {
        console.error(error);
        setUpdatingToken(false);
      }
    } else {
      alert("Must use physical device for Push Notifications");
      setUpdatingToken(false);
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  // This listener is fired whenever a notification is received while the app is foregrounded
  const handleNotification = (notification) => {
    // could be useful if you want to display your own toast message
    // could also make a server call to refresh data in other part of the app
  };

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  const handleNotificationResponse = (response) => {
    const data = response.notification.request.content.data;

    if (data?.url) Linking.openURL(data.url);
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};
