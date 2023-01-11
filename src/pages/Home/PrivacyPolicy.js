import React, {  } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import LeftArrow_img from "../../assets/img/left_arrow.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PrivacyPolicy = (props) => {
  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
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
            <ScrollView>
              <Text style={styles.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
                magna cursus dolor aenean. Ut fringilla in amet elit ultrices
                arcu. Nisl purus facilisis cum vitae eget dis placerat eget
                egestas. Arcu nunc hendrerit donec amet, lectus dolor viverra
                tortor, neque. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Orci magna cursus dolor aenean. Ut fringilla in
                amet elit ultrices arcu. Nisl purus facilisis cum vitae eget dis
                placerat eget egestas. Arcu nunc hendrerit donec amet, lectus
                dolor viverra tortor, neque. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Orci magna cursus dolor aenean. Ut
                fringilla in amet elit ultrices arcu. Nisl purus facilisis cum
                vitae eget dis placerat eget egestas. Arcu nunc hendrerit donec
                amet, lectus dolor viverra tortor, neque.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Orci magna cursus dolor
                aenean. Ut fringilla in amet elit ultrices arcu. Nisl purus
                facilisis cum vitae eget dis placerat eget egestas. Arcu nunc
                hendrerit donec amet, lectus dolor viverra tortor, neque.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Orci magna
                cursus dolor aenean. Ut fringilla in amet elit ultrices arcu.
                Nisl purus facilisis cum vitae eget dis placerat eget egestas.
                Arcu nunc hendrerit donec amet, lectus dolor viverra tortor,
                neque.
              </Text>
            </ScrollView>
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
    height: "84.2vh",
  },
  inputview: {
    width: "90%",
    paddingTop: "2vh",
    paddingBottom: "2vh",
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
  content: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.5vh",
    opacity: 0.7,
    textAlign: "left",
    lineHeight: "3vh",
  },
});

export default PrivacyPolicy;
