import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import { isEmailValid } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
// import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import CustomFooter from "../../components/CustomFooter";
import Message_img from "../../assets/img/Message.svg";
import Lock_img from "../../assets/img/Lock.svg";

import { login } from "../../redux/actions/auth.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignIn = (props) => {
  const [emailvalid, setEmailvalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const authinfo = useSelector((state) => state.authState);

  useEffect(() => {
    if (authinfo.currentUser) {
      if (authinfo.currentUser.admin) {
        props.navigation.navigate("signInAdmin");
      } else {
        props.navigation.navigate("allSubjects");
      }
    }
  }, [authinfo.currentUser]);

  const signin = () => () => {
    if (email === "" || password === "") {
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
      dispatch(login({ email, password }, props.navigation.navigate, toast));
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
    if (e.length < 6) {
      setPassvalid(false);
    } else {
      setPassvalid(true);
    }
    setPassword(e);
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          {/* <CustomHeader
            title={"Sign In to Recite"}
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
            <View
              style={{ width: "90%", textAlign: "right", marginBottom: "2vh" }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("forgot")}
              >
                <Text>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Sign In"}
              onPress={signin()}
              disabled={!isEmailValid(email) || email === "" || password === ""}
            />
            <CustomFooter
              question={"Don’t have an account? "}
              linktext={"Sign Up"}
              linkurl={"signUp"}
              type={"signIn"}
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
    marginTop: "2.5vh",
  },
});

export default SignIn;
