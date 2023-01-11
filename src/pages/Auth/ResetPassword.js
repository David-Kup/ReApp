import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import { isEmailValid } from "../../utils";

import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import Message_img from "../../assets/img/Message.svg";
import { resetPassword } from "../../redux/actions/auth.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ResetPassword = (props) => {
  const [emailvalid, setEmailvalid] = useState(true);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const send = () => () => {
    if (email === "") {
      setEmailvalid(false);
      return;
    }
    if (isEmailValid(email)) {
      dispatch(resetPassword({ email }, props.navigation, toast));
    } else {
      toast.show("Email not valided", {
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

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <CustomHeader
            title={"Reset Password"}
            description={
              "Please enter your email here, you will  receive a OTP"
            }
          />
          <View style={styles.body}>
            <View style={styles.inputview}>
              <CustomInput
                type={false}
                iconimg={Message_img}
                contenttype={"email"}
                title={"Email"}
                valid={emailvalid}
                content={"Enter your email here"}
                wrongmsg={"Email valid failed"}
                onChangeText={handleEmail}
                value={email}
              />
            </View>
            <CustomBtn
              type={"bright"}
              text={"Send"}
              onPress={send()}
              disabled={!isEmailValid(email) || email === ""}
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
    // paddingTop: "0.8vh",
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
    height: "62.2vh",
    position: "relative",
    marginTop: "2vh",
  },
  inputview: {
    height: "20vh",
    width: "90%",
    marginTop: "2.5vh",
  },
});

export default ResetPassword;
