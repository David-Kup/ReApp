import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";

import LeftArrow_img from "../../assets/img/left_arrow.svg";

import CustomBtn from "../../components/CustomBtn";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Support = (props) => {
  const dispatch = useDispatch();
  const [support, setSupport] = useState("");

  const sendSupport = () => {};

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>Email Support</Text>
          <TouchableOpacity
            style={styles.skiplink}
            onPress={() => props.navigation.navigate("Contacts")}
          >
            <Text>
              <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <TextInput
              style={styles.support}
              placeholder="Write your issue to us..."
              onChangeText={setSupport}
              value={support}
              placeholderTextColor="#9699a0"
              multiline={true}
            />
          </View>
          <CustomBtn
            type={"bright"}
            text={"Send to us"}
            disabled={support == ""}
            onPress={sendSupport()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#2D3442",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8vh",
    flex: 1,
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    height: "15vh",
    padding: "3vh",
    position: "relative",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    color: "white",
  },
  body: {
    backgroundColor: "#fbfbfd",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    padding: "0.5vw",
    maxWidth: "375px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    position: "relative",
    height: "84.2vh",
  },
  inputview: {
    width: "90%",
    paddingTop: "2vh",
    flex: 1,
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    position: "absolute",
    left: "30px",
  },
  LeftArrow_img: {
    width: "1.5vh",
    height: "1.5vh",
  },
  menuItem: {
    flexDirection: "row",
    padding: "3vh",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f1f1f4",
    borderBottomWidth: "1px",
  },
  itemText: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.2vh",
    marginLeft: "2vh",
  },
  itemArrow: {
    width: "1.5vh",
    height: "1.5vh",
  },
  support: {
    borderRadius: "10px",
    height: "20vh",
    width: "100%",
    backgroundColor: "white",
    padding: "2vh",
  },
});

export default Support;
