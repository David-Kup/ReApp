import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomBtn = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...(props.type === "bright"
          ? StyleSheet.flatten(styles.brightcustombtn)
          : StyleSheet.flatten(styles.darkcustombtn)),
        backgroundColor:
          props.type === "bright"
            ? props.disabled
              ? "#50aed275"
              : "#50AED2"
            : "#2D3442",
      }}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={styles.btn_text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  brightcustombtn: {
    width: "274.49px",
    maxHeight: "40px",
    height: windowHeight / 13.5,
    borderRadius: "2vh",
    paddingTop: "1.7vh",
    paddingBottom: "1.7vh",
    backgroundColor: "#50AED2",
    marginBottom: "1.3vh",
  },
  darkcustombtn: {
    width: "274.49px",
    maxHeight: "40px",
    height: windowHeight / 13.5,
    borderRadius: "2vh",
    paddingTop: "1.7vh",
    paddingBottom: "1.7vh",
    backgroundColor: "#2D3442",
    marginBottom: "1.3vh",
  },
  btn_text: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "18px",
  },
});

export default CustomBtn;
