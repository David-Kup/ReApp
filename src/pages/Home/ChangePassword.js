import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import LeftArrow_img from "../../assets/img/left_arrow.svg";
import password_img from "../../assets/img/privacy.svg";

import CustomBtn from "../../components/CustomBtn";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [repass, setRepass] = useState("");

  const onChangePass = () => {
    if (repass !== newpass) {
      toast.show("Password Not Matched", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>Change Password</Text>
          <TouchableOpacity
            style={styles.skiplink}
            onPress={() => props.navigation.navigate("Contacts")}
          >
            <Text>
              <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <View style={styles.passview}>
              <Image source={password_img} style={styles.item_img} />
              <TextInput
                value={oldpass}
                onChangeText={setOldpass}
                style={styles.passinput}
                secureTextEntry={true}
                placeholder="Old Password"
                placeholderTextColor="rgba(45, 52, 66, 0.6)"
              />
            </View>
            <View style={styles.passview}>
              <Image source={password_img} style={styles.item_img} />
              <TextInput
                value={newpass}
                onChangeText={setNewpass}
                style={styles.passinput}
                secureTextEntry={true}
                placeholder="New Password"
                placeholderTextColor="rgba(45, 52, 66, 0.6)"
              />
            </View>
            <View style={styles.passview}>
              <Image source={password_img} style={styles.item_img} />
              <TextInput
                value={repass}
                onChangeText={setRepass}
                style={styles.passinput}
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(45, 52, 66, 0.6)"
              />
            </View>
          </View>
          <CustomBtn
            type={"bright"}
            text={"Save"}
            disabled={oldpass == "" || newpass == "" || repass == ""}
            onPress={() => onChangePass()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#2D3442",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8vh",
    flex: 1,
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    height: "15vh",
    padding: "3vh",
    position: "relative",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    color: "white",
  },
  Exit_img: {
    width: "1.5vh",
    height: "1.5vh",
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
    position: "relative",
    height: "84.2vh",
  },
  inputview: {
    width: "90%",
    paddingTop: "2vh",
    flex: 1,
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    position: "absolute",
    left: "30px",
  },
  LeftArrow_img: {
    width: "1.5vh",
    height: "1.5vh",
  },
  menuItem: {
    flexDirection: "row",
    padding: "3vh",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f1f1f4",
    borderBottomWidth: "1px",
  },
  itemText: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.2vh",
    marginLeft: "2vh",
  },
  itemArrow: {
    width: "1.5vh",
    height: "1.5vh",
  },
  item_img: {
    width: "5vh",
    height: "5vh",
    position: "absolute",
    top: "1vh",
    left: "0.5vh",
  },
  passview: {},
  passinput: {
    fontSize: "2vh",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    paddingLeft: "6.5vh",
    paddingRight: "2vh",
    borderBottomColor: "rgba(45, 52, 66, 0.08)",
    borderBottomWidth: "1px",
  },
});

export default ChangePassword;
