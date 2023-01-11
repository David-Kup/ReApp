import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import user_img from "../../assets/img/user-Image.png";
import rightArrow_img from "../../assets/img/arrow_right.svg";

import payment_img from "../../assets/img/payment.svg";
import setting_img from "../../assets/img/setting.svg";
import privacy_img from "../../assets/img/privacy.svg";
import about_img from "../../assets/img/about.svg";
import logout_img from "../../assets/img/logout.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PersonalPage = (props) => {
  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.body}>
          <TouchableOpacity style={styles.userinfotouch}>
            <View style={styles.userinfoView}>
              <Image source={user_img} style={styles.avatar} />
              <View style={styles.userinfo}>
                <Text style={styles.name}>Alex Smith</Text>
                <Text style={styles.email}>alex33@gmail.com</Text>
              </View>
            </View>
            <Image source={rightArrow_img} style={styles.rightarrow} />
          </TouchableOpacity>

          <View>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={payment_img} style={styles.item_img} />
                <Text style={styles.itemText}>Payments</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={setting_img} style={styles.item_img} />
                <Text style={styles.itemText}>Settings</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={privacy_img} style={styles.item_img} />
                <Text style={styles.itemText}>Privacy Policy</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.userinfoView}>
                <Image source={about_img} style={styles.item_img} />
                <Text style={styles.itemText}>About Us</Text>
              </View>
              <Image source={rightArrow_img} style={styles.itemArrow} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutview}>
          <Image source={logout_img} style={styles.logoutimg} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#FBFBFD",
    alignItems: "center",
  },
  contanier: {
    maxWidth: "375px",
    width: "100vw",
    padding: "23px",
    height: "90vh",
    justifyContent: "center",
    flex: 1,
  },
  body: {
    flex: 1,
  },
  userinfotouch: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "1vh",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5vh",
    marginTop: "20vh",
  },
  userinfoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: "7vh",
    height: "7vh",
  },
  userinfo: {
    marginLeft: "2vh",
  },
  name: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "3vh",
  },
  email: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
    opacity: 0.5,
  },
  rightarrow: {
    width: "2vh",
    height: "2vh",
  },
  menuItem: {
    flexDirection: "row",
    padding: "1vh",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#f1f1f4",
    borderBottomWidth: "1px",
  },
  item_img: {
    width: "6vh",
    height: "6vh",
  },
  itemText: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2.2vh",
    marginLeft: "1vh",
  },
  itemArrow: {
    width: "1.5vh",
    height: "1.5vh",
  },
  logoutview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutimg: {
    width: "4vh",
    height: "4vh",
  },
  logoutText: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
  },
});

export default PersonalPage;
