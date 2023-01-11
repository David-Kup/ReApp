import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import LeftArrow_img from "../../assets/img/left_arrow.svg";
import arrowDown_img from "../../assets/img/arrow_down2.svg";

import pdf_img from "../../assets/img/pdf.png";
import threedot_img from "../../assets/img/threedot.svg";

import listtype_img from "../../assets/img/listtype.svg";
import grouptype_img from "../../assets/img/grouptype.svg";
import listtypeSelected_img from "../../assets/img/listtypeSelected.svg";
import grouptypeSelected_img from "../../assets/img/grouptypeSelected.svg";

import star_full_img from "../../assets/img/favstar_full.png";
import star_empty_img from "../../assets/img/favstar_empty.png";
import modalExit_img from "../../assets/img/modal_exit.svg";
import UserAcount_img from "../../assets/img/UserAcount.png";

import Edit_img from "../../assets/img/Edit.svg";
import Copy_img from "../../assets/img/Copy.svg";
import Logout_img from "../../assets/img/Logout_grey.svg";
import Delete_img from "../../assets/img/Delete.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: false,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
  {
    name: "Marlin Project Brief.pdf",
    type: "pdf",
    img: "pdf.png",
    createdAt: "131 KB | Modified 1week ago",
    fav: true,
  },
];

const ContextList = (props) => {
  const dispatch = useDispatch();

  const [listType, setListType] = useState(true);
  const [contextlist, setContextlist] = useState(data);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedContext, setSelectedContext] = useState("");

  const setfav = (index) => () => {
    setContextlist(
      contextlist.map((item, i) => ({
        ...item,
        fav: i == index ? !item.fav : item.fav,
      }))
    );
  };

  const control = (index) => () => {
    setSelectedContext(index);
    setModalVisible(true);
  };

  const RenderEmailbylist = ({ item, index }) => {
    return (
      <View style={styles.contextItem}>
        <ImageBackground
          source={pdf_img}
          resizeMode="contain"
          style={styles.context_avatar}
        />
        <View style={styles.infoGroup}>
          <Text style={styles.contextName}>{item.name}</Text>
          <Text style={styles.createdAt}>
            {format(new Date(item.createdAt), "dd/MM/yy")}
          </Text>
        </View>
        <TouchableOpacity style={styles.othertouch} onPress={control(index)}>
          <Image source={threedot_img} style={styles.other_img} />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderEmailsbygroup = ({ item, index }) => {
    return (
      <View style={styles.gcontextItem}>
        <View style={styles.touchgroup}>
          <TouchableOpacity style={styles.gfavtouch} onPress={setfav(index)}>
            <Image
              source={item.fav ? star_full_img : star_empty_img}
              style={styles.fav_img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gothertouch} onPress={control(index)}>
            <Image source={threedot_img} style={styles.gother_img} />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={pdf_img}
          resizeMode="contain"
          style={styles.gcontext_avatar}
        />
        <View style={styles.ginfoGroup}>
          <Text style={styles.gcontextName}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          <Text style={styles.title}>Context List</Text>
          <TouchableOpacity
            style={styles.skiplink}
            onPress={() => props.navigation.navigate("home")}
          >
            <Text>
              <Image source={LeftArrow_img} style={styles.LeftArrow_img} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.inputview}>
            <View style={styles.sortbygroup}>
              <Text style={styles.sortby}>
                Sort by
                <Image source={arrowDown_img} style={styles.arrowDown} />
              </Text>
              <View style={styles.showtypeview}>
                <TouchableOpacity onPress={() => setListType(true)}>
                  <Image
                    source={listType ? listtypeSelected_img : listtype_img}
                    style={styles.showtype}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setListType(false)}>
                  <Image
                    source={listType ? grouptype_img : grouptypeSelected_img}
                    style={styles.showtype}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={styles.contextView}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {contextlist.length > 0 &&
                contextlist.map((item, index) =>
                  listType ? (
                    <RenderEmailbylist item={item} index={index} key={index} />
                  ) : (
                    <RenderEmailsbygroup
                      item={item}
                      index={index}
                      key={index}
                    />
                  )
                )}
            </ScrollView>
          </View>
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalstyle}
      >
        <View style={{ ...styles.body, height: "70vh" }}>
          {selectedContext !== "" && (
            <View style={styles.inputview}>
              <View
                style={{
                  ...styles.contextItem,
                  backgroundColor: "transparent",
                }}
              >
                <ImageBackground
                  source={pdf_img}
                  resizeMode="contain"
                  style={styles.context_avatar}
                />
                <View style={styles.infoGroup}>
                  <Text style={styles.contextName}>
                    {contextlist[selectedContext].name}
                  </Text>
                  <Text style={styles.createdAt}>
                    {format(
                      new Date(contextlist[selectedContext].createdAt),
                      "dd/MM/yy"
                    )}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.othertouch,
                    right: "10px",
                    top: "calc(50% - 2vh)",
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Image
                    source={modalExit_img}
                    style={{ width: "4vh", height: "4vh" }}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: "1px",
                  width: "100%",
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <TouchableOpacity style={styles.accountItem}>
                  <Image
                    source={UserAcount_img}
                    style={styles.account_avatar}
                  />
                  <Text style={styles.accountName}>Sandy Wilder Cheng</Text>
                </TouchableOpacity>
              </ScrollView>
              <ScrollView
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: "1px",
                  width: "100%",
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <TouchableOpacity style={styles.accountItem}>
                  <Image
                    source={UserAcount_img}
                    style={styles.account_avatar}
                  />
                  <Text style={styles.accountName}>Airdrop</Text>
                </TouchableOpacity>
              </ScrollView>
              <View style={styles.actiongroup}>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Edit_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Copy_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Logout_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Move</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Delete_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  contextItem: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1.2vh",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    marginBottom: "1vh",
  },
  context_avatar: {
    width: "5vh",
    height: "5vh",
    borderRadius: "5px",
  },
  infoGroup: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "left",
    marginLeft: "1vh",
  },
  titleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  contextName: {
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
  othertouch: {
    position: "absolute",
    height: "2vh",
    right: "10px",
    top: "calc(50% - 0.4vh)",
  },
  other_img: {
    width: "3vh",
    height: "0.7vh",
  },

  sortbygroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "2vh",
  },
  showtypeview: {
    flexDirection: "row",
  },
  arrowDown: {
    width: "3vh",
    height: "3vh",
  },
  sortby: {
    alignItems: "center",
    display: "flex",
  },
  showtypetouch: {},
  showtype: {
    width: "5vh",
    height: "5vh",
  },
  gcontextItem: {
    padding: "1vh",
    alignItems: "center",
    backgroundColor: "#F4F6FA",
    borderRadius: "5px",
    margin: "0.5vh",
    width: "15vh",
    height: "15vh",
    justifyContent: "space-around",
  },
  touchgroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gfavtouch: {},
  fav_img: {
    width: "2vh",
    height: "2vh",
  },
  gothertouch: {},
  gother_img: {
    width: "2.5vh",
    height: "0.6vh",
  },
  gcontext_avatar: {
    width: "7vh",
    height: "7vh",
  },
  ginfoGroup: {
    justifyContent: "center",
  },
  gcontextName: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
  },

  modalstyle: {
    justifyContent: "flex-end",
    margin: 0,
    alignItems: "center",
  },
  modalLogo_img: {
    width: "12vh",
    height: "12vh",
  },
  modalTitle: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
  },
  modalContent: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.2vh",
  },
  modalExit_img: {
    width: "3vh",
    height: "3vh",
  },
  accountItem: {
    width: "10vh",
    height: "15vh",
    marginRight: "2vh",
    marginTop: "1vh",
  },
  accountName: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.8vh",
  },
  account_avatar: {
    width: "10vh",
    height: "10vh",
  },
  actiongroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  actionItem: {
    backgroundColor: "#F8F8F8",
    width: "12vh",
    height: "10vh",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    padding: "1vh",
    margin: "1vh",
  },
  action_img: {
    width: "2vh",
    height: "2vh",
  },
  actiontitle: {
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2.5vh",
  },
});

export default ContextList;
