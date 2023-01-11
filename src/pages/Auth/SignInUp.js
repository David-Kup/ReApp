import React, { useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { IMG_URL } from "../../config";

import CustomBtn from "../../components/CustomBtn";

import { getSignInUpCard } from "../../redux/actions/infocard.action";
import { ImageBackground } from "react-native-web";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignInUp = (props) => {
  const dispatch = useDispatch();
  const signInUpData = useSelector((state) => state.infoState.signInUpData);

  useEffect(() => {
    dispatch(getSignInUpCard(2));
  }, [dispatch]);

  const signin = () => () => {
    if (signInUpData.length > 0) {
      props.navigation.navigate(signInUpData[0].Info_Card_BT_1_Link_to);
    }
  };

  const signup = () => () => {
    if (signInUpData.length > 0) {
      props.navigation.navigate(signInUpData[0].Info_Card_BT_2_Link_to);
    }
  };

  return (
    <View style={styles.homebg}>
        {signInUpData.length > 0 && (
          <View style={styles.contanier}>
            <Text style={styles.title}>{signInUpData[0].Header_Title}</Text>
            <Text style={styles.description}>
              {signInUpData[0].Header_Description}
            </Text>
            <ImageBackground
              resizeMode="contain"
              source={IMG_URL + signInUpData[0].Info_Card_Logo}
              style={styles.sign_img}
            />
            <CustomBtn
              type={"bright"}
              text={signInUpData[0].Info_Card_BT_1_Show}
              onPress={signin()}
              disabled={false}
            />
            <CustomBtn
              type={"dark"}
              text={signInUpData[0].Info_Card_BT_2_Show}
              onPress={signup()}
              disabled={false}
            />
          </View>
        )}
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
    // paddingTop: "5vh",
    height: "90vh",
  },
  title: {
    width: "282px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2.5vh",
    lineHeight: "3vh",
    color: "#2D3442",
    marginBottom: "18px",
  },
  description: {
    width: "292px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    lineHeight: "2.5vh",
    color: "#2D3442",
    opacity: 0.5,
  },
  sign_img: {
    width: "319.76px",
    height: "30vh",
    marginTop: "5vh",
    marginBottom: "5vh",
  },
});

export default SignInUp;
