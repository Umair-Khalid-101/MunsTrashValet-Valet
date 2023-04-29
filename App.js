import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./src/Vallet/screens/SplashScreen";
import MainScreen from "./src/Vallet/screens/MainScreen";
import LandingPage from "./src/Vallet/screens/LandingPage";
import ValetSignIn from "./src/Vallet/screens/ValetSignIn";
import Incident from "./src/Vallet/screens/Incident";
import ReportSuccessfull from "./src/Vallet/screens/ReportSuccessfull";
import TermsConditions from "./src/Vallet/screens/TermsConditions";
import PrivacyPolicy from "./src/Vallet/screens/PrivacyPolicy";
import AboutUs from "./src/Vallet/screens/AboutUs";
import WriteUs from "./src/Vallet/screens/WriteUs";
import NotificationSent from "./src/Vallet/screens/NotificationSent";
import TabNavigation from "./src/constants/TabNavigation";
import Notification from "./src/Vallet/screens/Notification";
import Setting from "./src/Vallet/screens/Setting";
import SendNotification from "./src/Vallet/screens/SendNotification";
import ViewReport from "./src/Vallet/screens/ViewReport";
import SelectRoute from "./src/Vallet/screens/SelectRoute";

// CONTEXT
import { StateContextProvider } from "./src/context";

// APP LOADING
import AppLoading from "expo-app-loading";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState();
  // CHECK CREDENTIALS
  const checkCredentials = async () => {
    AsyncStorage.getItem("userCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      {appReady && (
        <StateContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={`${
                storedCredentials ? "TabNavigation" : "Splash"
              }`}
            >
              {storedCredentials ? (
                <>
                  <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Incident"
                    component={Incident}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ReportSuccessfull"
                    component={ReportSuccessfull}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="NotificationSent"
                    component={NotificationSent}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SendNotification"
                    component={SendNotification}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="WriteUs"
                    component={WriteUs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TermsConditions"
                    component={TermsConditions}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ViewReport"
                    component={ViewReport}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SelectRoute"
                    component={SelectRoute}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ValetSignIn"
                    component={ValetSignIn}
                    options={{ headerShown: false }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ValetSignIn"
                    component={ValetSignIn}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Incident"
                    component={Incident}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ReportSuccessfull"
                    component={ReportSuccessfull}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="NotificationSent"
                    component={NotificationSent}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SendNotification"
                    component={SendNotification}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="WriteUs"
                    component={WriteUs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TermsConditions"
                    component={TermsConditions}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ViewReport"
                    component={ViewReport}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SelectRoute"
                    component={SelectRoute}
                    options={{ headerShown: false }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </StateContextProvider>
      )}
    </>
  );
}

export default App;
