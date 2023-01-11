import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import applogo_img from "../../assets/img/applogo.svg";
import * as RNLocalize from "react-native-localize";
import publicIP from "react-native-public-ip";
import { getBrowser } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const VerificationEmail = (props) => {
  const [country] = useState(RNLocalize.getCountry());
  const [ipaddress, setIpaddress] = useState("");
  const [browser] = useState(getBrowser(window));

  const authinfo = useSelector((state) => state.authState);

  useEffect(() => {
    publicIP()
      .then((ip) => {
        setIpaddress(ip);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNext = () => {
    props.navigation.navigate("setProfile");
  };

  return (
    <View style={styles.homebg}>
        <TouchableOpacity onPress={handleNext}>
          <View style={styles.contanier}>
            <Image source={applogo_img} style={styles.logo_img} />
            <View style={styles.contentView}>
              <View style={styles.codegroup}>
                <Text>{authinfo.tempcode[0]}</Text>
                <Text>{authinfo.tempcode[1]}</Text>
                <Text>{authinfo.tempcode[2]}</Text>
                <Text>{authinfo.tempcode[3]}</Text>
              </View>
              <View style={styles.contentgroup}>
                <Text style={styles.content}>
                  {
                    "Here is your one time password above please return to Recite and enter it on the verfication page to confirm your account."
                  }
                </Text>
                <Text style={styles.content}>
                  {
                    "Your recieveing this OTP because an attempt to access your account was made from:"
                  }
                </Text>
                <Text style={styles.content}>
                  Location: {country}
                  <br />
                  IP Address: {ipaddress}
                  <br />
                  Browser: {browser}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight-'10vh',
    backgroundColor: "#FBFBFD",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    height: "90vh",
    padding: "3vh",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  logo_img: {
    width: "57.33px",
    height: "59.9px",
    margin: "5vh",
  },
  contentView: {
    width: "100%",
    height: "65vh",
    alignItems: "center",
  },
  codegroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    maxWidth: "375px",
    width: "100vw",
  },
  content: {
    width: "292px",
    height: "60px",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "20px",
    marginBottom: "3vh",
    letterSpacing: "-0.24px",
  },
  contentgroup: {
    padding: "3vh",
    textAlign: "left",
  },
});

export default VerificationEmail;
