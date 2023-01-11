import React from "react";

import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

import { Admin_url } from "../../config";

import CustomBtn from "../../components/CustomBtn";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignInAdmin = (props) => {
  const signinUser = () => () => {
    props.navigation.navigate("allSubjects");
  };

  const signinAdmin = () => () => {
    // props.navigation.navigate('adminLoading');
    window.location.href = Admin_url;
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <Text style={styles.title}>
            {"Please choose where are you going to go."}
          </Text>
          <CustomBtn
            type={"bright"}
            text={"User Side"}
            onPress={signinUser()}
            disabled={false}
          />
          <CustomBtn
            type={"dark"}
            text={"Admin Side"}
            onPress={signinAdmin()}
            disabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight-'10vh',
    backgroundColor: "#FBFBFD",
    alignItems: "center",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    padding: "23px",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "10vh",
    height: "90vh",
    justifyContent: "center",
  },
  title: {
    width: "282px",
    height: "54px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    lineHeight: "32px",
    color: "#2D3442",
    marginBottom: "18px",
  },
  description: {
    width: "292px",
    height: "64px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "21px",
    color: "#2D3442",
    opacity: 0.5,
  },
  sign_img: {
    width: "319.76px",
    height: "286px",
    marginTop: "2vh",
    marginBottom: "5vh",
  },
});

export default SignInAdmin;
