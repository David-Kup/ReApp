import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

import Subtract_img from "../assets/img/subtract.svg";
import RightArrow_img from "../assets/img/right_arrow.svg";

import Star_empty_img from "../assets/img/star_empty.png";
import Star_fill_img from "../assets/img/star_fill.png";

const Subtract = (props) => {
  const [content, setContent] = useState(1);
  const [animatedSlider, setRotateValue] = useState(new Animated.Value(-500));
  const { data } = props;
  const [contentlist, setContentList] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setContentList(
        data.map((item, i) => {
          return { title: item.Body_Title, content: item.Body_Description };
        })
      );
    }
  }, [data]);

  useEffect(() => {
    Animated.timing(animatedSlider, {
      toValue: 0,
      duration: 500,
    }).start();
  }, [content]);

  const nextContent = () => {
    if (content === data.length) {
      props.navigation.navigate(data[content - 1].Info_Card_BT_2_Link_to);
    } else {
      setContent(content + 1);
      setRotateValue(new Animated.Value(-500));
      props.nextPage(content + 1);
    }
  };

  const selstar = (val) => {
    setContent(val);
    setRotateValue(new Animated.Value(-500));
    props.nextPage(val);
  };

  return (
    <View style={styles.container}>
      {contentlist.length > 0 && (
        <ImageBackground
          source={Subtract_img}
          resizeMode="contain"
          style={styles.Subtract_img}
        >
          <View style={{ flexDirection: "row", margin: "10px" }}>
            {data.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => selstar(i + 1)}
                  disabled={content === i + 1}
                >
                  <Image
                    source={content === i + 1 ? Star_fill_img : Star_empty_img}
                    style={styles.Star_img}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Animated.View
            style={[
              styles.animateView,
              {
                transform: [
                  {
                    translateX: animatedSlider,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.title}>{contentlist[content - 1].title}</Text>
            <Text style={styles.content}>
              {contentlist[content - 1].content}
            </Text>
          </Animated.View>
          <View style={styles.nextBtn}>
            <TouchableOpacity onPress={nextContent}>
              <Image source={RightArrow_img} style={styles.RightArrow_img} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "50vh",
    maxHeight: "40vh",
    width: "290px",
    height: "267px",
    marginTop: "2vh",
  },
  Subtract_img: {
    flex: 1,
    alignItems: "center",
  },
  Star_img: {
    width: "16.05px",
    height: "16.05px",
    margin: "10px",
  },
  title: {
    textAlign: "center",
    color: "white",
    width: "270px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "32px",
  },
  content: {
    textAlign: "center",
    marginTop: "20px",
    color: "white",
    width: "270px",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "21px",
    opacity: 0.9,
  },
  nextBtn: {
    backgroundColor: "#2F3542",
    width: "70px",
    height: "70px",
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "-40px",
  },
  RightArrow_img: {
    width: "33px",
    height: "22px",
  },
});

export default Subtract;
