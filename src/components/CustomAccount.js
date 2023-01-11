import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const CustomAccount = (props) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressInOut = () => setIsPressed(!isPressed);
  const handlePress = () => {
    props.press();
    setIsPressed(true);
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      onPressIn={() => handlePressInOut()}
      onPressOut={() => handlePressInOut()}
      style={styles.accountTouch}
    >
      <View
        style={isPressed ? styles.pressedaccountgroup : styles.accountgroup}
      >
        <Image source={props.avatar_img} style={styles.avatar_img} />
        <View style={styles.infoGroup}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.email}>{props.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accountTouch: {
    width: "100%",
    alignItems: "center",
  },
  accountgroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1vh",
    marginBottom: "1vh",
    backgroundColor: "#fbfbfd",
    borderRadius: "10px",
    width: "90%",
  },
  pressedaccountgroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1vh",
    marginBottom: "1vh",
    borderWidth: "1px",
    borderRadius: "10px",
    borderColor: "#66BFE1",
    backgroundColor: "#fbfbfd",
    width: "90%",
  },
  infoGroup: {
    textAlign: "left",
  },
  name: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2D3442",
  },
  email: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontSize: "12px",
    color: "#2d34427a",
  },
  avatar_img: {
    width: "5vh",
    height: "5vh",
    margin: "2vh",
    marginTop: "1.5vh",
    marginBottom: "1.5vh",
  },
});

export default CustomAccount;
