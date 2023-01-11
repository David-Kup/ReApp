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
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";

import Addlink_img from "../../assets/img/addlink.svg";
import FolderPath_img from "../../assets/img/Folder_path.svg";

import ModalLogo_img from "../../assets/img/modalLogo.png";
import ModalBackground_img from "../../assets/img/modalBackground.png";
import user_img from "../../assets/img/user-Image.png";

import Folder1_img from "../../assets/img/folder(1).png";
import Folder2_img from "../../assets/img/folder(2).png";
import Folder3_img from "../../assets/img/folder(3).png";
import Folder4_img from "../../assets/img/folder(4).png";
import Folder5_img from "../../assets/img/folder(5).png";
import Folder6_img from "../../assets/img/folder(6).png";

import Checked_img from "../../assets/img/checked.svg";
import Selected_img from "../../assets/img/selected.png";
import { IMG_URL } from "../../config";

import {
  createFolder,
  getFolderList,
  getAllFolders,
} from "../../redux/actions/fileFolder.action";

import { getContact } from "../../redux/actions/contact.action";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    _id: "1",
    avatar: "user-Image.png",
    name: "Ashley K.",
    checked: false,
  },
  {
    _id: "2",
    avatar: "user-Image.png",
    name: "Ashley K.",
    checked: false,
  },
  {
    _id: "3",
    avatar: "user-Image.png",
    name: "Ashley K.",
    checked: false,
  },
];

const foldericonlist = [
  {
    id: 1,
    name: "folder(1).png",
    icon: Folder1_img,
    selected: true,
  },
  {
    id: 2,
    name: "folder(2).png",
    icon: Folder2_img,
    selected: false,
  },
  {
    id: 3,
    name: "folder(3).png",
    icon: Folder3_img,
    selected: false,
  },
  {
    id: 4,
    name: "folder(4).png",
    icon: Folder4_img,
    selected: false,
  },
  {
    id: 5,
    name: "folder(5).png",
    icon: Folder5_img,
    selected: false,
  },
  {
    id: 6,
    name: "folder(6).png",
    icon: Folder6_img,
    selected: false,
  },
];

const AddFolder = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResultModalVisible, setResultModalVisible] = useState(false);
  const [isPathModalVisible, setPathModalVisible] = useState(false);
  const [subjectlist, setSubjectlist] = useState([]);

  const [folderlist, setFolderlist] = useState(foldericonlist);

  const authinfo = useSelector((state) => state.authState);
  const allfolderlist = useSelector(
    (state) => state.fileFolderState.allfolderlist
  );
  const contactlist = useSelector((state) => state.contactState.contactlist);
  const folderPath = useSelector((state) => state.fileFolderState.folderPath);

  const dispatch = useDispatch();

  const [foldername, setFoldername] = useState("");
  const [link, setLink] = useState("");
  const [fPath, setFPath] = useState("");

  useEffect(() => {
    dispatch(getFolderList({ creator: authinfo.currentUser.email }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContact({ owner: authinfo.currentUser.email }));
  }, []);

  useEffect(() => {
    setSubjectlist(
      contactlist.map((item) => ({
        ...item,
        checked: false,
      }))
    );
  }, [contactlist]);

  const selectDirectory = () => {
    // selectDirectory();
  };

  const addFolder = () => () => {
    // setResultModalVisible(true);
    // props.navigation.navigate("files");
    dispatch(
      createFolder(
        {
          creator: authinfo.currentUser.email,
          folder_name: foldername,
          folder_path: fPath,
          link_up_with_subject: link,
          folder_icon: folderlist.filter((item) => item.selected == true)[0]
            .name,
        },
        setResultModalVisible
      )
    );
  };

  const selectPath = () => {
    setPathModalVisible(true);
  };

  const addContactlink = () => () => {
    let subjecttemplist = [];
    subjectlist.map((item, i) => {
      if (item.checked == true) subjecttemplist.push(item._id);
    });

    setLink(subjecttemplist);
    setModalVisible(false);
  };

  const folderSelect = (index) => () => {
    setFolderlist(
      foldericonlist.map((item, i) => ({
        ...item,
        selected: i == index ? true : false,
      }))
    );
  };

  const onPressFolderPath = (selectedPath) => ()=> {
    setFPath(selectedPath);
    setPathModalVisible(false);
  }

  const RenderFolderPaths = ({ item, index }) => {
    const [localitem, setLocalItem] = useState(item);

    useEffect(() => {
      setLocalItem(item);
    }, [item]);

    return (
      <View style={{ width: "100%", height: "max-content" }}>
        <TouchableOpacity onPress={onPressFolderPath(localitem.folder_path+ (localitem.folder_path == '/' ? "" : '/') + localitem.folder_name)} style={styles.w_100}>
          <View style={styles.subjectView}>
            <ImageBackground
              source={require("../../assets/img/" + localitem.folder_icon)
              }
              resizeMode="contain"
              style={styles.subject_avatar}
            />
            <Text style={styles.subjectName}>{localitem.folder_path+ (localitem.folder_path == '/' ? "" : '/') + localitem.folder_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const onPressSubject = (index) => () => {
    let tempArr = subjectlist.slice();
    tempArr[index].checked = !tempArr[index].checked;
    setSubjectlist(tempArr);
  };

  const RenderSubjects = ({ item, index }) => {
    const [localitem, setLocalItem] = useState(item);

    useEffect(() => {
      setLocalItem(item);
    }, [item]);

    return (
      <View style={{ width: "100%", height: "max-content" }}>
        <TouchableOpacity onPress={onPressSubject(index)} style={styles.w_100}>
          <View style={styles.subjectView}>
            <ImageBackground
              source={
                localitem.image == "" ? user_img : IMG_URL + localitem.image
              }
              resizeMode="contain"
              style={styles.subject_avatar}
            />
            <Text style={styles.subjectName}>{localitem.name}</Text>
            {localitem.checked && (
              <Image source={Checked_img} style={styles.checked_img} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          {/* <View style={styles.header}>
            <Text style={styles.title}>Create New Folder</Text>
            <TouchableOpacity
              style={styles.skiplink}
              onPress={() => props.navigation.navigate("files")}
            >
              <Text>
                <Image source={Exit_img} style={styles.Exit_img} />
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.body}>
            <View style={styles.inputview}>
              <Text style={styles.personalInfo}>Folder Information</Text>
              <CustomInput
                type={false}
                hideIcon={true}
                title={"Folder Name"}
                content={"Ashley Kevib"}
                onChangeText={setFoldername}
                value={foldername}
              />
              <CustomInput
                type={false}
                hideIcon={true}
                title={"Folder Path"}
                content={"Select folder path"}
                value={fPath}
                disabled={true}
              >
                <TouchableOpacity
                  style={styles.addLink_touch}
                  onPress={() => selectPath()}
                >
                  <Image source={FolderPath_img} style={styles.addLink_img} />
                </TouchableOpacity>
              </CustomInput>
              <CustomInput
                type={false}
                hideIcon={true}
                title={"Link up with Subjects"}
                content={"Select subject for given access"}
                value={link.length == 0 ? "" : JSON.stringify(link)}
                disabled={true}
              >
                <TouchableOpacity
                  style={styles.addLink_touch}
                  onPress={() => setModalVisible(true)}
                >
                  <Image source={Addlink_img} style={styles.addLink_img} />
                </TouchableOpacity>
              </CustomInput>
              <View>
                <Text style={styles.FolderIcontitle}>Folder Icon</Text>
                <View style={styles.FolderIconGroup}>
                  {folderlist.map((item, i) => (
                    <TouchableOpacity
                      style={styles.folderIconView}
                      onPress={folderSelect(i)}
                      key={i}
                    >
                      <Image source={item.icon} style={styles.folderIcon} />
                      {item.selected && (
                        <Image
                          source={Selected_img}
                          style={styles.folderIconselected}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Add"}
              onPress={addFolder()}
              disabled={foldername == "" || fPath == ""}
            />
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modalstyle}
        >
          <View style={styles.body}>
            <View style={styles.inputview}>
              <Text style={styles.subjectListTitle}>Link up with Subjects</Text>
              <ScrollView style={{ marginBottom: "2vh", marginTop: "2vh" }}>
                {subjectlist.length>0 && subjectlist.map((item, i) => (
                  <RenderSubjects item={item} index={i} key={i} />
                ))}
              </ScrollView>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Create"}
              onPress={addContactlink()}
            />
          </View>
        </Modal>

        <Modal
          isVisible={isPathModalVisible}
          onBackdropPress={() => setPathModalVisible(false)}
          style={styles.modalstyle}
        >
          <View style={styles.body}>
            <View style={styles.inputview}>
              <Text style={styles.subjectListTitle}>Select Folder Path</Text>
              <ScrollView style={{ marginBottom: "2vh", marginTop: "2vh" }}>
                <View style={{ width: "100%", height: "max-content" }}>
                  <TouchableOpacity onPress={onPressFolderPath('/')} style={styles.w_100}>
                    <View style={styles.subjectView}>
                      <ImageBackground
                        source={Folder1_img}
                        resizeMode="contain"
                        style={styles.subject_avatar}
                      />
                      <Text style={styles.subjectName}>{'/'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {allfolderlist.length>0 && allfolderlist.map((item, i) => (
                  <RenderFolderPaths item={item} index={i} key={i} />
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={isResultModalVisible}
          onBackdropPress={() => {
            props.navigation.navigate("folders");
            setResultModalVisible(false);
            setFoldername("");
            setLink([]);
            setFPath("");
            dispatch(getAllFolders({
              creator: authinfo.currentUser.email,
              folderPath: folderPath,
            }))
          }}
          style={styles.resultmodalstyle}
        >
          <ImageBackground
            source={ModalBackground_img}
            style={styles.resultmodalBackground}
          >
            <Image source={ModalLogo_img} style={styles.resultmodalLogo_img} />
            <Text style={styles.resultmodalTitle}>Folder Created</Text>
            <Text style={styles.resultmodalContent}>
              Your Folder has been created successfully
            </Text>
          </ImageBackground>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  w_100: {
    width: "101%",
  },
  homebg: {
    width: windowWidth,
    // height: windowHeight,
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
    height: "5vh",
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
    height: "87vh",
    position: "relative",
    marginTop: "2vh",
  },
  inputview: {
    height: "72vh",
    width: "90%",
    marginTop: "1.5vh",
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    opacity: "0.5",
    position: "absolute",
    right: "30px",
  },
  personalInfo: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
    textAlign: "left",
    marginBottom: "1vh",
  },
  uploadView: {
    alignItems: "center",
    width: "100%",
    borderStyle: "dashed",
    borderColor: "#FA7254",
    borderRadius: "10px",
    borderWidth: "1px",
    height: "14vh",
    justifyContent: "center",
  },
  uploadText: {
    color: "#FA7254",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
  },
  upload_img: {
    width: "6vh",
    height: "6vh",
    margin: "0.5vh",
  },
  cvvExpire: {
    textAlign: "left",
    flexDirection: "row",
  },
  birthtitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "32px",
    marginBottom: "1vh",
  },
  ortextView: {
    textAlign: "center",
    width: "100%",
    margin: "3vh",
  },
  addLink_touch: {
    position: "absolute",
    top: "calc(50% - 1.5vh)",
    right: "10px",
  },
  addLink_img: {
    width: "3vh",
    height: "3vh",
  },
  FolderIcontitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
    textAlign: "left",
  },
  FolderIconGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  folderIconView: {
    width: "30%",
    alignItems: "center",
    padding: "1vh",
  },
  folderIcon: {
    width: "5vh",
    height: "5vh",
  },
  folderIconselected: {
    position: "absolute",
    width: "3vh",
    height: "3vh",
    bottom: 0,
    left: "calc(50% - 1.5vh)",
  },

  subjectListTitle: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17px",
    borderBottomColor: "#8080802e",
    borderBottomWidth: "1px",
    paddingBottom: "2vh",
    width: "80%",
    margin: "auto",
  },
  subjectView: {
    flexDirection: "row",
    height: "9vh",
    alignItems: "center",
    borderBottomColor: "#8080802e",
    borderBottomWidth: "1px",
  },
  subject_avatar: {
    width: "5vh",
    height: "5vh",
  },
  subjectName: {
    marginLeft: "2vh",
  },
  checked_img: {
    width: "2vh",
    height: "1vh",
    position: "absolute",
    right: "2vh",
  },
  modalstyle: {
    justifyContent: "flex-end",
    margin: 0,
    alignItems: 'center',
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
    fontSize: "21px",
  },
  modalContent: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
  },

  resultmodalstyle: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  resultmodalBackground: {
    width: "37vh",
    height: "32vh",
    alignItems: "center",
    padding: "2vh",
  },
  resultmodalLogo_img: {
    width: "12vh",
    height: "12vh",
  },
  resultmodalTitle: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
  },
  resultmodalContent: {
    color: "#9699a0",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "13px",
  },
});

export default AddFolder;
