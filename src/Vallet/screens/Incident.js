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
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Back from "../../Svgs/Back";
import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Progress from "react-native-progress";

import {
  addDoc,
  db,
  collection,
  setDoc,
  doc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "../../services";
import Loader from "../components/Loader";
import { useStateContext } from "../../context";
import UploadProgress from "../components/UploadProgress";

// VALIDATION SCHEMA
const incidentValidationSchema = Yup.object().shape({
  issue: Yup.string().required("Issue is a Required Field"),
});

export default function Incident() {
  const { user, storedCredentials } = useStateContext();
  console.log("User:", storedCredentials?.email);
  const navigation = useNavigation();
  const [loaded, setloaded] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [image, setImage] = useState(null);
  const [cityname, setcityname] = useState("");
  const [statename, setstatename] = useState("");
  const [propertyname, setpropertyname] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const placeHolder =
    "http://res.cloudinary.com/dfmhxmauj/image/upload/v1670337910/axqfk5lkxf09qsbhpspr.jpg";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log("image",result);

    if (!result.canceled) {
      setImage(result.assets[0]);
      console.log("image", image);
      handleUpload(result.assets[0].uri);
    }
  };

  let source;
  if (!image) {
    source = { uri: placeHolder };
  } else {
    source = image;
  }

  // UPLOAD IMAGE
  const handleUpload = async (Incidentimage) => {
    setUploading(true);
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network Request Failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", Incidentimage, true);
      xhr.send(null);
    });

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "incident/" + Date.now().toString());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress(snapshot?.bytesTransferred / snapshot?.totalBytes);
        console.log("progressUpload: ", progress);
        const progress =
          (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot?.state) {
          case "paused":
            console.log("Upload is paused");
            // setUploading(false);
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error?.code) {
          case "storage/unauthorized":
            // setUploading(false);
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // setUploading(false);
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // setUploading(false);
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask?.snapshot?.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log("File available at", downloadURL);
          setUploading(false);
        });
      }
    );
    // setUploading(false);
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
  const city = [{ value: "El Paso" }];
  const state = [{ value: "Texas" }];

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

  const saveIncident = async (values) => {
    try {
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
      const docRef = {
        apartment: values?.apartment,
        incidentImage: values?.Incidentimage,
        other: values?.other,
        issue: values?.issue,
        statename: values?.statename,
        cityname: values?.cityname,
        propertyname: values?.propertyname,
        reportedBy: storedCredentials?.email,
        reportedDate: dateString,
        reportedTime: time,
      };

      await setDoc(doc(db, "incident", timestamp.toString()), docRef);

      setIsloading(false);
      navigation.navigate("ReportSuccessfull");
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error adding Incident!");
      setIsloading(false);
    }
  };

  return (
    <>
      {!isloading && !uploading && (
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
              {loaded ? (
                <Text style={styles.text1}>Create Incident Report</Text>
              ) : (
                ""
              )}
            </View>
            <View style={styles.greyline}></View>
            <View>
              <View style={styles.camerabox}>
                <TouchableOpacity style={styles.iconbox} onPress={pickImage}>
                  <View>
                    <AntDesign name="upload" size={24} color="#246BFD" />
                  </View>
                </TouchableOpacity>
                {loaded ? <Text style={styles.text4}>Upload Image</Text> : ""}
                {loaded ? (
                  <Text style={styles.text3}>Choose file to be uploaded</Text>
                ) : (
                  ""
                )}
              </View>
              {image && (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={source}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginTop: "2%",
                    }}
                  />
                </View>
              )}

              <Formik
                initialValues={{
                  apartment: "",
                  other: "",
                  issue: "",
                }}
                validationSchema={incidentValidationSchema}
                onSubmit={(values) => {
                  if (!statename) {
                    return Alert.alert("Please Select a State!");
                  }
                  if (!cityname) {
                    return Alert.alert("Please Select a City Name!");
                  }
                  if (!propertyname) {
                    return Alert.alert("Please Select a Property!");
                  }

                  (values.statename = statename),
                    (values.cityname = cityname),
                    (values.propertyname = propertyname),
                    (values.Incidentimage = `${imageUrl ? imageUrl : ""}`);
                  console.log(values);
                  setIsloading(true);
                  saveIncident(values);
                }}
              >
                {({ handleChange, handleSubmit, errors }) => (
                  <>
                    <View style={styles.inputview}>
                      {loaded ? <Text style={styles.text2}>State</Text> : ""}
                      <SelectList
                        setSelected={(val) => setstatename(val)}
                        data={state}
                        boxStyles={styles.input}
                        placeholder="State"
                        inputStyles={{
                          fontFamily: "CircularStd",
                          width: "80%",
                          alignSelf: "center",
                        }}
                        dropdownTextStyles={{ fontFamily: "CircularStd" }}
                        dropdownStyles={{
                          width: "90%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    <View style={styles.inputview}>
                      {loaded ? <Text style={styles.text2}>City</Text> : ""}
                      <SelectList
                        setSelected={(val) => setcityname(val)}
                        data={city}
                        boxStyles={styles.input}
                        placeholder="City"
                        inputStyles={{
                          fontFamily: "CircularStd",
                          width: "80%",
                          alignSelf: "center",
                        }}
                        dropdownTextStyles={{ fontFamily: "CircularStd" }}
                        dropdownStyles={{
                          width: "90%",
                          alignSelf: "center",
                          borderColor: "grey",
                        }}
                      />
                    </View>
                    <View style={styles.inputview}>
                      {loaded ? <Text style={styles.text2}>Property</Text> : ""}
                      <SelectList
                        setSelected={(val) => setpropertyname(val)}
                        data={data}
                        boxStyles={styles.input}
                        placeholder="Property"
                        inputStyles={{
                          fontFamily: "CircularStd",
                          width: "80%",
                          alignSelf: "center",
                        }}
                        dropdownTextStyles={{ fontFamily: "CircularStd" }}
                        dropdownStyles={{
                          width: "90%",
                          alignSelf: "center",
                        }}
                      />
                    </View>
                    {loaded ? (
                      <Text style={styles.text2}>Apartment # (Optional)</Text>
                    ) : (
                      ""
                    )}
                    <TextInput
                      placeholder="Enter Apartment Number"
                      style={styles.input}
                      onChangeText={handleChange("apartment")}
                    />

                    {loaded ? <Text style={styles.text2}>Other</Text> : ""}
                    <TextInput
                      placeholder="Type Here..."
                      onChangeText={handleChange("other")}
                      style={styles.input2}
                      multiline={true}
                    />
                    {loaded ? <Text style={styles.text2}>Issue</Text> : ""}
                    <TextInput
                      placeholder="Type Here..."
                      style={styles.input2}
                      multiline={true}
                      onChangeText={handleChange("issue")}
                    />
                    {errors.issue && (
                      <Text style={styles.error}>{errors.issue}</Text>
                    )}

                    <View style={styles.button}>
                      <TouchableOpacity
                        style={styles.getstarted}
                        onPress={handleSubmit}
                      >
                        {loaded ? (
                          <Text style={styles.getstartedtext}>
                            Create Incident Report
                          </Text>
                        ) : (
                          ""
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
          <View style={{ height: 30 }}></View>
        </SafeAreaView>
      )}
      {isloading && !uploading && (
        <Loader title={"Generating Incident Report!"} />
      )}
      {uploading && (
        <UploadProgress title={"Uploading Image..."} progress={progress} />
      )}
    </>
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
    display: "flex",
  },
  input2: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 140,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    display: "flex",
  },
  text2: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 20,
    left: 16,
    textAlignVertical: "top",
  },
  pickeritem: {
    fontSize: 14,
    fontFamily: "CircularStd",
  },
  picker: {
    fontFamily: "CircularStd",
  },
  inputview: {
    display: "flex",
    justifyContent: "flex-start",
  },
  camerabox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 150,
    borderStyle: "dashed",
    backgroundColor: "rgba(36, 107, 253, 0.1)",
    alignSelf: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#246BFD",
    marginTop: 12,
  },
  text3: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: "#94A1B2",
    marginTop: 5,
  },
  text4: {
    fontSize: 16,
    fontFamily: "CircularStd",
    color: "#246BFD",
    marginTop: 5,
  },
  iconbox: {
    width: "20%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "rgba(36, 107, 253, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
  error: {
    color: "red",
    fontSize: 14,
    marginLeft: "7%",
  },
});
