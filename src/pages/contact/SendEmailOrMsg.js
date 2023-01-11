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
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import useFileDialog from "use-file-dialog";
import { SelectList } from "react-native-dropdown-select-list";
import SocketIOFileUpload from 'socketio-file-upload';

import { isEmailValid } from "../../utils";
import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import { useToast } from "react-native-toast-notifications";
import Exit_img from "../../assets/img/exit.svg";
import ModalLogo_img from "../../assets/img/modalLogo.png";
import ModalBackground_img from "../../assets/img/modalBackground.png";

import {
  sendEmail,
  sendMessage,
  getContact,
  getAccount,
} from "../../redux/actions/contact.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const sendtype = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Email",
    value: "Email",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: true,
  },
  {
    id: "2",
    label: "Message",
    value: "Message",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: false,
  },
  {
    id: "3",
    label: "Post to Feed",
    value: "Post to Feed",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: false,
  },
];
import socket from "../../utils/socket";

const SendEmailOrMsg = (props) => {
  const [photo, setPhoto] = useState("user-Image.png");
  const dispatch = useDispatch();
  const toast = useToast();
  const [isModalVisible, setModalVisible] = useState(false);
  const { files, openFileDialog } = useFileDialog();
  const [selected, setSelected] = useState("");
  const authinfo = useSelector((state) => state.authState);
  const contactinfo = useSelector((state) => state.contactState);

  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  const [content, setContent] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(true);

  const [linklist, setLinklist] = useState([]);
  const [medialist, setMedialist] = useState([]);

  const [link, setLink] = useState("");
  const [addLinkModal, setAddLinkModal] = useState(false);

  const [emailList, setEmailList] = useState([]);

  const [sendVia, setSendVia] = useState(sendtype);

  useEffect(() => {
    dispatch(getAccount({ owner: authinfo.currentUser.email }, toast));
    socket.emit("connecting");
  }, []);

  // useEffect(() => {
  //   let elist = [];
  //   contactinfo.accountlist.map((item, i) => {
  //     elist.push({
  //       key: item.email,
  //       value: item.email,
  //     });
  //   });

  //   setEmailList(elist);
  // }, [contactinfo.accountlist]);

  useEffect(() => {
    setEmail(props.route.params !== undefined ? props.route.params.email : "");
    if (props.route.params !== undefined) {
      setSendVia(
        sendVia.map((item, i) => ({
          ...item,
          selected: item.value == props.route.params.type ? true : false,
        }))
      );
    }
  }, [props.route.params]);

  useEffect(() => {
    if (files !== null) {
      let temp = medialist.slice();
      for (let i = 0; i < files.length; i++) {
        temp.push(files[i]);
      }
      setMedialist(temp);
    }
  }, [files]);

  const addMedia = () => {
    openFileDialog();
  };

  const addLink = () => {
    if (link != "") {
      let temp = linklist.slice();
      temp.push(link);
      setLinklist(temp);
      setLink("");
      setAddLinkModal(false);
    }
  };

  const deleteLink = (index) => {
    let temp = linklist.slice();
    temp.splice(index, 1);
    setLinklist(temp);
  };

  const deleteMedia = (index) => {
    let temp = medialist.slice();
    temp.splice(index, 1);
    setMedialist(temp);
  };

  const sendNewMessage = () => () => {
    if (email === "" || content == "") {
      toast.show("Email and Content fields are required", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }

    let formData = new FormData();
    let filenamelist = []
    for (let i = 0; i < medialist.length; i++) {
      formData.append("file", medialist[i]);
      filenamelist.push(medialist[i]['name'])
    }
    formData.append("from", authinfo.currentUser.email);
    formData.append("name", authinfo.currentUser.name);
    formData.append("to", email);
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("link", JSON.stringify(linklist));
    
    if (sendVia[0].selected == true) {
      dispatch(sendEmail(formData, props.navigation, setModalVisible, toast));
    } else {
      // dispatch(sendMessage(formData, props.navigation, setModalVisible, toast));
      // console.log(filenamelist);
      socket.emit("newMessage", {
        medialist, 
        filenamelist, 
        from: authinfo.currentUser.email, 
        name: authinfo.currentUser.name, 
        to: email, subject, 
        content, 
        link: linklist
      });
      toast.show("Message sent", {
        duration: 5000,
        type: "success",
        placement: "bottom",
      });
    }
    setEmail("");
    setSubject("");
    setContent("");
    setLink("");
    setMedialist([]);
    setLinklist([]);
  };

  const handleEmail = (e) => {
    if (isEmailValid(e)) {
      setEmailvalid(true);
    } else {
      setEmailvalid(false);
    }
    setSelectedEmail(false);
    setEmail(e);
  };

  const selectEmail = (val) => {
    setEmailvalid(true);
    setEmail(val);
    setSelectedEmail(true);
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        {/* <View style={styles.header}>
            <Text style={styles.title}>Send a Message</Text>
            <TouchableOpacity
              style={styles.skiplink}
              onPress={() => props.navigation.navigate("contacts")}
            >
              <Text>
                <Image source={Exit_img} style={styles.Exit_img} />
              </Text>
            </TouchableOpacity>
          </View> */}
        <View style={styles.body}>
          <View style={styles.inputview}>
            <ScrollView
              style={{ height: "70vh" }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.toView}>
                <Text style={styles.toTitle}>Send Via:</Text>
                <RadioGroup
                  radioButtons={sendVia}
                  onPress={setSendVia}
                  layout="row"
                  containerStyle={{ justifyContent: "space-around" }}
                />
              </View>
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Subject:"}
                onChangeText={setSubject}
                value={subject}
              />
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"To:"}
                wrongmsg={"Email valid failed"}
                valid={emailvalid}
                onChangeText={handleEmail}
                value={email}
              >
                {((email !== "" &&
                  contactinfo.accountlist.filter(
                    (item) => item.email.indexOf(email) != -1
                  ).length != -1 &&
                  !selectedEmail) ||
                  email !== "") &&
                  !selectedEmail &&
                  contactinfo.accountlist.filter(
                    (item) => item.email.indexOf(email) != -1
                  ).length > 0 && (
                    <ScrollView style={styles.emailList}>
                      {contactinfo.accountlist
                        .filter((item) => item.email.indexOf(email) != -1)
                        .map((val, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => selectEmail(val.email)}
                            style={{
                              borderBottomWidth: "1px",
                              width: "100%",
                              height: "5vh",
                              justifyContent: "center",
                              paddingLeft: "1vh",
                              paddingRight: "1vh",
                            }}
                          >
                            <Text style={{ fontSize: "2vh" }}>{val.email}</Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  )}
              </CustomInput>
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Message:"}
                content={"Write ..."}
                multiline={true}
                onChangeText={setContent}
                value={content}
              />
              <View>
                <TouchableOpacity onPress={() => addMedia()}>
                  <Text style={styles.linktitle}>+ Media</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {medialist.map((item, i) => (
                    <View
                      style={{
                        flexDirection: "row",
                        margin: "1vh",
                        alignItems: "center",
                        backgroundColor: "#2D3442",
                        color: "white",
                        padding: "1vh",
                        borderColor: "#2D3442",
                        borderWidth: "1px",
                        borderRadius: "5px",
                      }}
                      key={i}
                    >
                      <Text style={{ fontSize: "2vh", color: "white" }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => deleteMedia(i)}>
                        <Image
                          source={Exit_img}
                          style={{ width: "2vh", height: "2vh" }}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={() => setAddLinkModal(true)}>
                  <Text style={styles.linktitle}>+ Links</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {linklist.map((item, i) => (
                    <View
                      style={{
                        flexDirection: "row",
                        margin: "1vh",
                        alignItems: "center",
                        backgroundColor: "#2D3442",
                        color: "white",
                        padding: "1vh",
                        borderColor: "#2D3442",
                        borderWidth: "1px",
                        borderRadius: "5px",
                      }}
                      key={i}
                    >
                      <Text style={{ fontSize: "2vh", color: "white" }}>
                        {item}
                      </Text>
                      <TouchableOpacity onPress={() => deleteLink(i)}>
                        <Image
                          source={Exit_img}
                          style={{ width: "2vh", height: "2vh" }}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
          <CustomBtn
            type={"bright"}
            text={"Send Message"}
            disabled={email === "" || content == ""}
            onPress={sendNewMessage()}
          />
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalstyle}
      >
        <ImageBackground
          source={ModalBackground_img}
          style={styles.modalBackground}
        >
          <Image source={ModalLogo_img} style={styles.modalLogo_img} />
          <Text style={styles.modalTitle}>Message send successful!</Text>
          <Text style={styles.modalContent}>You have sent Message</Text>
        </ImageBackground>
      </Modal>

      <Modal
        isVisible={addLinkModal}
        onBackdropPress={() => setAddLinkModal(false)}
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
            <TextInput
              style={{
                fontSize: "2vh",
                padding: "1vh",
                width: "80%",
                backgroundColor: "white",
                borderWidth: "1px",
                borderColor: "grey",
                height: "5vh",
              }}
              value={link}
              onChangeText={setLink}
              placeholder="Link Url"
            />
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
              onPress={() => addLink()}
            >
              <Text style={{ fontWeight: "400", fontSize: "2vh" }}>
                Add link
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
                style={{ fontWeight: "400", fontSize: "2vh", color: "red" }}
                onPress={() => setAddLinkModal(false)}
              >
                Cancel
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
    position: "relative",
    marginTop: "2vh",
    height: "87.2vh",
  },
  subjectTop: {
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-around",
  },
  topleftgroup: {
    width: "min-content",
  },
  toView: {
    marginBottom: "2vh",
  },
  toTitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
    textAlign: "left",
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
  linktitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
    textAlign: "left",
  },
  linkview: {
    flexDirection: "row",
    margin: "0.5vh",
  },
  linkimgview: {
    backgroundColor: "white",
    borderRadius: "100%",
    padding: "10px",
  },
  link_img: {
    width: "10px",
    height: "10px",
  },
  urlInput: {
    width: "80%",
    height: "4vh",
    borderRadius: "10px",
    paddingLeft: "10px",
    backgroundColor: "white",
  },
  emailList: {
    backgroundColor: "white",
    width: "100%",
    maxHeight: "15vh",
    marginTop: "1vh",
    borderWidth: "1px",
    borderColor: "grey",
    borderRadius: "10px",
  },
});

export default SendEmailOrMsg;
