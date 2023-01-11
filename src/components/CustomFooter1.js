import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import Google_img from "../assets/img/google.svg";
import Facebook_img from "../assets/img/facebook.svg";
import Apple_img from "../assets/img/apple.svg";
// import { useAuth0, Auth0Provider } from "react-native-auth0";

const CustomFooter = (props) => {
  // const signWithGoogle = () => {
  //   if (props.type === 'signIn') {
  //     props.navigation.navigate('signInWithGoogle');
  //   } else if (props.type === 'signUp') {
  //     props.navigation.navigate('signUpWithGoogle');
  //   }
  // };
  const { authorize, clearSession, user, getCredentials } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  const signWithFacebook = () => {};
  const signWithApple = () => {};

  const signWithGoogle = async () => {
    try {
      await authorize({ scope: "openid profile email" });
      const { accessToken } = await getCredentials();
      Alert.alert("AccessToken: " + accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.socialgroup}>
        <TouchableOpacity onPress={() => signWithGoogle()}>
          <Image source={Google_img} style={styles.social_img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signWithFacebook()}>
          <Image source={Facebook_img} style={styles.social_img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signWithApple()}>
          <Image source={Apple_img} style={styles.social_img} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerlink}>
        <Text style={styles.question}>
          {props.question}
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.linkurl)}
          >
            <Text style={styles.link}>{props.linktext}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "22vh",
    alignItems: "center",
  },
  ortext: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
  },
  ortextView: {
    textAlign: "center",
    width: "100%",
    margin: "3vh",
  },
  social_img: {
    width: "3vh",
    height: "3vh",
    borderRadius: "100%",
  },
  socialgroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    height: "4vh",
    marginBottom: "3vh",
  },
  question: {
    color: "rgba(45, 52, 66, 0.5)",
    fontSize: "16px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
  },
  link: {
    color: "#2D3442",
    fontSize: "16px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 500,
  },
  footerlink: {
    margin: "1vh",
  },
});

export default CustomFooter;
