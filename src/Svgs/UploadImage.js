import { View, Text } from "react-native";
import React from "react";
import Svg, { Path, Polyline, Line } from "react-native-svg";
export default function UploadImage() {
  return (
    <Svg
      className="feather feather-upload"
      fill="none"
      height={24}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Polyline points="17 8 12 3 7 8" />
      <Line x1={12} x2={12} y1={3} y2={15} />
    </Svg>
  );
}
