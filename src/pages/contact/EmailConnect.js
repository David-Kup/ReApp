import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Switch } from 'react-native-paper';

import LeftArrow_img from "../../assets/img/left_arrow.svg";
import rightArrow_img from "../../assets/img/arrow_right.svg";
import { ImageBackground } from "react-native-web";

import CustomInput from "../../components/CustomInput";

import EmailConnect_img from "../../assets/img/emailConnect.png"
import DeleteConnect_img from "../../assets/img/deleteConnect.png"

import { isEmailValid } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EmailConnect = (props) => {
  const [emailvalid, setEmailvalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
      <View style={styles.contanier}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Connect Email</Text>
          <TouchableOpacity
            style={styles.skiplink}
            onPress={() => props.navigation.goBack()}
          >
            <Text>
              <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.body}>
          <View style={styles.inputview}>
            <Text style={styles.itemText}>By connecting your existing email accounts you get the full power of Recite.  We present those email accounts in an organized way around subjects, emails and domains that have emailed you. </Text>
            <CustomInput
              type={false}
              hideIcon={true}
              contenttype={"emailAddress"}
              title={"Email Address"}
              valid={emailvalid}
              content={"Email Address"}
              wrongmsg={"Email valid failed"}
              onChangeText={handleEmail}
              value={email}
            />
            <CustomInput
              type={true}
              hideIcon={true}
              contenttype={"password"}
              title={"Email Password"}
              valid={passvalid}
              content={"Enter your password here"}
              wrongmsg={"Wrong Password!"}
              onChangeText={handlePassword}
              value={password}
            />
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.buttonStyle}>
              <ImageBackground style={{width: '5vh', height: '5vh'}} resizeMode="contain" source={EmailConnect_img}/>
              <Text style={styles.title}>Connect Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <ImageBackground style={{width: '5vh', height: '5vh'}} resizeMode="contain" source={DeleteConnect_img}/>
              <Text style={styles.title}>Delete Connection</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: "2vh",
    color: "#2D3442",
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
    height: "89.2vh",
    padding: '5vh'
  },
  inputview: {
    width: "90%",
    alignItems: 'center',
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
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '80%',
    margin: '1vh'
  }
});

export default EmailConnect;
