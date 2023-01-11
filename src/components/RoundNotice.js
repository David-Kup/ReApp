import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Image,
  Text,
} from "react-native";
import { useSelector } from "react-redux";

import recite_img from "../assets/img/recite.svg";
import msg_img from "../assets/img/msg.svg";
import qr_img from "../assets/img/qr.svg";
import folder_img from "../assets/img/folder.svg";
import phone_img from "../assets/img/phone.svg";

const SplashLoading = (props) => {
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    StartImageRotate();
  }, []);

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
        useNativeDriver: false,
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
      {props.notice != 0 &&
        props.notice != "" &&
        props.notice !== undefined && (
          <Text
            style={{
              ...props.img_style,
              ...props.notice_style
            }}
          >
            {props.notice}
          </Text>
        )}
    </Animated.View>
  );
};

const RoundNotice = (props) => {
  const { unit } = props;
  const contactinfo = useSelector((state) => state.contactState);

  const styles = StyleSheet.create({
    firstCircle: {
      border: "1px dashed rgba(255, 255, 255, 0.1)",
      position: "absolute",
      width: unit * 90,
      height: unit * 90,
      borderRadius: "100%",
      top: "calc(50% - " + unit * 45 + "px)",
      left: "calc(50% - " + unit * 45 + "px)",
      padding: unit * 5,
    },
    secondCircle: {
      border: "1px solid rgba(102, 191, 225, 0.05)",
      position: "absolute",
      width: unit * 79,
      height: unit * 79,
      borderRadius: "100%",
      padding: unit * 5,
    },
    thirdCircle: {
      border: "1px solid rgba(102, 191, 225, 0.05)",
      position: "absolute",
      width: unit * 68,
      height: unit * 68,
      borderRadius: "100%",
      padding: unit * 5,
    },
    fourthCircle: {
      border: "1px solid rgba(102, 191, 225, 0.05)",
      position: "absolute",
      width: unit * 57,
      height: unit * 57,
      borderRadius: "100%",
      padding: unit * 5,
      textAlign: "center",
    },
    logo_img: {
      width: unit * 27,
      height: unit * 35,
      margin: "auto",
    },
    sat1: {
      width: unit * 8,
      height: unit * 8,
      backgroundColor:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.072) 100%)",
      borderRadius: "100%",
      position: "absolute",
      top: -unit * 16,
      right: 0,
    },
    sat2: {
      width: unit * 8,
      height: unit * 8,
      backgroundColor:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.072) 100%)",
      borderRadius: "100%",
      position: "absolute",
      bottom: -unit * 16,
      left: 0,
    },
    qr_img: {
      width: unit * 13,
      height: unit * 13,
      position: "absolute",
      top: unit * 5,
      left: unit * 5,
    },
    phone_img: {
      width: unit * 10,
      height: unit * 10,
      position: "absolute",
      top: unit * 5,
      left: unit * 60,
    },
    folder_img: {
      width: unit * 10,
      height: unit * 10,
      position: "absolute",
      top: unit * 58,
      left: unit * 45,
    },
    msg_img: {
      width: unit * 10,
      height: unit * 10,
      position: "absolute",
      top: unit * 35,
      left: unit * -1,
    },
    noticeStyle1: {
      fontSize: "12px",
      left: "-5px",
      marginBottom: "-20px",
      color: "white",
      backgroundColor: "rgb(255, 143, 119)",
      borderRadius: "100%",
      width: "20px",
      height: "20px",
    },
    noticeStyle2: {
      fontSize: "12px",
      marginBottom: "-20px",
      color: "white",
      backgroundColor: "rgb(255, 143, 119)",
      borderRadius: "100%",
      width: "20px",
      height: "20px",
      top: '0px',
      right: '3px',
      left: '135px'
    },
    noticeStyle3: {
      fontSize: "12px",
      marginBottom: "-20px",
      color: "white",
      backgroundColor: "rgb(255, 143, 119)",
      borderRadius: "100%",
      width: "20px",
      height: "20px",
      top: '130px',
      right: '22px',
    },
    noticeStyle4: {
      fontSize: "12px",
      left: "-12px",
      marginBottom: "-20px",
      color: "white",
      backgroundColor: "rgb(255, 143, 119)",
      borderRadius: "100%",
      width: "20px",
      height: "20px",
      top: '85px'
    }
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if(contactinfo.unreadlist != undefined)
      setCount(
        contactinfo.unreadlist.reduce(
          (partialSum, item) => partialSum + item.content.reduce((sum, subitem) => sum + subitem.count, 0),
          0
        )
      );
    // setCount();
  }, [contactinfo]);

  return (
    <View style={styles.firstCircle}>
      <SplashLoading
        during={10000}
        circleStyle={styles.firstCircle}
        img_style={styles.qr_img}
        notice_style={styles.noticeStyle1}
        img_name={qr_img}
        notice={count}
      />
      <View style={styles.secondCircle}>
        <SplashLoading
          during={10000}
          circleStyle={styles.secondCircle}
          img_style={styles.phone_img}
          img_name={phone_img}
          notice_style={styles.noticeStyle2}
          // notice={1}
        />
        <View style={styles.thirdCircle}>
          <SplashLoading
            during={10000}
            circleStyle={styles.thirdCircle}
            img_style={styles.folder_img}
            img_name={folder_img}
            notice_style={styles.noticeStyle3}
            // notice={1}
          />
          <View style={styles.fourthCircle}>
            <SplashLoading
              during={10000}
              circleStyle={styles.fourthCircle}
              img_style={styles.msg_img}
              img_name={msg_img}
              notice_style={styles.noticeStyle4}
              // notice={1}
            />
            <Image source={recite_img} style={styles.logo_img} />
            {/* <View style={styles.sat1} />
            <View style={styles.sat2} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoundNotice;
