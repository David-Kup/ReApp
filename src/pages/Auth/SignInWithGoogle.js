import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import CustomHeader from "../../components/CustomHeader";
import CustomAccount from "../../components/CustomAccount";
import avatar1 from "../../assets/img/1.png";
import avatar2 from "../../assets/img/2.png";
import account from "../../assets/img/account.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SignInWithGoogle = (props) => {
  const signInWithGoogle = () => () => {
    props.navigation.navigate("signIn");
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <CustomHeader
            title={"Sign In with Google"}
            description={"Choose your account "}
          />
          <View style={styles.body}>
            <View style={styles.inputview}>
              <View style={styles.accountGroup}>
                <CustomAccount
                  avatar_img={avatar1}
                  name={"Paul Raj"}
                  email={"paul33@gmail.com"}
                  press={signInWithGoogle()}
                />
                <CustomAccount
                  avatar_img={avatar2}
                  name={"Paul Raj"}
                  email={"paulraj@gmail.com"}
                  press={signInWithGoogle()}
                />
              </View>
              <View style={styles.addaccountgroup}>
                <Image source={account} style={styles.avatar_img} />
                <Text style={styles.addaccountext}>Add another account</Text>
              </View>
              <Text style={styles.policyDesc}>
                {
                  "To continue, Google will share your name, email address, and profile picture with Automate. Before using this app, review its "
                }
                <Text style={{ color: "#2B80FE" }}>{"Privacy Policy"}</Text>
                <Text>{" and "}</Text>
                <Text style={{ color: "#2B80FE" }}>{"Terms of Services."}</Text>
              </Text>
            </View>
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
    height: "50vh",
    width: "90%",
    marginTop: "2.5vh",
    backgroundColor: "white",
    borderRadius: "10px",
    alignItems: "center",
  },
  accountGroup: {
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "100%",
  },
  addaccountgroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "2vh",
    marginBottom: "2vh",
    backgroundColor: "#fbfbfd",
    borderRadius: "10px",
    width: "90%",
  },
  addaccountext: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "15px",
    lineHeight: "32px",
    color: "#2D3442",
  },
  avatar_img: {
    width: "5vh",
    height: "5vh",
    margin: "2vh",
  },
  policyDesc: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "17px",
    color: "rgba(45, 52, 66, 0.5)",
    textAlign: "left",
    margin: "1vh",
  },
});

export default SignInWithGoogle;
