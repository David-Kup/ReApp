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


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Settings = (props) => {

  const [isPushNoticeOn, setIsPushNoticeOn] = useState(false);
  const [isAutoUpdateOn, setIsAutoUpdateOn] = useState(false);

  const onPushNotice = () => setIsPushNoticeOn(!isPushNoticeOn);
  const onAutoUpdate = () => setIsAutoUpdateOn(!isAutoUpdateOn);

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
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
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.itemText}>All Reminders</Text>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('editProfile')} style={styles.menuItem}>
              <Text style={styles.itemText}>Account Profile</Text>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.itemText}>Email Support</Text>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.itemText}>Push Notifications</Text>
              <Switch value={isPushNoticeOn} onValueChange={onPushNotice} />
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.itemText}>Auto Updates</Text>
              <Switch value={isAutoUpdateOn} onValueChange={onAutoUpdate} />
            </View>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.itemText}>Blocked Emails / Domains</Text>
              <Image source={rightArrow_img} style={styles.itemArrow} />
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
    height: "89.2vh",
  },
  inputview: {
    width: "90%",
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
});

export default Settings;
