import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { useDispatch } from "react-redux";

import LeftArrow_img from "../../assets/img/left_arrow.svg";

import up_img from "../../assets/img/up.svg";
import down_img from "../../assets/img/down.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SECTIONS = [
  {
    title: "Booking Information",
    content: [
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
    ],
  },
  {
    title: "Payment and Discount",
    content: [
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
      {
        question: "Why use multiple apps that can ",
        answer: "fdsafdsafdsafdsa",
      },
    ],
  },
];

const Faq = (props) => {
  const dispatch = useDispatch();

  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, i, isActive) => {
    return (
      <View style={styles.collapseheader}>
        <Text style={styles.collapseheaderText}>{section.title}</Text>
        <Image
          source={isActive ? up_img : down_img}
          style={styles.updown_img}
        />
      </View>
    );
  };

  const [activeSubSections, setActiveSubSections] = useState([]);

  const renderSubHeader = (subsection, i) => {
    return (
      <View style={styles.subcollheader}>
        <Text style={styles.collapseheaderText}>
          {i + 1 + ") " + subsection.question}
        </Text>
      </View>
    );
  };

  const renderSubContent = (subsection) => {
    return (
      <View style={styles.subcollapsecontent}>
        <Text style={styles.subcollapsecontentText}>{subsection.answer}</Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.collapsecontent}>
        <Accordion
          sections={section.content}
          activeSections={activeSubSections}
          renderHeader={renderSubHeader}
          renderContent={renderSubContent}
          onChange={setActiveSubSections}
        />
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>FAQ’s</Text>
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
            <Text style={styles.faqtitle}>Hello, how can we help you?</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
            />
            <ScrollView style={{ height: "60vh" }}>
              <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
              />
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
    padding: "2vh",
    maxWidth: "375px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    position: "relative",
    height: "84.2vh",
  },
  inputview: {
    width: "90%",
    justifyContent: "center",
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
  faqtitle: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "2.5vh",
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  searchInput: {
    backgroundColor: "#F4F4F4",
    borderRadius: "10px",
    fontSize: "2vh",
    color: "#2D3442",
    opacity: 0.5,
    height: "2vh",
    padding: "3vh",
    marginBottom: "4vh",
  },
  collapseheader: {
    textAlign: "left",
    backgroundColor: "white",
    paddingLeft: "1vh",
    paddingRight: "1vh",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    borderBottomWidth: "1px",
    borderBottomColor: "#F4F4F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collapseheaderText: {
    color: "#2D3442",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.5vh",
  },
  updown_img: {
    width: "2vh",
    height: "1vh",
  },
  collapsecontent: {},
  subcollheader: {
    padding: "2vh",
    textAlign: "left",
    borderBottomColor: "grey",
    borderBottomWidth: "1px",
  },
  collapseheaderText: {
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.3vh",
  },
  subcollapsecontent: {},
  subcollapsecontentText: {
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.3vh",
    textAlign: "left",
    padding: "3vh",
  },
});

export default Faq;
