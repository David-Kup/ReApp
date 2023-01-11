import React, { Children, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import passHide_img from "../assets/img/passHide.svg";
import passShow_img from "../assets/img/passShow.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passShowtype, setPassShowtype] = useState(props.type);

  const handleFocus = () => setIsFocused(true);

  const handlePassShow = () => {
    setPassShowtype(!passShowtype);
  };

  return (
    <View style={styles.inputgroup}>
      <View style={styles.titleGroup}>
        <Text style={styles.title}>{props.title}</Text>
        {props.valid === false && (
          <Text style={styles.wrongPass}>{props.wrongmsg}</Text>
        )}
      </View>
      <View style={styles.icongroup}>
        {props.hideIcon !== true && (
          <View style={styles.iconView}>
            <ImageBackground
              source={props.iconimg}
              resizeMode="contain"
              style={styles.Message_img}
            />
          </View>
        )}
        <TextInput
          onFocus={handleFocus}
          style={{
            ...StyleSheet.flatten(styles.content),
            borderColor:
              props.valid === false
                ? "#f22323"
                : isFocused
                ? "#66BFE1"
                : "white",
            borderWidth: props.valid === false ? 1 : isFocused ? 1 : 0,
            paddingLeft: props.hideIcon === true ? "10px" : "7vh",
            width: props.smallsize === true ? "80%" : "100%",
            height:
              props.multiline === true ? windowHeight / 5 : windowHeight / 13.5,
            maxHeight: props.multiline === true ? "100px" : "50px",
          }}
          secureTextEntry={passShowtype}
          textContentType={props.contenttype}
          placeholder={props.content}
          onChangeText={props.onChangeText}
          value={props.value}
          placeholderTextColor="#9699a0"
          multiline={props.multiline}
          disabled={props.disabled}
        />
        {props.type && (
          <TouchableOpacity
            onPress={() => handlePassShow()}
            style={styles.pass_touch}
          >
            <Image
              source={passShowtype ? passShow_img : passHide_img}
              style={styles.pass_img}
            />
          </TouchableOpacity>
        )}
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputgroup: {
    textAlign: "left",
    marginBottom: "2vh",
    width: '100%'
  },
  titleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
  },
  content: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
    maxHeight: "50px",
    height: windowHeight / 13.5,
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  icongroup: {
    position: "relative",
  },
  iconView: {
    width: "5vh",
    height: "5vh",
    margin: "1vh",
    backgroundColor: "rgba(102, 191, 225, 0.1)",
    borderRadius: "10px",
    position: "absolute",
  },
  Message_img: {
    width: "3vh",
    height: "3vh",
    margin: "1vh",
  },
  pass_touch: {
    position: "absolute",
    right: 0,
  },
  pass_img: {
    width: "3vh",
    height: "3vh",
    margin: "2vh",
  },
  wrongPass: {
    color: "#F22323",
    fontSize: "12px",
  },
});

export default CustomInput;
