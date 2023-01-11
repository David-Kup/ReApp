import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";

import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";

import {
  verificationcode,
  verificationresend,
  resetverificationcode,
  resetverificationresend,
} from "../../redux/actions/auth.action";
import { useToast } from "react-native-toast-notifications";

import * as RNLocalize from "react-native-localize";
import publicIP from "react-native-public-ip";
import { getBrowser } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Verification = (props) => {
  const firstcode = useRef();
  const secondcode = useRef();
  const thirdcode = useRef();
  const fourthcode = useRef();

  const authinfo = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const toast = useToast();
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

  const continueCode = () => () => {
    if (
      firstcode.current.value === "" ||
      secondcode.current.value === "" ||
      thirdcode.current.value === "" ||
      fourthcode.current.value === ""
    ) {
      toast.show("Fill all fields.", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }
    if (props.route.params.id === "signed") {
      // props.navigation.navigate('setUpPassword');
      let code =
        "" +
        firstcode.current.value +
        "" +
        secondcode.current.value +
        "" +
        thirdcode.current.value +
        "" +
        fourthcode.current.value +
        "";
      dispatch(
        resetverificationcode(
          { email: authinfo.tempemail, code },
          props.navigation.navigate,
          toast
        )
      );
    } else {
      let code =
        "" +
        firstcode.current.value +
        "" +
        secondcode.current.value +
        "" +
        thirdcode.current.value +
        "" +
        fourthcode.current.value +
        "";
      dispatch(
        verificationcode(
          { email: authinfo.tempemail, code },
          props.navigation.navigate,
          toast
        )
      );
      // props.navigation.navigate('verificationEmail');
    }
  };

  const resend = () => {
    if (props.route.params.id === "signed") {
      dispatch(
        verificationresend(
          { email: authinfo.tempemail, country, ipaddress, browser },
          props.navigation.navigate,
          toast
        )
      );
      // props.navigation.navigate('setUpPassword');
    } else {
      dispatch(
        resetverificationresend(
          { email: authinfo.tempemail, country, ipaddress, browser },
          props.navigation.navigate,
          toast
        )
      );
    }
  };

  const nextstep = (e) => {
    e.preventDefault();

    if ((e.key >= 0 && e.key <= 9) || e.key === "Backspace") {
      if (e.key === "Backspace") {
        e.target.value = "";
      } else {
        e.target.value = e.key;
      }
      var target = e.srcElement || e.target;
      var myLength = target.value.length;

      if (myLength >= 1) {
        var next = target.nextElementSibling;
        while (next) {
          if (next.tagName.toLowerCase() === "input") {
            next.focus();
            break;
          }
          next = target.nextElementSibling;
        }
      } else if (myLength === 0) {
        var previous = target.previousElementSibling;
        while (previous) {
          if (previous.tagName.toLowerCase() === "input") {
            previous.focus();
            break;
          }
          previous = target.previousElementSibling;
        }
      }
    }
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <CustomHeader
            style={{ height: "25vh" }}
            title={"Verification"}
            description={
              "We’ve just emailed you a 4 digit’s code. \n Please enter the code below to verify it’s you"
            }
          />
          <View style={styles.body}>
            <View style={styles.inputview}>
              <View style={styles.codegroup}>
                <TextInput
                  ref={firstcode}
                  onKeyPress={nextstep}
                  style={styles.codeinput}
                  maxLength={1}
                />
                <TextInput
                  ref={secondcode}
                  onKeyPress={nextstep}
                  style={styles.codeinput}
                  maxLength={1}
                />
                <TextInput
                  ref={thirdcode}
                  onKeyPress={nextstep}
                  style={styles.codeinput}
                  maxLength={1}
                />
                <TextInput
                  ref={fourthcode}
                  onKeyPress={nextstep}
                  style={styles.codeinput}
                  maxLength={1}
                />
              </View>
              <Text style={styles.question}>
                Didn’t get the code?{" "}
                <TouchableOpacity onPress={resend}>
                  <Text style={styles.link}>Resend Code</Text>
                </TouchableOpacity>
              </Text>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Continue"}
              onPress={continueCode()}
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
  codeinput: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "32px",
    color: "#2D3442",
    width: "6vh",
    height: "6vh",
    borderColor: "#2D3442",
    borderWidth: 1,
    borderRadius: "10px",
    textAlign: "center",
    alignItems: "center",
  },
  codegroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
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
    height: "30vh",
    width: "90%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  question: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "15px",
    color: "#2D3442",
    marginTop: "3vh",
  },
  link: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2A8CB1",
  },

  inputsContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputContainerFocused: {
    borderColor: "#0f5181",
  },
  inputText: {
    fontSize: 24,
    fontFamily: "Menlo-Regular",
  },
  hiddenCodeInput: {
    position: "absolute",
    height: 0,
    width: 0,
    opacity: 0,
  },
});

export default Verification;
