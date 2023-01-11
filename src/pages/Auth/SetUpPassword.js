import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import CustomBtn from "../../components/CustomBtn";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import Lock_img from "../../assets/img/Lock.svg";

import { setUpPass } from "../../redux/actions/auth.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SetUpPassword = (props) => {
  const [newPassvalid, setNewPassvalid] = useState(true);
  const [rePassvalid, setRePassvalid] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const toast = useToast();

  const dispatch = useDispatch();

  const authinfo = useSelector((state) => state.authState);

  const continueSetPass = () => () => {
    if (newPassword === rePassword) {
      dispatch(
        setUpPass(
          {
            email: authinfo.tempemail,
            password: newPassword,
          },
          props.navigation.navigate,
          toast
        )
      );
      // props.navigation.navigate('signIn');
    } else {
      setNewPassvalid(false);
      setRePassvalid(false);
    }
  };

  const handleNewPass = (e) => {
    setNewPassword(e);
  };

  const handleRePass = (e) => {
    setRePassword(e);
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <CustomHeader
            title={"Set Up Password"}
            description={"Create a password to secure your account"}
          />
          <View style={styles.body}>
            <View style={styles.inputview}>
              <CustomInput
                type={true}
                iconimg={Lock_img}
                contenttype={"newPassword"}
                title={"Password"}
                valid={newPassvalid}
                content={"Type your password here"}
                wrongmsg={"Wrong Password!"}
                onChangeText={handleNewPass}
                value={newPassword}
              />
              <CustomInput
                type={true}
                iconimg={Lock_img}
                contenttype={"password"}
                title={"Confirm Password"}
                valid={rePassvalid}
                content={"Re-type password here"}
                wrongmsg={"Wrong Password!"}
                onChangeText={handleRePass}
                value={rePassword}
              />
            </View>
            <CustomBtn
              type={"bright"}
              text={"Continue"}
              onPress={continueSetPass()}
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
    height: windowHeight - '10vh',
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
    height: "62.2vh",
    position: "relative",
    marginTop: "2vh",
  },
  inputview: {
    height: "35vh",
    width: "90%",
    marginTop: "2.5vh",
  },
});

export default SetUpPassword;
