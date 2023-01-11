import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";

import { IMG_URL } from "../../config";

import Subtract from "../../components/Subtract";
import { useDispatch, useSelector } from "react-redux";

import { getInfocard } from "../../redux/actions/infocard.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Boarding = (props) => {
  const [page, setPage] = useState(1);

  const [animatedOpacity, setRotateValue] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const infoCards = useSelector((state) => state.infoState);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [animatedOpacity, page]);

  useEffect(() => {
    dispatch(getInfocard(1, props.navigation.navigate));
  }, [dispatch]);

  const nextPage = (val) => {
    setRotateValue(new Animated.Value(0));
    setPage(val);
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={{ height: "5vh", justifyContent: "center" }}>
            {infoCards.infocardlist.length > 0 &&
              page !== infoCards.infocardlist.length && (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(
                      infoCards.infocardlist[page - 1].Info_Card_BT_1_Link_to
                    )
                  }
                >
                  <Text style={styles.skiplink}>
                    {infoCards.infocardlist[page - 1].Info_Card_BT_1_Show}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
          <View style={{ alignItems: "center"}}>
            <View style={{ alignItems: "center", width: '100%' }}>
              {infoCards.infocardlist.length > 0 &&
                infoCards.infocardlist.map(
                  (item, i) =>
                    item.Info_Card_Logo !== "" && (
                      <Animated.View
                        style={{
                          ...styles.logoAnimation,
                          opacity: animatedOpacity,
                        }}
                        key={i}
                      >
                        {
                          page === i + 1 && (
                            <Image
                              resizeMode='contain'
                              source={IMG_URL + item.Info_Card_Logo}
                              style={styles.boarding_img}
                            />
                          )
                          // <Image source={IMG_URL + item.Info_Card_Logo} style={styles[logostylelist[item.Info_Card_Show_order - 1]]} key={i}/>
                        }
                      </Animated.View>
                    )
                )}
            </View>
            <Subtract
              data={infoCards.infocardlist}
              nextPage={nextPage}
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
    height: windowHeight - '10vh',
    backgroundColor: "#FBFBFD",
    alignItems: "center",
  },
  contanier: {
    maxWidth: "375px",
    width: "100vw",
    padding: "23px",
    height: "90vh",
    justifyContent: "start",
  },
  skiplink: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    opacity: "0.5",
    textAlign: "right",
  },
  boarding_img: {
    width: "100%",
    height: "30vh",
    maxWidth: "40vh",
    maxHeight: "30vh",
    margin: "1vh",
    borderRadius: "10px",
    overflow: "hidden",
    borderWidth: '1px',
    borderColor: '#3590b3'
  },
  logoAnimation: {
    alignItems: "center",
    width: "100%",
  },
});

export default Boarding;
