import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import user_img from "../../assets/img/user-Image.png";
import {
  getContactEmailInfo,
  getContactMessageInfo,
  deleteEmail,
  deleteMessage,
} from "../../redux/actions/contact.action";
import LeftArrow_img from "../../assets/img/left_arrow.svg";

import { IMG_URL } from "../../config";
import CustomSearchInput from "../../components/CustomSearchInput";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const radioButtonsData = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Personal",
    value: "Personal",
    color: "#FA7254",
  },
  {
    id: "2",
    label: "Business",
    value: "Business",
    color: "#FA7254",
  },
];

const ContactInfo = (props) => {
  const dispatch = useDispatch();

  const authInfo = useSelector((state) => state.authState);
  const contactInfo = useSelector((state) => state.contactState);

  const [photo, setPhoto] = useState("user-Image.png");
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const [tabitem, setTabitem] = useState(1);
  const [openModal, setOpenModal] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selsub, setSelsub] = useState("");

  const [contactIndex, setcontactIndex] = useState(0);
  const [tocontact, setTo] = useState({});

  useEffect(() => {
    setcontactIndex(props.route.params.id);
    setTo(contactInfo.unreadlist[props.route.params.id].to);
  }, [props.route.params]);

  useEffect(() => {
    if (tocontact != {}) {
      dispatch(
        getContactEmailInfo({
          owner: authInfo.currentUser.email,
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
            owner: authInfo.currentUser.email,
            to: tocontact.email,
          })
        );
        break;
      case 2:
        dispatch(
          getContactMessageInfo({
            user1: authInfo.currentUser.email,
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

  const addNewContact = () => () => {
    setModalVisible(true);
  };

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  };

  const onPressRow = (id) => () => {};

  const deletecurrentEmail = (id) => {
    setSelsub(id);
    setDeleteModal(true);
  };

  const deleteConfirm = () => {
    if (tabitem == 1) {
      dispatch(
        deleteEmail({
          id: selsub,
          getEmail: { owner: authInfo.currentUser.email, to: tocontact.email },
        })
      );
    } else if (tabitem == 2) {
      dispatch(
        deleteMessage({
          id: selsub,
          getMsg: { user1: authInfo.currentUser.email, user2: tocontact.email },
        })
      );
    }
    setDeleteModal(false);
  };

  const RenderEmails = ({ item }) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%", height: "max-content" }}
      >
        <Pressable onPress={onPressRow(item._id)} style={styles.w_100}>
          <View style={styles.contactView}>
            <ImageBackground
              source={
                item.image == "" || item.image == undefined
                  ? user_img
                  : IMG_URL + item.image
              }
              resizeMode="contain"
              style={styles.contact_avatar}
            />
            <View style={styles.contact_info}>
              <View style={styles.titleGroup}>
                <Text style={styles.contactName}>{item.from}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.createdAt), "dd/MM/yy")}
                </Text>
              </View>
              <Text style={styles.emailContent}>{item.content}</Text>
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#ECECEC",
          }}
          onPress={() =>
            props.navigation.navigate("sendEmailOrMsg", { email: item.from })
          }
        >
          <Text style={{ ...styles.buttonText, color: "#2D3442" }}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#F22323",
            zIndex: -2,
          }}
          onPress={() => deletecurrentEmail(item._id)}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const RenderMessages = ({ item }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%", height: "max-content" }}
      >
        <Pressable onPress={onPressRow(item._id)} style={styles.w_100}>
          <View style={styles.contactView}>
            <ImageBackground
              source={
                item.image == "" || item.image == undefined
                  ? user_img
                  : IMG_URL + item.image
              }
              resizeMode="contain"
              style={styles.contact_avatar}
            />
            <View style={styles.contact_info}>
              <View style={styles.titleGroup}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.createdAt), "dd/MM/yy")}
                </Text>
              </View>
              <Text style={styles.emailContent}>{item.desc}</Text>
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#ECECEC",
          }}
        >
          <Text style={{ ...styles.buttonText, color: "#2D3442" }}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#F22323",
            zIndex: -2,
          }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const RenderCalls = ({ item }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%", height: "max-content" }}
      >
        <Pressable onPress={onPressRow(item._id)} style={styles.w_100}>
          <View style={styles.contactView}>
            <ImageBackground
              source={user_img}
              resizeMode="contain"
              style={styles.contact_avatar}
            />
            <View style={styles.contact_info}>
              <View style={styles.titleGroup}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.createdAt), "dd/MM/yy")}
                </Text>
              </View>
              <Text style={styles.emailContent}>{item.desc}</Text>
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#ECECEC",
          }}
        >
          <Text style={{ ...styles.buttonText, color: "#2D3442" }}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#F22323",
            zIndex: -2,
          }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const RenderFiles = ({ item }) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%", height: "max-content" }}
      >
        <Pressable onPress={onPressRow(item._id)} style={styles.w_100}>
          <View style={styles.contactView}>
            <ImageBackground
              source={user_img}
              resizeMode="contain"
              style={styles.contact_avatar}
            />
            <View style={styles.contact_info}>
              <View style={styles.titleGroup}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.createdAt), "dd/MM/yy")}
                </Text>
              </View>
              <Text style={styles.emailContent}>{item.desc}</Text>
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#ECECEC",
          }}
        >
          <Text style={{ ...styles.buttonText, color: "#2D3442" }}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.buttonStyle,
            backgroundColor: "#F22323",
            zIndex: -2,
          }}
        >
          <Text style={{ ...styles.buttonText, color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {contactInfo.unreadlist[contactIndex].to.name}
          </Text>
          <TouchableOpacity
            style={styles.skiplink}
            onPress={() => props.navigation.navigate("contacts")}
          >
            <Text>
              <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={{ height: "30vh" }}>
            <View style={styles.photogroup}>
              <Image
                source={
                  contactInfo.unreadlist[contactIndex].to.image == ""
                    ? user_img
                    : IMG_URL + contactInfo.unreadlist[contactIndex].to.image
                }
                style={styles.photo_img}
              />
            </View>
            <Text style={styles.conatacName}>
              {contactInfo.unreadlist[contactIndex].to.name}
            </Text>
            <Text style={styles.uploadNotice}>
              {contactInfo.unreadlist[contactIndex].to.location}
            </Text>
          </View>
          <View style={styles.inputview}>
            <View style={styles.tabGroup}>
              <TouchableOpacity
                onPress={() => selectTabname(1)}
                style={{
                  ...styles.tabItem,
                  borderBottomColor: tabitem == 1 ? "#FA7254" : "#f1f1f4",
                }}
              >
                <Text
                  style={{
                    ...styles.tabItemText,
                    color: tabitem == 1 ? "#FA7254" : "#7f848d",
                  }}
                >
                  Emails
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectTabname(2)}
                style={{
                  ...styles.tabItem,
                  borderBottomColor: tabitem == 2 ? "#FA7254" : "#f1f1f4",
                }}
              >
                <Text
                  style={{
                    ...styles.tabItemText,
                    color: tabitem == 2 ? "#FA7254" : "#7f848d",
                  }}
                >
                  Messages
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectTabname(3)}
                style={{
                  ...styles.tabItem,
                  borderBottomColor: tabitem == 3 ? "#FA7254" : "#f1f1f4",
                }}
              >
                <Text
                  style={{
                    ...styles.tabItemText,
                    color: tabitem == 3 ? "#FA7254" : "#7f848d",
                  }}
                >
                  Calls
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectTabname(4)}
                style={{
                  ...styles.tabItem,
                  borderBottomColor: tabitem == 4 ? "#FA7254" : "#f1f1f4",
                }}
              >
                <Text
                  style={{
                    ...styles.tabItemText,
                    color: tabitem == 4 ? "#FA7254" : "#7f848d",
                  }}
                >
                  Files
                </Text>
              </TouchableOpacity>
            </View>
            <CustomSearchInput
              mike={handleMike}
              onChangeText={changeSearch}
              value={serach}
              content={"Search for contacts,files..."}
            />
            <ScrollView
              style={{ height: "33vh", marginTop: "2vh" }}
              showsVerticalScrollIndicator={false}
            >
              {tabitem == 1 &&
                contactInfo.contactEmailInfo.length > 0 &&
                contactInfo.contactEmailInfo.map((item, index) => (
                  <RenderEmails item={item} key={index} />
                ))}
              {tabitem == 2 &&
                contactInfo.contactMessageInfo.length > 0 &&
                contactInfo.contactMessageInfo.map((item, index) => (
                  <RenderMessages item={item} key={index} />
                ))}
              {/* {tabitem == 3 &&
                contactInfo.contactEmailInfo.length > 0 &&
                contactInfo.contactEmailInfo.map((item, index) => (
                  <RenderCalls item={item} key={index} />
                ))}
              {tabitem == 4 &&
                contactInfo.contactEmailInfo.length > 0 &&
                contactInfo.contactEmailInfo.map((item, index) => (
                  <RenderFiles item={item} key={index} />
                ))} */}
            </ScrollView>
          </View>
        </View>
      </View>
      {/* {openModal && <View style={styles.modalBackground}></View>}
      <FooterMenu opensubmodal={openModal} OpenModalfuc={setOpenModal} navigation={props.navigation}/> */}
      <Modal
        isVisible={deleteModal}
        onBackdropPress={() => setDeleteModal(false)}
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            height: "150px",
            width: "250px",
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderBottomColor: "black",
              borderBottomWidth: "1px",
              height: "100px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: "2.5vh" }}>
              Are Your Sure?
            </Text>
            <Text style={{ fontWeight: "400", fontSize: "1.5vh" }}>
              Would you like to delete this conversation?
            </Text>
          </View>
          <View style={{ flexDirection: "row", height: "50px" }}>
            <TouchableOpacity
              style={{
                borderRightColor: "black",
                borderRightWidth: "1px",
                height: "99%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => deleteConfirm()}
            >
              <Text style={{ fontWeight: "400", fontSize: "1.5vh" }}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: "99%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "400", fontSize: "1.5vh", color: "red" }}
                onPress={() => setDeleteModal(false)}
              >
                No, Dont Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  w_100: {
    width: "101%",
  },
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
  photogroup: {
    position: "relative",
    marginTop: "3vh",
    marginBottom: "1vh",
    textAlign: "center",
  },
  photo_img: {
    width: "18vh",
    height: "18vh",
  },
  conatacName: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.5vh",
  },
  uploadNotice: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2vh",
    opacity: 0.5,
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
  tabGroup: {
    flexDirection: "row",
    marginTop: "1vh",
  },
  tabItem: {
    flex: 1,
    color: "red",
    borderBottomColor: "#f1f1f4",
    borderBottomWidth: "1px",
    paddingBottom: "10px",
  },
  tabItemText: {
    color: "rgb(127 132 141)",
  },

  rowContainer: {
    width: "100%",
    flexDirection: "row",
  },
  contactView: {
    backgroundColor: "white",
    borderRadius: "10px",
    height: "7vh",
    maxHeight: "60px",
    marginBottom: "1vh",
    padding: "1.2vh",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "5px",
    width: "100%",
  },
  contact_avatar: {
    width: "5vh",
    height: "5vh",
  },
  contact_info: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "left",
    marginLeft: "1vh",
    width: "90%",
  },
  titleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: "3vh",
  },
  contactName: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
  },
  createdAt: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "11px",
  },
  emailContent: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "11px",
    width: "100%",
  },
  contactType: {
    borderRadius: "11px",
    color: "white",
    height: "max-content",
    width: "26%",
    padding: "3px",
    paddingLeft: "6px",
    paddingRight: "6px",
    marginLeft: "1vh",
    marginRight: "1vh",
  },
  unreadMsg: {
    borderRadius: "100%",
    backgroundColor: "rgba(45, 52, 66, 0.2)",
    width: "3vh",
    height: "3vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  unreadMsgText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
  },
  buttonStyle: {
    backgroundColor: "#F22323",
    width: "11vh",
    height: "7vh",
    maxHeight: "60px",
    borderRadius: "10px",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "-12px",
    zIndex: -1,
  },
  buttonText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
  },
  modalBackground: {
    backgroundColor: "#171B2B",
    opacity: 0.8,
    backdropFilter: "blur(0.5px)",
    position: "absolute",
    flex: 1,
    width: "100vw",
    height: "100vh",
  },
});

export default ContactInfo;
