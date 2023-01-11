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

import CustomBtn from "../../components/CustomBtn";
import { useToast } from "react-native-toast-notifications";

import Exit_img from "../../assets/img/exit.svg";
import user_img from "../../assets/img/user-Image.png";
import Checked_img from "../../assets/img/checked.svg";

import { saveRelative } from "../../redux/actions/contact.action";
import { IMG_URL } from "../../config";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RelativeSubjects = (props) => {
  const [photo, setPhoto] = useState("user-Image.png");
  const [isModalVisible, setModalVisible] = useState(false);

  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const [subjectlist, setSubjectlist] = useState(
    props.contactlist.map((item) => ({
      ...item,
      checked: props.relList.indexOf(item._id) < 0 ? false : true,
    }))
  );

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
          <View style={styles.header}>
            <Text style={styles.title}>
              Subjects (a contact) or a top level subject like Bills can be
              Related to sub subjects.
            </Text>
            <TouchableOpacity
              style={styles.skiplink}
              onPress={() => props.relativemodalclose(false)}
            >
              <Text>
                <Image source={Exit_img} style={styles.Exit_img} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.inputview}>
              <Text style={styles.subjectListTitle}>
                Relate with other Subjects
              </Text>
              <ScrollView style={{ marginBottom: "2vh", marginTop: "2vh" }}>
                {subjectlist.map((item, i) => (
                  <RenderSubjects item={item} index={i} key={i} />
                ))}
              </ScrollView>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Save"}
              onPress={props.addcontact(
                subjectlist.filter((item) => item.checked == true)
              )}
            />
          </View>
        </View>
        {/* <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.modalstyle}
        >
          <ImageBackground
            source={ModalBackground_img}
            style={styles.modalBackground}
          >
            <Image source={ModalLogo_img} style={styles.modalLogo_img} />
            <Text style={styles.modalTitle}>Save successful!</Text>
            <Text style={styles.modalContent}>Save subject</Text>
          </ImageBackground>
        </Modal> */}
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
    width: "85%",
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
    height: "82.2vh",
  },
  subjectTop: {
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-around",
  },
  topleftgroup: {
    width: "min-content",
  },
  photogroup: {
    position: "relative",
    marginTop: "3vh",
    marginBottom: "1vh",
    textAlign: "center",
  },
  photo_img: {
    width: "20vh",
    height: "20vh",
  },
  camera_img: {
    width: "5vh",
    height: "5vh",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  uploadNotice: {
    color: "rgba(45, 52, 66, 0.5)",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
  },
  inputview: {
    width: "90%",
    marginTop: "1.5vh",
    height: "70vh",
  },
  skiplink: {
    color: "white",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    position: "absolute",
    right: "30px",
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
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  modalBackground: {
    width: "37vh",
    height: "32vh",
    alignItems: "center",
    padding: "2vh",
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
});

export default RelativeSubjects;
