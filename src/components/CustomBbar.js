import React from "react";
import { StyleSheet, View } from "react-native";

const CustomBbar = (props) => {
  return (
    <View
      style={{
        ...StyleSheet.flatten(styles.bottombar),
        backgroundColor: props.color,
      }}
    />
  );
};

const styles = StyleSheet.create({
  bottombar: {
    width: "134px",
    height: "5px",
    borderRadius: "100px",
    position: "absolute",
    bottom: "10px",
    left: "calc(50% - 67px)",
  },
});

export default CustomBbar;
