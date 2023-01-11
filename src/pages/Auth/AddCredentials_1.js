import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import CustomBtn from "../../components/CustomBtn";
import Credentials_img from "../../assets/img/credentials.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddCredentials_1 = (props) => {
  const nextcredential = () => () => {
    props.navigation.navigate("addCredentials_2");
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Credentials</Text>
            <Text style={styles.skiplink}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("splash")}
              >
                Skip
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputview}>
              <View style={styles.credentialView}>
                <Image source={Credentials_img} style={styles.credential_img} />
                <Text style={styles.credential_title}>
                  Add Credentials to Recite
                </Text>
                <Text style={styles.credential_desc}>
                  You can add your debit or credit card to Recite for Easier
                  payment
                </Text>
              </View>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Add Credentials"}
              onPress={nextcredential()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#2D3442",
    alignItems: "center",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8vh",
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
    height: "82.2vh",
    position: "relative",
    marginTop: "2vh",
  },
  inputview: {
    height: "70vh",
    width: "90%",
    marginTop: "1.5vh",
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    opacity: "0.5",
    position: "absolute",
    right: "30px",
  },
  credentialView: {
    alignItems: "center",
  },
  credential_title: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "21px",
  },
  credential_desc: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    opacity: "0.5",
  },
  credential_img: {
    width: "350px",
    height: "238px",
    margin: "0.5vh",
    marginBottom: "5vh",
  },
});

export default AddCredentials_1;
