import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import CustomSearchInput from "../../components/CustomSearchInput";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import Exit_img from "../../assets/img/exit.svg";

import Contacts_img from "../../assets/img/Contacts.svg";
import Files_img from "../../assets/img/Files.svg";
import Messages_img from "../../assets/img/Messages.png";
import Call_img from "../../assets/img/Call.svg";

import user_img from "../../assets/img/user-Image.png";

import { IMG_URL } from "../../config";

import {
  getContactEmailInfo,
  getContactMessageInfo,
} from "../../redux/actions/contact.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomePage = (props) => {
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const dispatch = useDispatch();

  const authinfo = useSelector((state) => state.authState);
  const contactInfo = useSelector((state) => state.contactState);

  const [tabitem, setTabitem] = useState(1);
  const [contactIndex, setcontactIndex] = useState(0);
  const [tocontact, setTo] = useState({});

  useEffect(() => {
    if (props.route.params == undefined) {
      props.navigation.navigate("contacts");
    } else {
      setcontactIndex(props.route.params.id);
      setTo(contactInfo.unreadlist[props.route.params.id].to);
    }
  }, [props.route.params]);

  useEffect(() => {
    if (tocontact != {}) {
      dispatch(
        getContactEmailInfo({
          owner: authinfo.currentUser.email,
          to: tocontact.email,
        })
      );
    }
  }, [tocontact]);

  const selectTabname = (val) => {
    switch (val) {
      case 1:
        dispatch(
          getContactEmailInfo({
            owner: authinfo.currentUser.email,
            to: tocontact.email,
          })
        );
        break;
      case 2:
        dispatch(
          getContactMessageInfo({
            user1: authinfo.currentUser.email,
            user2: tocontact.email,
          })
        );
        break;
    }
    setTabitem(val);
  };

  const changeSearch = (val) => {
    setSearch(val);
  };

  const handleMike = (e) => {
    setMike(true);
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <View style={{ position: "relative", width: "100%" }}>
            <TouchableOpacity
              style={styles.topheader}
              onPress={() => {
                props.navigation.navigate("addContact", { cinfo: tocontact });
              }}
            >
              <Image
                source={
                  tocontact.image == "" ? user_img : IMG_URL + tocontact.image
                }
                style={styles.man_img}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("contacts")}
              style={{ position: "absolute", right: "1vh", top: "50%" }}
            >
              <Image
                source={Exit_img}
                style={{ width: "2vh", height: "2vh" }}
              />
            </TouchableOpacity>
          </View>
          <CustomSearchInput
            color="black"
            mike={handleMike}
            onChangeText={changeSearch}
            value={serach}
            content={"Search for subjects..."}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <View style={styles.statisticsgroup}>
              <TouchableOpacity
                style={styles.statisticsView}
                onPress={() => selectTabname(1)}
              >
                <Image source={Contacts_img} style={styles.statisticsImg} />
                <View style={styles.statisticsInfo}>
                  <Text style={styles.statisticsCount}>85</Text>
                  <Text style={styles.statisticsName}>Emails</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statisticsView}
                onPress={() => selectTabname(2)}
              >
                <Image source={Messages_img} style={styles.statisticsImg} />
                <View style={styles.statisticsInfo}>
                  <Text style={styles.statisticsCount}>85</Text>
                  <Text style={styles.statisticsName}>Messages</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statisticsView}
                onPress={() => selectTabname(3)}
              >
                <Image source={Call_img} style={styles.statisticsImg} />
                <View style={styles.statisticsInfo}>
                  <Text style={styles.statisticsCount}>125</Text>
                  <Text style={styles.statisticsName}>Calls</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statisticsView}>
                <Image source={Files_img} style={styles.statisticsImg} />
                <View style={styles.statisticsInfo}>
                  <Text style={styles.statisticsCount}>25</Text>
                  <Text style={styles.statisticsName}>Files</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.contextView}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.subjectlist}>
                {tabitem == 1 &&
                  contactInfo.contactEmailInfo.length > 0 &&
                  contactInfo.contactEmailInfo.map((emailitem, eindex) => (
                    <TouchableOpacity
                      // onPress={() =>
                      //   props.navigation.navigate("contactInfo", { id: i })
                      // }
                      style={styles.subjectView}
                      key={eindex}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <ImageBackground
                          source={
                            emailitem.image == "" ||
                            emailitem.image == undefined
                              ? user_img
                              : IMG_URL + emailitem.image
                          }
                          resizeMode="contain"
                          style={styles.subject_owner}
                        />
                        <View style={styles.subjectTitleView}>
                          <Text style={styles.subjectName}>
                            {emailitem.from}
                          </Text>
                          <Text style={styles.noticeDate}>
                            {format(new Date(emailitem.createdAt), "dd/MM/yy")}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.subjectContentView}>
                        <Text style={styles.subjectType}>
                          {emailitem.subject}
                        </Text>
                        <View style={styles.subjectContent}>
                          <View style={styles.subjectInfo}>
                            <Text style={styles.subjectInfoName}>
                              {emailitem.content}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                {tabitem == 2 &&
                  contactInfo.contactMessageInfo.length > 0 &&
                  contactInfo.contactMessageInfo.map((messageitem, mindex) => (
                    <TouchableOpacity
                      // onPress={() =>
                      //   props.navigation.navigate("contactInfo", { id: i })
                      // }
                      style={styles.subjectView}
                      key={mindex}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <ImageBackground
                          source={
                            messageitem.image == "" ||
                            messageitem.image == undefined
                              ? user_img
                              : IMG_URL + messageitem.image
                          }
                          resizeMode="contain"
                          style={styles.subject_owner}
                        />
                        <View style={styles.subjectTitleView}>
                          <Text style={styles.subjectName}>
                            {messageitem.from}
                          </Text>
                          <Text style={styles.noticeDate}>
                            {format(
                              new Date(messageitem.createdAt),
                              "dd/MM/yy"
                            )}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.subjectContentView}>
                        <Text style={styles.subjectType}>
                          {messageitem.subject}
                        </Text>
                        <View style={styles.subjectContent}>
                          <View style={styles.subjectInfo}>
                            <Text style={styles.subjectInfoName}>
                              {messageitem.content}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
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
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "0.8vh",
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    height: "26vh",
    padding: "2vh",
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
    height: "73.2vh",
    position: "relative",
  },
  inputview: {
    width: "90%",
    marginTop: "1.5vh",
  },
  topheader: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  man_img: {
    width: "12vh",
    height: "12vh",
  },
  notice_img: {
    width: "5vh",
    height: "5vh",
    position: "absolute",
    right: 0,
  },
  myStorage: {
    flexDirection: "row",
    padding: "2vh",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "30px",
    width: "100%",
    marginTop: "2vh",
  },
  storage: {
    width: "50%",
    textAlign: "left",
  },
  storageTitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2.5vh",
    color: "#FFFFFF",
  },
  SpaceGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  space: {},
  spaceTitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
    color: "rgba(255, 255, 255, 0.6)",
  },
  spaceAmount: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    color: "#FFFFFF",
    marginTop: "1vh",
  },

  contextView: {
    width: "100%",
    height: "45vh",
  },
  statisticsgroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statisticsView: {
    width: "40%",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1.5vh",
    flexDirection: "row",
    margin: "1vh",
    alignItems: "center",
  },
  statisticsImg: {
    width: "5vh",
    height: "5vh",
  },
  statisticsInfo: {
    textAlign: "left",
    marginLeft: "1vh",
  },
  statisticsCount: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "3.5vh",
    color: "#2D3442",
  },
  statisticsName: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    color: "rgba(45, 52, 66, 0.5)",
  },
  subjectlist: {
    height: "100%",
    width: "100%",
  },

  subjectView: {
    backgroundColor: "transparent",
    borderRadius: "10px",
    marginBottom: "1vh",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  subject_owner: {
    width: "7vh",
    height: "7vh",
  },
  subjectTitleView: {
    textAlign: "left",
    marginLeft: "1vh",
    justifyContent: "space-around",
    height: "7vh",
  },
  subjectName: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
    backgroundColor: "#FF8F77",
    borderRadius: "10px",
    padding: "0.3vh",
    textAlign: "center",
  },
  noticeDate: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.5vh",
  },
  subjectContentView: {
    flexDirection: "column",
    textAlign: "left",
  },
  subjectType: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "3.5vh",
  },
  subjectContent: {
    flexDirection: "row",
    marginBottom: "1vh",
  },
  subjectInfo: {
    flexDirection: "column",
  },
  subjectInfoName: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "2vh",
  },
  subjectInfoBefore: {
    color: "#2D3442",
    opacity: 0.5,
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.5vh",
  },
  file_img: {
    width: "6vh",
    height: "5vh",
  },

  // contextItem: {
  //   backgroundColor: "white",
  //   borderRadius: "10px",
  //   padding: "1.2vh",
  //   alignItems: "center",
  //   width: "100%",
  //   flexDirection: 'row',
  //   marginBottom: '1vh'
  // },
  // context_avatar: {
  //   width: "5vh",
  //   height: "5vh",
  //   borderRadius: '5px',
  // },
  // infoGroup: {
  //   flexDirection: "column",
  //   justifyContent: "space-evenly",
  //   textAlign: "left",
  //   marginLeft: "1vh",
  // },
  // titleGroup: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: "100%",
  // },
  // contextName: {
  //   color: "#2D3442",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "2vh",
  // },
  // createdAt: {
  //   color: "#9699a0",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "11px",
  // },
  // othertouch: {
  //   position: 'absolute',
  //   height: '2vh',
  //   right: '10px',
  //   top: 'calc(50% - 0.4vh)'
  // },
  // other_img: {
  //   width: '3vh',
  //   height: '0.7vh',
  // },

  // sortbygroup: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: '100%',
  //   marginBottom: '2vh'
  // },
  // showtypeview: {
  //   flexDirection: 'row'
  // },
  // arrowDown: {
  //   width: "3vh",
  //   height: "3vh",
  // },
  // sortby: {
  //   alignItems: "center",
  //   display: "flex",
  // },
  // showtypetouch: {

  // },
  // showtype: {
  //   width: '5vh',
  //   height: '5vh',
  // },
  // gcontextItem: {
  //   padding: '1vh',
  //   alignItems: 'center',
  //   backgroundColor: '#F4F6FA',
  //   borderRadius: '5px',
  //   margin: '0.5vh',
  //   width: '15vh',
  //   height: '15vh',
  //   justifyContent: 'space-around'
  // },
  // touchgroup: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '100%'
  // },
  // gfavtouch: {

  // },
  // fav_img: {
  //   width: '2vh',
  //   height: '2vh',
  // },
  // gothertouch: {

  // },
  // gother_img: {
  //   width: '2.5vh',
  //   height: '0.6vh',
  // },
  // gcontext_avatar: {
  //   width: '7vh',
  //   height: '7vh',
  // },
  // ginfoGroup: {
  //   justifyContent: 'center'
  // },
  // gcontextName: {
  //   color: "#9699a0",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "12px",
  // },

  // modalstyle: {
  //   justifyContent: "flex-end",
  //   margin: 0,
  //   alignItems: 'center'
  // },
  // modalLogo_img: {
  //   width: "12vh",
  //   height: "12vh",
  // },
  // modalTitle: {
  //   color: "#2D3442",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "2vh",
  // },
  // modalContent: {
  //   color: "#9699a0",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "1.2vh",
  // },
  // modalExit_img: {
  //   width: '3vh',
  //   height: '3vh',
  // },
  // accountItem: {
  //   width: '10vh',
  //   height: '15vh',
  //   marginRight: '2vh',
  //   marginTop: '1vh'
  // },
  // accountName: {
  //   color: "#2D3442",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "1.8vh",
  // },
  // account_avatar: {
  //   width: '10vh',
  //   height: '10vh',
  // },
  // actiongroup: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-evenly',
  // },
  // actionItem: {
  //   backgroundColor: '#F8F8F8',
  //   width: '12vh',
  //   height: '10vh',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: '10px',
  //   padding: '1vh',
  //   margin: '1vh',
  // },
  // action_img: {
  //   width: '2vh',
  //   height: '2vh',
  // },
  // actiontitle: {
  //   color: "rgba(45, 52, 66, 0.7)",
  //   fontFamily: "Museo Slab",
  //   fontStyle: "normal",
  //   fontWeight: 400,
  //   fontSize: "2.5vh",
  // }
});

export default HomePage;
