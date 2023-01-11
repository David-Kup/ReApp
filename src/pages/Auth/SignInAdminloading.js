import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignInAdminloading = (props) => {
  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <ImageBackground
            source={"assets/signLogo.png"}
            resizeMode="contain"
            style={styles.contanier}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
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

export default SignInAdminloading;
