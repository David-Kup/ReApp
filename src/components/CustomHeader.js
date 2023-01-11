import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import appLogo_img from "../assets/img/applogo.svg";

const CustomHeader = (props) => {
  return (
    <View
      style={{
        ...StyleSheet.flatten(styles.container),
        ...StyleSheet.flatten(props.style),
      }}
    >
      <Image source={appLogo_img} style={styles.logo_img} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.content}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "375px",
    alignItems: "center",
    height: "25vh",
    padding: "3vh",
  },
  logo_img: {
    width: "57.33px",
    height: "59.9px",
    margin: "2vh",
  },
  title: {
    textAlign: "left",
    marginLeft: "2vh",
    marginBottom: "1vh",
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    lineHeight: "25px",
    width: "100%",
  },
  content: {
    textAlign: "left",
    marginLeft: "2vh",
    marginBottom: "1vh",
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "16px",
    opacity: 0.6,
    width: "100%",
  },
});

export default CustomHeader;
