import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";
import { format } from "date-fns";
import Modal from "react-native-modal";
import { useIsFocused } from '@react-navigation/native'

import Folder1_img from "../../assets/img/folder(1).png";

import arrowDown_img from "../../assets/img/arrow_down2.svg";

import threedot_img from "../../assets/img/threedot.svg";

import listtype_img from "../../assets/img/listtype.svg";
import grouptype_img from "../../assets/img/grouptype.svg";
import listtypeSelected_img from "../../assets/img/listtypeSelected.svg";
import grouptypeSelected_img from "../../assets/img/grouptypeSelected.svg";

import star_full_img from "../../assets/img/favstar_full.png";
import star_empty_img from "../../assets/img/favstar_empty.png";

import Edit_img from "../../assets/img/Edit.svg";
import Copy_img from "../../assets/img/Copy.svg";
import Logout_img from "../../assets/img/Logout_grey.svg";
import Delete_img from "../../assets/img/Delete.svg";

import CustomSearchInput from "../../components/CustomSearchInput";
import FooterMenu from "../../components/FooterMenu";
import {
  getAllFolders,
  setFolderPath,
} from "../../redux/actions/fileFolder.action";
import { IMG_URL } from "../../config";
import { getIcon } from "../../utils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Folders = (props) => {
  const [photo, setPhoto] = useState("user-Image.png");
  const authinfo = useSelector((state) => state.authState);
  const folderlist = useSelector((state) => state.fileFolderState.folderlist);
  const folderfilelist = useSelector(
    (state) => state.fileFolderState.folderfilelist
  );
  const folderPath = useSelector((state) => state.fileFolderState.folderPath);
  const contactinfo = useSelector((state) => state.contactState);
  const toast = useToast();
  const [serach, setSearch] = useState("");
  const [turnonMike, setMike] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [listType, setListType] = useState(true);
  const [contextlist, setContextlist] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedContext, setSelectedContext] = useState("");

  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const isFocused = useIsFocused()

  const handleMike = (e) => {
    setMike(true);
  };

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
      getAllFolders({
        creator: authinfo.currentUser.email,
        folderPath: folderPath,
      })
    );
  }, [authinfo.currentUser, folderPath, isFocused]);

  useEffect(() => {
    setContextlist(folderfilelist);
  }, [folderfilelist]);

  const setfav = (index) => () => {
    setContextlist(
      contextlist.map((item, i) => ({
        ...item,
        fav: i == index ? !item.fav : item.fav,
      }))
    );
  };

  const changeSearch = (val) => {
    setSearch(val);
  };

  const control = (index) => () => {
    setSelectedContext(index);
    setModalVisible(true);
  };

  const onClickFolder = (index) => () => {
    dispatch(
      setFolderPath(
        folderlist[index].folder_path == "/"
          ? folderlist[index].folder_path + folderlist[index].folder_name
          : folderlist[index].folder_path + "/" + folderlist[index].folder_name
      )
    );
  };

  const onClickPrevious = () => {
    let previouspath = folderPath.substr(
      0,
      folderPath.length - folderPath.split("/").pop().length - 1
    );
    dispatch(setFolderPath(previouspath == "" ? "/" : previouspath));
  };

  const RenderEmailbylist = ({ item, index }) => {
    return (
      <View style={styles.contextItem}>
        <TouchableOpacity onPress={onClickFolder(index)}>
          <ImageBackground
            source={require("../../assets/img/" + item.folder_icon)}
            resizeMode="contain"
            style={styles.context_avatar}
          />
        </TouchableOpacity>
        <View style={styles.infoGroup}>
          <Text style={styles.contextName}>{item.folder_name}</Text>
          <Text style={styles.createdAt}>{item.count + " Files"}</Text>
          <Text style={styles.createdAt}>{"Shared with"}</Text>
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
        <TouchableOpacity onPress={onClickFolder(index)}>
          <ImageBackground
            source={require("../../assets/img/" + item.folder_icon)}
            resizeMode="contain"
            style={styles.gcontext_avatar}
          />
        </TouchableOpacity>
        <View style={styles.ginfoGroup}>
          <Text style={styles.gcontextName}>{item.folder_name}</Text>
          <Text style={styles.gcontextName}>{item.count + " Files"}</Text>
          <Text style={styles.gcontextName}>{"Shared with"}</Text>
        </View>
        <View style={styles.touchgroup}>
          <TouchableOpacity style={styles.gothertouch} onPress={control(index)}>
            <Image source={threedot_img} style={styles.gother_img} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderFilebylist = ({ item, index }) => {
    return (
      <View style={styles.contextItem} key={index}>
        <ImageBackground
          source={getIcon(item.file_name)}
          resizeMode="contain"
          style={styles.context_avatar}
        />
        <View style={styles.infoGroup}>
          <Text style={styles.contextName}>{item.file_name}</Text>
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

  const RenderFilebygroup = ({ item, index }) => {
    return (
      <View style={styles.gcontextItem} key={index}>
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
          source={getIcon(item.file_name)}
          resizeMode="contain"
          style={styles.gcontext_avatar}
        />
        <View style={styles.ginfoGroup}>
          <Text style={styles.gcontextName}>{item.file_name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.header}>
          {/* <Text style={styles.title}>Folders</Text> */}
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
            {
              folderPath == '/' && contextlist.length == 0 ? 
              <ScrollView
                style={styles.contextView}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingBottom: "20vh",
                }}
              >
                <Text style={styles.description_text}>
                  Things that matter the most to you.
                  Emails, Folders, Files, Messages and history of interations with that subject.
                  Click the + below and add a subject to Recite.
                  This could be a a single contact, a group of contacts like your team, bills (Rent,Heat,Elec)
                </Text>
              </ScrollView>
              :
              <ScrollView
                style={styles.contextView}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingBottom: "20vh",
                }}
              >
                {folderPath !== "/" ? (
                  listType ? (
                    <View style={styles.contextItem}>
                      <TouchableOpacity onPress={onClickPrevious}>
                        <ImageBackground
                          source={Folder1_img}
                          resizeMode="contain"
                          style={styles.context_avatar}
                        />
                      </TouchableOpacity>
                      <View style={styles.infoGroup}>
                        <Text style={styles.contextName}>{"..."}</Text>
                        <Text style={styles.createdAt}>{"..."}</Text>
                        <Text style={styles.createdAt}>{"..."}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.gcontextItem}>
                      <TouchableOpacity onPress={onClickPrevious}>
                        <ImageBackground
                          source={Folder1_img}
                          resizeMode="contain"
                          style={styles.gcontext_avatar}
                        />
                      </TouchableOpacity>
                      <View style={styles.ginfoGroup}>
                        <Text style={styles.gcontextName}>{"..."}</Text>
                        <Text style={styles.gcontextName}>{"..."}</Text>
                        <Text style={styles.gcontextName}>{"..."}</Text>
                      </View>
                    </View>
                  )
                ) : (
                  ""
                )}
                {folderlist.length > 0 &&
                  folderlist.map((item, index) =>
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
                {contextlist.length > 0 &&
                  contextlist.map((item, index) =>
                    listType ? (
                      <RenderFilebylist item={item} index={index} key={index} />
                    ) : (
                      <RenderFilebygroup item={item} index={index} key={index} />
                    )
                  )}
              </ScrollView>
            }
          </View>
        </View>
      </View>
      {openModal && <View style={styles.modalBackground}></View>}
      <FooterMenu
        opensubmodal={openModal}
        OpenModalfuc={setOpenModal}
        navigation={props.navigation}
        selected={4}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalstyle}
      >
        <View style={{ ...styles.body, height: "30vh" }}>
          {selectedContext !== "" && (
            <View style={styles.inputview}>
              <View style={styles.actiongroup}>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Delete_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Copy_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>Move</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Edit_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Image source={Logout_img} style={styles.action_img} />
                  <Text style={styles.actiontitle}>share</Text>
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
    paddingTop: "2vh",
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    textAlign: "left",
    marginLeft: "1vh",
    width: "80%",
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
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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

  contextView: {
    width: "100%",
    height: "28vh",
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "12vh",
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

export default Folders;
