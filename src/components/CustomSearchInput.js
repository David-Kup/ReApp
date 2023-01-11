import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Mike_img from "../assets/img/mike.svg";
import MikeWhite_img from "../assets/img/mike_white.svg";

const CustomSearchInput = (props) => {
  return (
    <View style={styles.inputgroup}>
      <TextInput
        style={{
          ...styles.content,
          backgroundColor: props.color == "black" ? "#3e4451" : "#F4F4F4",
        }}
        placeholder={props.content}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor="#b2b4b9"
      />
      <TouchableOpacity onPress={() => props.mike()} style={styles.mike_touch}>
        <Image
          source={props.color == "black" ? MikeWhite_img : Mike_img}
          style={styles.mike_img}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputgroup: {
    marginTop: "2vh",
    width: "100%",
  },
  content: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    height: "7vh",
    borderRadius: "10px",
    backgroundColor: "#F4F4F4",
    paddingLeft: "1.5vh",
    color: "#2D3442",
  },
  mike_touch: {
    position: "absolute",
    right: 0,
  },
  mike_img: {
    width: "2vh",
    height: "3vh",
    margin: "2vh",
  },
});

export default CustomSearchInput;
