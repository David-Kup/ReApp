import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import Call_img from "../../assets/img/Call.svg";
import Profile_img from "../../assets/img/Profile.svg";
import LeftArrow_img from "../../assets/img/left_arrow.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddCredentials_2 = (props) => {
  const continueProfile = () => () => {
    props.navigation.navigate("allSubjects");
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Credentials</Text>
            <Text style={styles.skiplink}>
              <Link to="/addCredentials_1" style={{ color: "white" }}>
                <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
              </Link>
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputview}>
              <Text style={styles.personalInfo}>Card Information</Text>
              <CustomInput
                type={false}
                iconimg={Profile_img}
                contenttype={"none"}
                hideIcon={true}
                title={"Card Number"}
                content={"XXXXXXX XXX XXXXXXXX"}
              />
              <CustomInput
                type={false}
                iconimg={Call_img}
                contenttype={"none"}
                hideIcon={true}
                title={"Card Holder Name"}
                content={"Name here..."}
              />
              <View style={styles.cvvExpire}>
                <CustomInput
                  type={false}
                  iconimg={Call_img}
                  contenttype={"none"}
                  hideIcon={true}
                  smallsize={true}
                  title={"CVV"}
                  content={"XXXX"}
                />
                <CustomInput
                  type={false}
                  iconimg={Call_img}
                  contenttype={"none"}
                  hideIcon={true}
                  smallsize={true}
                  title={"Expiry Date"}
                  content={"XX-XX-XXXX"}
                />
              </View>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Add Card"}
              onPress={continueProfile()}
            />
            <View style={styles.ortextView}>
              <Text>Or</Text>
            </View>
            <CustomBtn
              type={"dark"}
              text={"Scan Card"}
              onPress={continueProfile()}
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
  LeftArrow_img: {
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
    height: "82.2vh",
    position: "relative",
    marginTop: "2vh",
  },
  inputview: {
    height: "55vh",
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
    left: "30px",
  },
  personalInfo: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
    textAlign: "left",
    marginTop: "3vh",
    marginBottom: "3vh",
  },
  uploadView: {
    alignItems: "center",
  },
  uploadText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    opacity: "0.5",
  },
  upload_img: {
    width: "14vh",
    height: "14vh",
    margin: "0.5vh",
  },
  cvvExpire: {
    textAlign: "left",
    flexDirection: "row",
  },
  birthtitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "32px",
    marginBottom: "1vh",
  },
  ortextView: {
    textAlign: "center",
    width: "100%",
    margin: "3vh",
  },
});

export default AddCredentials_2;
