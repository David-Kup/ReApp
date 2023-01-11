import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";

import recite_img from "../../assets/img/recite.svg";
import msg_img from "../../assets/img/msg.svg";
import qr_img from "../../assets/img/qr.svg";
import folder_img from "../../assets/img/folder.svg";
import phone_img from "../../assets/img/phone.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SplashLoading = (props) => {
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    StartImageRotate();
  }, [props]);

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function StartImageRotate() {
    rotateValue.setValue(0);

    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: props.during,
        easing: Easing.linear,
      })
    ).start();
  }
  return (
    <Animated.View
      style={{
        ...StyleSheet.flatten(props.circleStyle),
        transform: [{ rotate: RotateData }],
        border: 0,
        top: 0,
        left: 0,
      }}
    >
      <Image source={props.img_name} style={props.img_style} />
    </Animated.View>
  );
};

const Splash = (props) => {
  const rotateImg = useRef(new Animated.Value(100)).current; // Initial value for opacity: 0

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("onboarding");
    }, 3000);
  }, []);

  useEffect(() => {
    Animated.timing(rotateImg, {
      toValue: 100,
      duration: 1000,
    }).start();
  }, [rotateImg]);

  return (
    <Animated.View style={styles.homebg}>
      <StatusBar />
      <View style={styles.firstCircle}>
        <SplashLoading
          during={6000}
          circleStyle={styles.firstCircle}
          img_style={styles.phone_img}
          img_name={phone_img}
        />
        <SplashLoading
          during={7000}
          circleStyle={styles.firstCircle}
          img_style={styles.qr_img}
          img_name={qr_img}
        />
        <View style={styles.secondCircle}>
          <SplashLoading
            during={8000}
            circleStyle={styles.secondCircle}
            img_style={styles.folder_img}
            img_name={folder_img}
          />
          <View style={styles.thirdCircle}>
            <View style={styles.fourthCircle}>
              <SplashLoading
                during={10000}
                circleStyle={styles.fourthCircle}
                img_style={styles.msg_img}
                img_name={msg_img}
              />
              <Image source={recite_img} style={styles.logo_img} />
              <View style={styles.sat1} />
              <View style={styles.sat2} />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#2D3442",
    position: "relative",
  },
  firstCircle: {
    border: "1px dashed rgba(255, 255, 255, 0.1)",
    position: "absolute",
    width: "311.53px",
    height: "311.53px",
    borderRadius: "100%",
    top: "calc(50vh - 155px)",
    left: "calc(50vw - 155px)",
    padding: "18.98px",
  },
  secondCircle: {
    border: "1px solid rgba(102, 191, 225, 0.05)",
    position: "absolute",
    width: "273.57px",
    height: "273.57px",
    borderRadius: "100%",
    padding: "18.98px",
  },
  thirdCircle: {
    border: "1px solid rgba(102, 191, 225, 0.05)",
    position: "absolute",
    width: "232.4px",
    height: "232.4px",
    borderRadius: "100%",
    padding: "18.98px",
  },
  fourthCircle: {
    border: "1px solid rgba(102, 191, 225, 0.05)",
    position: "absolute",
    width: "189.99px",
    height: "189.99px",
    borderRadius: "100%",
    padding: "18.98px",
    textAlign: "center",
  },
  logo_img: {
    width: "88.63px",
    height: "116.94px",
    margin: "auto",
  },
  sat1: {
    width: "21px",
    height: "21px",
    backgroundColor:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.072) 100%)",
    borderRadius: "100%",
    position: "absolute",
    top: -50,
    right: 0,
  },
  sat2: {
    width: "21px",
    height: "21px",
    backgroundColor:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.072) 100%)",
    borderRadius: "100%",
    position: "absolute",
    bottom: -50,
    left: 0,
  },
  phone_img: {
    width: "28.6px",
    height: "28.6px",
    position: "absolute",
    top: "5px",
    left: "60px",
  },
  qr_img: {
    width: "46.81px",
    height: "46.81px",
    top: "240px",
    left: "200px",
  },
  folder_img: {
    width: "38px",
    height: "38px",
    top: "115px",
    left: "-35px",
  },
  msg_img: {
    width: "32px",
    height: "32px",
    top: "50px",
    left: "150px",
  },
});

export default Splash;
