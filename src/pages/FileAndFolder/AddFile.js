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
import useFileDialog from "use-file-dialog";
import { useDispatch, useSelector } from "react-redux";

import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";

import Upload_img from "../../assets/img/upload.png";
import Addlink_img from "../../assets/img/addlink.svg";
import ModalLogo_img from "../../assets/img/modalLogo.png";
import ModalBackground_img from "../../assets/img/modalBackground.png";
import user_img from "../../assets/img/user-Image.png";
import Checked_img from "../../assets/img/checked.svg";

import { createFile } from "../../redux/actions/fileFolder.action";
import { getContact } from "../../redux/actions/contact.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { IMG_URL } from "../../config/index";

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

const AddFile = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isResultModalVisible, setResultModalVisible] = useState(false);
  const [subjectlist, setSubjectlist] = useState([]);
  const { files, openFileDialog } = useFileDialog();
  const authinfo = useSelector((state) => state.authState);
  const contactlist = useSelector((state) => state.contactState.contactlist);

  const dispatch = useDispatch();

  const [filename, setFilename] = useState("");
  const [link, setLink] = useState([]);
  const [access, setAccess] = useState("");

  useEffect(() => {
    if (files !== null) {
      setFilename(files[0].name);
    }
  }, [files]);
  
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

  const addFile = () => () => {
    // setResultModalVisible(true);
    // props.navigation.navigate("files");

    let formData = new FormData();
    if (files) formData.append("file", files[0]);
    formData.append("creator", authinfo.currentUser.email);
    formData.append("file_name", filename);
    formData.append("link_up_with_subject", JSON.stringify(link));
    formData.append("file_access", access);

    dispatch(
      createFile(
        { formData, creator: authinfo.currentUser.email },
        setResultModalVisible
      )
    );
  };

  const addContactlink = () => () => {
    let subjecttemplist = [];
    subjectlist.map((item, i) => {
      if (item.checked == true) subjecttemplist.push(item._id);
    });

    setLink(subjecttemplist);
    setModalVisible(false);
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
            <Text style={styles.title}>Add Files/Reports</Text>
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
              <Text style={styles.personalInfo}>File Information</Text>
              <CustomInput
                type={false}
                hideIcon={true}
                title={"File Name"}
                content={"Ashley Kevib"}
                disabled={true}
                value={filename}
              />
              <CustomInput
                type={false}
                hideIcon={true}
                title={"Link up with Subjects"}
                content={"Select subject for link"}
                disabled={true}
                value={link.length == 0 ? "" : JSON.stringify(link)}
              >
                <TouchableOpacity
                  style={styles.addLink_touch}
                  onPress={() => setModalVisible(true)}
                >
                  <Image source={Addlink_img} style={styles.addLink_img} />
                </TouchableOpacity>
              </CustomInput>
              <CustomInput
                type={false}
                hideIcon={true}
                title={"File Access"}
                content={"Select subject for given access"}
                onChangeText={setAccess}
                value={access}
              >
                <TouchableOpacity style={styles.addLink_touch}>
                  <Image source={Addlink_img} style={styles.addLink_img} />
                </TouchableOpacity>
              </CustomInput>

              <TouchableOpacity
                style={styles.uploadView}
                onPress={openFileDialog}
              >
                <Image source={Upload_img} style={styles.upload_img} />
                <Text style={styles.uploadText}>
                  Upload file from your device{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Add"}
              onPress={addFile()}
              disabled={filename == "" ? true : false}
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
              text={"Add"}
              onPress={addContactlink()}
            />
          </View>
        </Modal>

        <Modal
          isVisible={isResultModalVisible}
          onBackdropPress={() => {
            props.navigation.navigate("files");
            setResultModalVisible(false);
          }}
          style={styles.resultmodalstyle}
        >
          <ImageBackground
            source={ModalBackground_img}
            style={styles.resultmodalBackground}
          >
            <Image source={ModalLogo_img} style={styles.resultmodalLogo_img} />
            <Text style={styles.resultmodalTitle}>File Uploaded</Text>
            <Text style={styles.resultmodalContent}>
              Your file has been uploaded successfully
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
    marginTop: "3vh",
    marginBottom: "3vh",
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
    alignItems: 'center'
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

export default AddFile;
