import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from '@react-navigation/native'

import CustomSearchInput from "../../components/CustomSearchInput";
import FooterMenu from "../../components/FooterMenu";
import { format } from "date-fns";
import { useToast } from "react-native-toast-notifications";

import user_img from "../../assets/img/user-Image.png";
import arrowDown_img from "../../assets/img/arrow_down2.svg";

import Focus_img from "../../assets/img/icon/Focus.png";
import Following_img from "../../assets/img/icon/Follow.png";
import Other_img from "../../assets/img/icon/Others.png";

import Personal_img from "../../assets/img/icon/Personal.png";
import Business_img from "../../assets/img/icon/Business.png";


import SendMsg_img from "../../assets/img/icon/resume 1.png";
import AddFile_img from "../../assets/img/icon/add-file-2.png";
import AddFolder_img from "../../assets/img/icon/new-folder.png";


import { IMG_URL } from "../../config/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import AlphabetFlatList from "react-native-alphabetflatlist";
import {
  deleteContact,
  getUnreadInfo,
  setVData,
} from "../../redux/actions/contact.action";
import { useDispatch, useSelector } from "react-redux";

const Contacts = (props) => {
  const [photo, setPhoto] = useState("user-Image.png");

  const authinfo = useSelector((state) => state.authState);
  const contactinfo = useSelector((state) => state.contactState);
  const toast = useToast();
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selcontact, setSelcontact] = useState("");

  const dispatch = useDispatch();

  const category = useSelector((state) => state.contactState.category);
  const focus_folloing = useSelector((state) => state.contactState.focus_folloing);

  const [showSearch, setShowSearch] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
          style={{ alignItem: "center", margin: "auto" }}
        >
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, showSearch]);

  useEffect(() => {
    dispatch(
      getUnreadInfo({
        owner: authinfo.currentUser.email,
        category: category,
        focus_folloing: focus_folloing,
      })
    );
  }, [focus_folloing, category, isFocused]);

  const changeSearch = (val) => {
    setSearch(val);
  };

  const handleMike = (e) => {
    setMike(true);
  };

  const onPressRow = (index) => () => {
    dispatch(setVData({field: 'selected', value: index}))
    props.navigation.navigate("home", { id: index });
  };

  const onDeleteContact = (id) => {
    setSelcontact(id);
    setDeleteModal(true);
  };

  const deleteConfirm = () => {
    dispatch(
      deleteContact({
        id: selcontact,
        getunread: {
          owner: authinfo.currentUser.email,
          category: category,
          focus_folloing: focus_folloing,
        },
      }, toast)
    );
    setDeleteModal(false);
  };

  const renderItem = ( item, index ) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ width: "100%" }}
        key={index}
      >
        <Pressable onPress={onPressRow(index)} style={{ width: "101%" }}>
          <View style={styles.contactView}>
            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center' }}>
              <ImageBackground
                source={
                  item.to.image == "" || item.to.image == undefined
                    ? user_img
                    : IMG_URL + item.to.image
                }
                resizeMode="contain"
                style={styles.contact_avatar}
              />
              <View style={styles.contact_info}>
                <Text style={styles.contactName}>
                  {item.to.name == "" ? item.to.email[0] : item.to.name}
                </Text>
                <Text style={styles.createdAt}>
                  {format(new Date(item.to.createdAt), "dd/MM/yy")}
                </Text>
                <View style={{width: '100%', flexDirection: 'row'}}>
                  {
                    item.noticeEmail && 
                    <ImageBackground
                      source={SendMsg_img}
                      resizeMode="contain"
                      style={styles.notice_img}
                    />
                  }
                  {
                    item.to.shareFolder != undefined && item.to.shareFolder > 0 && 
                    <ImageBackground
                      source={AddFolder_img}
                      resizeMode="contain"
                      style={styles.notice_img}
                    />
                  }
                  {
                    item.to.shareFile != undefined && item.to.shareFile > 0 && 
                    <ImageBackground
                      source={AddFile_img}
                      resizeMode="contain"
                      style={styles.notice_img}
                    />
                  }
                  {/* <ImageBackground
                    source={AddFile_img}
                    resizeMode="contain"
                    style={styles.notice_img}
                  /> */}
                </View>
              </View>
            </View>
            {item.content.reduce((sum, subcount) => sum + subcount.count, 0) >
              0 && (
              <View style={styles.unreadMsg}>
                <Text style={styles.unreadMsgText}>
                  {item.content.reduce(
                    (sum, subcount) => sum + subcount.count,
                    0
                  )}
                </Text>
              </View>
            )}
          </View>
        </Pressable>
        <TouchableOpacity
          style={{
            backgroundColor: "#F22323",
            width: "10vh",
            height: "7vh",
            maxHeight: "60px",
            borderRadius: "10px",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            onDeleteContact(item.to._id);
          }}
        >
          <Text style={{ color: "white", fontSize: "14px" }}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const getItemLayout = (data, index) => ({
    length: 0,
    offset: 0 * index,
    index,
  });

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Contacts pages</Text> */}
          {showSearch && (
            <CustomSearchInput
              mike={handleMike}
              onChangeText={changeSearch}
              value={serach}
              content={"Search for subjects..."}
            />
          )}
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
          <View style={styles.categorygroup}>
              <View style={styles.PandB}>
                <TouchableOpacity
                  style={{
                    ...styles.subject_touch,
                    boxShadow:
                      category == "Personal"
                        ? "rgb(102 191 225) 2px 2px 2px 2px"
                        : "",
                    border:
                      category == "Personal"
                        ? "1px solid rgb(102 191 225)"
                        : "",
                  }}
                  onPress={() => dispatch(setVData({field: 'category', value: 'Personal'}))}
                >
                  <ImageBackground
                    source={Personal_img}
                    resizeMode="contain"
                    style={styles.subject_img}
                  />
                  <Text style={styles.subject_text}>Personal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.subject_touch,
                    boxShadow:
                      category == "Business"
                        ? "rgb(102 191 225) 2px 2px 2px 2px"
                        : "",
                    border:
                      category == "Business"
                        ? "1px solid rgb(102 191 225)"
                        : "",
                  }}
                  onPress={() => dispatch(setVData({field: 'category', value: 'Business'}))}
                >
                  <ImageBackground
                    source={Business_img}
                    resizeMode="contain"
                    style={styles.subject_img}
                  />
                  <Text style={styles.subject_text}>Business</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.foucsoffollow}>
                <TouchableOpacity
                  style={{
                    ...styles.subject_touch,
                    boxShadow:
                      focus_folloing == "Focus"
                        ? "rgb(102 191 225) 2px 2px 2px 2px"
                        : "",
                    border:
                      focus_folloing == "Focus"
                        ? "1px solid rgb(102 191 225)"
                        : "",
                  }}
                  onPress={() => dispatch(setVData({field: 'focus_folloing', value: 'Focus'}))}
                >
                  <ImageBackground
                    source={Focus_img}
                    resizeMode="contain"
                    style={styles.subject_img}
                  />
                  <Text style={styles.subject_text}>Focus</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.subject_touch,
                    boxShadow:
                      focus_folloing == "Following"
                        ? "rgb(102 191 225) 2px 2px 2px 2px"
                        : "",
                    border:
                      focus_folloing == "Following"
                        ? "1px solid rgb(102 191 225)"
                        : "",
                  }}
                  onPress={() => dispatch(setVData({field: 'focus_folloing', value: 'Following'}))}
                >
                  <ImageBackground
                    source={Following_img}
                    resizeMode="contain"
                    style={styles.subject_img}
                  />
                  <Text style={styles.subject_text}>Following</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bodyTitle}>
              <Text style={styles.allContacts}>Detail</Text>
              <Text style={styles.sortby}>
                Sort by
                <Image source={arrowDown_img} style={styles.arrowDown} />
              </Text>
            </View>
            <ScrollView style={{ backgroundColor: "transparent" }} contentContainerStyle={{paddingBottom: "40vh"}} showsVerticalScrollIndicator={false}>
              {
                contactinfo.unreadlist.map((item, index)=>
                  renderItem(item, index)
                )
              }
            </ScrollView>
          </View>
        </View>
      </View>
      {openModal && <View style={styles.modalBackground}></View>}
      <FooterMenu
        selected={2}
        opensubmodal={openModal}
        OpenModalfuc={setOpenModal}
        navigation={props.navigation}
      />
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
    // height: "10vh",
    paddingLeft: "3vh",
    paddingRight: "3vh",
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
    marginTop: "2vh",
    height: "90vh",
  },
  inputview: {
    width: "90%",
    marginTop: "0.5vh",
    flex: 1,
  },
  allContacts: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2.5vh",
    textAlign: "left",
    marginTop: "3vh",
    marginBottom: "3vh",
  },
  rowContainer: {
    width: "98%",
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
    alignItems: "center",
    paddingRight: "10%",
    width: "100%",
  },
  contact_avatar: {
    width: "6vh",
    height: "6vh",
  },
  contact_info: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "left",
    marginLeft: "1vh",
    width: "50%",
  },
  contactName: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  createdAt: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.2vh",
  },
  contactType: {
    borderRadius: "11px",
    color: "white",
    height: "max-content",
    width: "26%",
    padding: "3px",
    paddingLeft: "6px",
    paddingRight: "6px",
    marginLeft: "10%",
    marginRight: "10%",
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
  bodyTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowDown: {
    width: "25px",
    height: "25px",
  },
  sortby: {
    alignItems: "center",
    display: "flex",
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


  categorygroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: '1vh',
    borderBottomColor: 'grey',
    borderBottomWidth: '1px'
  },
  PandB: {
    flexDirection: "row",
    justifyContent: "space-around",
    // margin: "2vh",
  },
  pandbtouch: {
    width: "25%",
    height: "3vh",
    padding: "0.5vh",
    borderRadius: "10px",
    backgroundColor: "pink",
  },
  pandbtext: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
  },
  foucsoffollow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subject_touch: {
    width: "6vh",
    height: "6vh",
    alignItems: "center",
    borderRadius: "100%",
    justifyContent: "center",
  },
  subject_img: {
    width: "4vh",
    height: "4vh",
  },
  subject_text: {
    fontSize: "1.3vh",
    color: "#a3a6ac",
  },

  notice_img: {
    width: '4vh',
    height: '4vh',
    marginLeft: '1vh'
  }
});

export default Contacts;
