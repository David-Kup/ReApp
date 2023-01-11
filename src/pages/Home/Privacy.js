import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import LeftArrow_img from "../../assets/img/left_arrow.svg";
import rightArrow_img from "../../assets/img/arrow_right.svg";

import password_img from "../../assets/img/privacy.svg";
import privacyAndPolicy_img from "../../assets/img/privacyAndPolicy.svg";
import terms_img from "../../assets/img/terms.svg";

import { IMG_URL } from "../../config";
import CustomSearchInput from "../../components/CustomSearchInput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Privacy = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>Privacy</Text>
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
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={password_img} style={styles.item_img} />
                <Text style={styles.itemText}>Change Password</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={privacyAndPolicy_img} style={styles.item_img} />
                <Text style={styles.itemText}>Privacy Policy</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={terms_img} style={styles.item_img} />
                <Text style={styles.itemText}>Terms & Conditions</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
          </View>
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
  Exit_img: {
    width: "1.5vh",
    height: "1.5vh",
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
    padding: "1vh",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f1f1f4",
    borderBottomWidth: "1px",
  },
  item_img: {
    width: "6vh",
    height: "6vh",
  },
  itemText: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.2vh",
    marginLeft: "1vh",
  },
  itemArrow: {
    width: "1.5vh",
    height: "1.5vh",
  },
  userinfoView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Privacy;
