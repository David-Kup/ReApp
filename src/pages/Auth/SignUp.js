import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  CheckBox,
} from "react-native";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import { isEmailValid } from "../../utils";

import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import CustomFooter from "../../components/CustomFooter";
import Message_img from "../../assets/img/Message.svg";
import Lock_img from "../../assets/img/Lock.svg";

import * as RNLocalize from "react-native-localize";
import publicIP from "react-native-public-ip";
import { getBrowser } from "../../utils";

import { register } from "../../redux/actions/auth.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignUp = (props) => {
  const [emailvalid, setEmailvalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSelected, setSelection] = useState(false);
  const dispatch = useDispatch();

  const [country] = useState(RNLocalize.getCountry());
  const [ipaddress, setIpaddress] = useState("");
  const [browser] = useState(getBrowser(window));

  useEffect(() => {
    publicIP()
      .then((ip) => {
        setIpaddress(ip);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const signup = () => () => {
    if (email === "" || password === "" || isSelected === false) {
      toast.show("Should fill all fields.", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      setEmailvalid(false);
      setPassvalid(false);
      return;
    }
    if (password.length < 6) {
      toast.show("Password should be more than 6 letters.", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      setPassvalid(false);
      return;
    }
    if (isEmailValid(email)) {
      dispatch(register({ email, password, country, ipaddress, browser }, props.navigation.navigate, toast));
    } else {
      toast.show("Email not valid.", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };

  const handleEmail = (e) => {
    if (isEmailValid(e)) {
      setEmailvalid(true);
    } else {
      setEmailvalid(false);
    }
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e);
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          {/* <CustomHeader
            title={"Sign Up to Recite"}
            description={"Enter your Email and Password"}
          /> */}
          <View style={styles.body}>
            <View style={styles.inputview}>
              <CustomInput
                type={false}
                iconimg={Message_img}
                contenttype={"emailAddress"}
                title={"Email"}
                valid={emailvalid}
                content={"Enter your email here"}
                wrongmsg={"Email valid failed"}
                onChangeText={handleEmail}
                value={email}
              />
              <CustomInput
                type={true}
                iconimg={Lock_img}
                contenttype={"password"}
                title={"Password"}
                valid={passvalid}
                content={"Enter your password here"}
                wrongmsg={"Wrong Password!"}
                onChangeText={handlePassword}
                value={password}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Agree with terms and privacy?</Text>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Sign Up"}
              onPress={signup()}
              disabled={
                !isEmailValid(email) ||
                email === "" ||
                password === "" ||
                !isSelected
              }
            />
            <CustomFooter
              question={"Already have an account? "}
              linktext={"Sign In"}
              linkurl={"signIn"}
              type={"signUp"}
              navigation={props.navigation}
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
    height: windowHeight - "10vh",
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
  title: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    lineHeight: "32px",
    color: "#2D3442",
    marginBottom: "18px",
    alignItems: "right",
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
    height: "87vh",
    position: "relative",
    marginTop: "2vh",
    justifyContent: "space-around",
  },
  inputview: {
    height: "30vh",
    width: "90%",
    marginTop: "2vh",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: "-20px",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default SignUp;
