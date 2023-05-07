import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Vector from "../../Svgs/Vector";
import MunsTrashValet from "../../Svgs/MunsTrashValet";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  signInWithEmailAndPassword,
  getAuth,
  getDocs,
  db,
  collection,
  getDoc,
  doc,
  where,
  query,
} from "../../services";
import Loader from "../components/Loader";
import { useStateContext } from "../../context";

function ValetSignIn(props) {
  const { setUser, setCount, setStoredCredentials } = useStateContext();
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // PERSIST USER
  const persistUser = async (credentials) => {
    AsyncStorage.setItem("userCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup.string().required("Password cannot be empty!"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const auth = getAuth();
    const email = data?.email;
    const password = data?.password;
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential?.user;
        // setUser(user);
        console.log(`Signed In as ${user?.uid}`);
        setCount(0);
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", user?.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot?.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const User = doc?.data();
            console.log("USER:", User);
            setUser(User);
            setStoredCredentials(User);
            persistUser(User);
            setIsLoading(false);
            if (User?.role === "valet" && User?.status === "Active") {
              // Alert.alert("Success!", "Signed In as Valet!");
              navigation.navigate("TabNavigation");
            } else {
              Alert.alert("Error!", "Make sure You're a Valet to Sign IN");
            }
          });
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode);
        const errorMessage = error.message;
        // console.log(errorMessage);
        Alert.alert("Error!", "Wrong Email or Password!");
        setIsLoading(false);
      });
  };

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
    <>
      {!isLoading && (
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
          <View style={styles.greyline}></View>
          <View style={styles.inputview}>
            {loaded ? <Text style={styles.SignIntext}>Sign In</Text> : ""}
            {loaded ? (
              <Text style={styles.text2}>Please sign-in to your account</Text>
            ) : (
              ""
            )}
            {loaded ? <Text style={styles.text3}>Email</Text> : ""}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChange(value.trim())}
                  value={value}
                  placeholder="Enter your Email"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errors}>{errors.email.message}</Text>
            )}
            {loaded ? <Text style={styles.text4}>Password</Text> : ""}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.iconTextInput}>
                  <TextInput
                    value={value}
                    onChangeText={(value) => onChange(value.trim())}
                    secureTextEntry={hidePassword}
                    placeholder="Enter your password"
                    style={styles.passwordinput}
                  />
                  <TouchableOpacity onPress={toggleHidePassword}>
                    <MaterialIcons
                      name={hidePassword ? "visibility-off" : "visibility"}
                      size={24}
                      color="black"
                      style={styles.toggleButton}
                    />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errors}>{errors.password.message}</Text>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.getstarted}
                onPress={handleSubmit(onSubmit)}
              >
                {loaded ? (
                  <Text style={styles.getstartedtext}>Sign In</Text>
                ) : (
                  ""
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Logging IN!"} />}
    </>
  );
}

export default ValetSignIn;
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
  logotext: {
    marginTop: 10,
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: 30,
  },
  SignIntext: {
    fontSize: 28,
    fontFamily: "CircularStd",
    marginTop: 30,
    left: 16,
    letterSpacing: -1,
  },
  text2: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 10,
    left: 16,
  },
  text3: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: "5%",
    left: 16,
  },
  text4: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: "5%",
    left: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
  },

  getstarted: {
    width: "90%",
    backgroundColor: "#246BFD",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,

    alignSelf: "center",
  },
  getstartedtext: {
    color: "white",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
  errors: {
    fontSize: 10,
    color: "red",
    marginLeft: 45,
    marginTop: 5,
  },
  passwordinput: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
  iconTextInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: -8,
  },
});
