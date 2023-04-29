import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";

export default function UploadProgress({ title, progress }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Progress.Bar progress={progress} width={200} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: "5%",
  },
});
