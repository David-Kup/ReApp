import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Picker,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ShadowPropTypesIOS,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
import useFileDialog from "use-file-dialog";
import { SelectList } from "react-native-dropdown-select-list";

import { isEmailValid, isPhoneValid } from "../../utils";
import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import { useToast } from "react-native-toast-notifications";
import RelativeSubjects from "./RelativeSubjects";

import user_img from "../../assets/img/user-Image.png";
import Camera_img from "../../assets/img/camera.png";
import Exit_img from "../../assets/img/exit.svg";
import ModalLogo_img from "../../assets/img/modalLogo.png";
import ModalBackground_img from "../../assets/img/modalBackground.png";

import Follow_img from "../../assets/img/icon/Follow.png";
import Focus_img from "../../assets/img/icon/Focus.png";

import Personal_img from "../../assets/img/icon/Personal.png";
import Business_img from "../../assets/img/icon/Business.png";

import Share_img from "../../assets/img/icon/social-media 1.png";
import Contact_img from "../../assets/img/icon/contact.png";


import Linkedin_img from "../../assets/img/linkedin.png";
import Facebook_img from "../../assets/img/facebook.png";
import Instagram_img from "../../assets/img/instagram.png";

import {
  createContact,
  getContact,
  updateContact,
} from "../../redux/actions/contact.action";

import { IMG_URL } from "../../config";
import DeviceContact from "./DeviceContact";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FocusOrFollow = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: (
      <View style={{ alignItems: "center", width: '5vh' }}>
        <ImageBackground resizeMode="contain" source={Focus_img} style={{ width: "5vh", height: "5vh" }} />
        <Text>Focus</Text>
      </View>
    ),
    value: "Focus",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: true,
  },
  {
    id: "2",
    label: (
      <View style={{ alignItems: "center", width: '5vh' }}>
        <ImageBackground resizeMode="contain" source={Follow_img} style={{ width: "5vh", height: "5vh" }} />
        <Text>Follow</Text>
      </View>
    ),
    value: "Following",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: false,
  },
];

const categoryList = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: (
      <View style={{ alignItems: "center", width: '5vh' }}>
        <ImageBackground resizeMode="contain" source={Personal_img} style={{ width: "5vh", height: "5vh" }} />
        <Text>Personal Subject</Text>
      </View>
    ),
    value: "Personal",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: true,
  },
  {
    id: "2",
    label: (
      <View style={{ alignItems: "center", width: '5vh' }}>
        <ImageBackground resizeMode="contain" source={Business_img} style={{ width: "5vh", height: "5vh" }} />
        <Text>Business Subject</Text>
      </View>
    ),
    value: "Business",
    color: "#FA7254",
    layout: "column",
    containerStyle: { flexFlow: "column-reverse" },
    labelStyle: { marginBottom: "5px", marginTop: "0px" },
    selected: false,
  },
];

const AddContact = (props) => {
  const [photo, setPhoto] = useState(user_img);
  const dispatch = useDispatch();
  const toast = useToast();
  const { files, openFileDialog } = useFileDialog();

  const [isModalVisible, setModalVisible] = useState(false);
  const [deviceContactModal, setDeviceContactModal] = useState(false);
  
  const authinfo = useSelector((state) => state.authState);
  const contactlist = useSelector((state) => state.contactState.contactlist);
  const [emailvalid, setEmailvalid] = useState([true]);
  const [phonevalid, setPhonevalid] = useState([true]);

  const [category, setCategory] = useState(categoryList);
  const [fof, setFoF] = useState(FocusOrFollow);
  const [share, setShare] = useState(false);
  const scrollRef = useRef();

  const [name, setName] = useState("");
  const [phoneList, setPhoneList] = useState([""]);
  const [emailList, setEmailList] = useState([""]);
  const [locationList, setLocationList] = useState([""]);
  const [Notes, setNotes] = useState("");
  const [linkList, setLinkList] = useState([{ social: "Linkedin", link: "" }]);

  const [socialList, setSocialList] = useState([
    {
      name: "Linkedin",
      image: Linkedin_img,
    },
    {
      name: "Facebook",
      image: Facebook_img,
    },
    {
      name: "Instagram",
      image: Instagram_img,
    },
  ]);

  const [relModal, setRelModal] = useState(false);
  const [selected, setSelected] = useState("");

  const [contactId, setContactId] = useState("");
  const [tocontact, setTo] = useState("");

  useEffect(() => {
    dispatch(getContact({ owner: authinfo.currentUser.email }));
    if (props.route.params != undefined) {
      setTo(props.route.params.cinfo);
    }
  }, [props.route.params]);

  useEffect(() => {
    if (tocontact !== "") {
      setCategory(
        categoryList.map((item, i) => ({
          ...item,
          selected: item.value == tocontact.category ? true : false,
        }))
      );
      setFoF(
        FocusOrFollow.map((item, i) => ({
          ...item,
          selected: item.value == tocontact.focus_folloing ? true : false,
        }))
      );
      setShare(tocontact.shareble);

      setName(tocontact.name);
      setPhoneList(tocontact.contact_number != undefined ? tocontact.contact_number : [""]);
      setEmailList(tocontact.email);
      setLocationList(tocontact.location != undefined ? tocontact.location : [""]);
      setNotes(tocontact.Notes);
      setLinkList(tocontact.link != undefined ? tocontact.link : [{ social: "Linkedin", link: "" }]);
      setPhoto(IMG_URL + tocontact.image);
    }
  }, [tocontact]);

  useEffect(() => {
    if (files !== null) {
      setPhoto(URL.createObjectURL(files[0]));
    }
  }, [files]);

  const addNewContact = (relList) => () => {
    setRelModal(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true })
    console.log(relList);

    // if (files == null) {
    //   if(tocontact == '' || tocontact.image == undefined || tocontact.image == ''){
    //     toast.show("Upload your photo", {
    //       duration: 5000,
    //       type: "warning",
    //       placement: "top",
    //     });
    //     return;
    //   }
    // }

    if (name == "") {
      toast.show("Full Name field is required", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
      return;
    }

    if (emailvalid.indexOf(false) !== -1) {
      toast.show("Email not valid", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
      return;
    }

    if (phonevalid.indexOf(false) !== -1) {
      toast.show("Phone not valid", {
        duration: 5000,
        type: "warning",
        placement: "top",
      });
      return;
    }

    // if (locationList.indexOf("") !== -1) {
    //   toast.show("Fill all location", {
    //     duration: 5000,
    //     type: "warning",
    //     placement: "top",
    //   });
    //   return;
    // }

    // if (linkList.findIndex((obj) => obj.link === "") !== -1) {
    //   toast.show("Fill all link", {
    //     duration: 5000,
    //     type: "warning",
    //     placement: "top",
    //   });
    //   return;
    // }

    let formData = new FormData();
    if (files) formData.append("file", files[0]);
    formData.append("owner", authinfo.currentUser.email);
    formData.append("name", name);
    formData.append("contact_number", JSON.stringify(phoneList));
    formData.append("email", JSON.stringify(emailList));
    formData.append("location", JSON.stringify(locationList.filter((templocation)=> templocation != '')));
    formData.append("Notes", Notes);
    formData.append("link", JSON.stringify(linkList.filter((templink)=> templink.link != '')));
    formData.append(
      "category",
      category.filter((item) => item.selected == true)[0].value
    );
    formData.append(
      "focus_folloing",
      fof.filter((item) => item.selected == true)[0].value
    );
    formData.append("share", share);
    let reltemplist = [];
    relList.map((item, i) => {
      reltemplist.push(item._id);
    });
    formData.append("relate_other_subjects", JSON.stringify(reltemplist));
    if (tocontact != "") {
      formData.append("id", tocontact._id);
      formData.append("image", tocontact.image);
    }

    if (tocontact != "") {
      dispatch(updateContact(formData, setModalVisible, setRelModal, toast));
    } else {
      dispatch(createContact(formData, setModalVisible, setRelModal, toast));
    }
  };

  const goContacts = () => {
    setModalVisible(false);
    props.navigation.navigate("contacts");
  };
  const onPressCategory = (selCategory) => {
    setCategory(selCategory);
  };

  const onPressFoF = (fof) => {
    setFoF(fof);
  };

  const handleEmail = (val, i) => {
    if (isEmailValid(val)) {
      emailvalid[i] = true;
      setEmailvalid(emailvalid);
    } else {
      emailvalid[i] = false;
      setEmailvalid(emailvalid);
    }

    let temp = emailList.slice();
    temp[i] = val;
    setEmailList(temp);
  };

  const addEmail = () => {
    let temp = emailList.slice();
    temp.push("");
    setEmailList(temp);
  };

  const handlephone = (val, i) => {
    if (isPhoneValid(val)) {
      phonevalid[i] = true;
      setPhonevalid(phonevalid);
    } else {
      phonevalid[i] = false;
      setPhonevalid(phonevalid);
    }

    let temp = phoneList.slice();
    temp[i] = val;
    setPhoneList(temp);
  };

  const addPhone = () => {
    let temp = phoneList.slice();
    temp.push("");
    setPhoneList(temp);
  };

  const deletePhone = (i) => {
    let temp = phoneList.slice();
    temp.splice(i, 1);
    setPhoneList(temp);
  };

  const deleteEmail = (i) => {
    let temp = emailList.slice();
    temp.splice(i, 1);
    setEmailList(temp);
  };

  const handleLocation = (val, i) => {
    let temp = locationList.slice();
    temp[i] = val;
    setLocationList(temp);
  };

  const addLocation = () => {
    let temp = locationList.slice();
    temp.push("");
    setLocationList(temp);
  };

  const deleteLocation = (i) => {
    let temp = locationList.slice();
    temp.splice(i, 1);
    setLocationList(temp);
  };

  const handleLink = (val, i) => {
    let temp = linkList.slice();
    temp[i].link = val;
    setLinkList(temp);
  };

  const addLink = () => {
    let temp = linkList.slice();
    temp.push({ social: "Linkedin", link: "" });
    setLinkList(temp);
  };

  const deleteLink = (i) => {
    let temp = linkList.slice();
    temp.splice(i, 1);
    setLinkList(temp);
  };

  const handleSocial = (val, i) => {
    let temp = linkList.slice();
    temp[i].social = val;
    setLinkList(temp);
  };

  const importContact = () => {
    setDeviceContactModal(false);
  }

  return (
    <View style={styles.homebg}>
      <ScrollView ref={scrollRef}>
        <View style={styles.contanier}>
          {/* <View style={styles.header}>
            <Text style={styles.title}>{tocontact !== '' ? 'Edit Contact' : 'Add New Contact'}</Text>
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
            <View style={styles.subjectTop}>
              <View style={styles.topleftgroup}>
                <View style={styles.photogroup}>
                  <TouchableOpacity
                    onPress={openFileDialog}
                    style={styles.uploadBtn}
                  >
                    <ImageBackground
                      source={photo}
                      resizeMode="contain"
                      style={styles.photo_img}
                    />
                    {/* <Image source={Camera_img} style={styles.camera_img} /> */}
                  </TouchableOpacity>
                </View>
                <Text style={styles.uploadNotice}>Tap to upload picture</Text>
              </View>
              <View style={styles.inputgroup}>
                <Text style={styles.Category}>Category</Text>
                <RadioGroup
                  radioButtons={category}
                  onPress={onPressCategory}
                  layout="row"
                  containerStyle={{ justifyContent: "space-around" }}
                />
                <RadioGroup
                  radioButtons={FocusOrFollow}
                  onPress={onPressFoF}
                  layout="row"
                  containerStyle={{ justifyContent: "space-around" }}
                />
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text>Public Shareble</Text>
                  <RadioButton
                    value="Public Shareble"
                    status={share ? "checked" : "unchecked"}
                    onPress={() => setShare(!share)}
                    style={{ alignItems: "center" }}
                  />
                  {
                    share && 
                    <View style={{ alignItems: "center", width: '5vh' }}>
                      <ImageBackground resizeMode="contain" source={Share_img} style={{ width: "5vh", height: "5vh" }} />
                      <Text>Share Subject</Text>
                    </View>
                  }
                </View>
              </View>
            </View>
            <View style={styles.inputview}>
              {/* <Text style={styles.personalInfo}>Subject Information</Text> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: '80%'}}>
                  <CustomInput
                    type={false}
                    contenttype={"none"}
                    hideIcon={true}
                    title={"Full Name"}
                    content={"Ashley Kevib"}
                    onChangeText={setName}
                    value={name}
                  />
                </View>
                <TouchableOpacity onPress={() => setDeviceContactModal(true)} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Contact_img} style={{ width: "5vh", height: "5vh" }} />
                  <Text>Import</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={addPhone}>
                <Text style={styles.linktitle}>Contact Number +</Text>
              </TouchableOpacity>
              {phoneList.map((item, i) => (
                <CustomInput
                  type={false}
                  hideIcon={true}
                  content={"+1 56789 8765"}
                  wrongmsg={"phone valid failed"}
                  valid={phonevalid[i]}
                  onChangeText={(val) => handlephone(val, i)}
                  value={item}
                  key={i}
                >
                  {i !== 0 && (
                    <TouchableOpacity
                      style={styles.deleteLink_touch}
                      onPress={() => deletePhone(i)}
                    >
                      <Text style={styles.deleteLink_img}>X</Text>
                    </TouchableOpacity>
                  )}
                </CustomInput>
              ))}
              <TouchableOpacity onPress={addEmail}>
                <Text style={styles.linktitle}>Email Address +</Text>
              </TouchableOpacity>
              {emailList.map((item, i) => (
                <CustomInput
                  type={false}
                  hideIcon={true}
                  content={"ashley@gmail.com"}
                  wrongmsg={"Email valid failed"}
                  valid={emailvalid[i]}
                  onChangeText={(val) => handleEmail(val, i)}
                  value={item}
                  key={i}
                >
                  {i !== 0 && (
                    <TouchableOpacity
                      style={styles.deleteLink_touch}
                      onPress={() => deleteEmail(i)}
                    >
                      <Text style={styles.deleteLink_img}>X</Text>
                    </TouchableOpacity>
                  )}
                </CustomInput>
              ))}
              <TouchableOpacity onPress={addLocation}>
                <Text style={styles.linktitle}>Location +</Text>
              </TouchableOpacity>
              {locationList.map((item, i) => (
                <CustomInput
                  type={false}
                  hideIcon={true}
                  content={"Utah, Lehi"}
                  onChangeText={(val) => handleLocation(val, i)}
                  value={item}
                  key={i}
                >
                  {i !== 0 && (
                    <TouchableOpacity
                      style={styles.deleteLink_touch}
                      onPress={() => deleteLocation(i)}
                    >
                      <Text style={styles.deleteLink_img}>X</Text>
                    </TouchableOpacity>
                  )}
                </CustomInput>
              ))}
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Notes"}
                content={"Write notes..."}
                multiline={true}
                onChangeText={setNotes}
                value={Notes}
              />
              <TouchableOpacity onPress={addLink}>
                <Text style={styles.linktitle}>Linked Accounts +</Text>
              </TouchableOpacity>
              {linkList.map((item, i) => (
                <View style={styles.linkview} key={i}>
                  <SelectList
                    boxStyles={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 3,
                      paddingBottom: 3,
                      height: "4vh",
                      width: "5vh",
                    }}
                    dropdownStyles={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      width: "5vh",
                    }}
                    dropdownItemStyles={{
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: 3,
                      paddingBottom: 3,
                      height: "4vh",
                      width: "5vh",
                    }}
                    arrowicon={<Text></Text>}
                    placeholder=" "
                    search={false}
                    setSelected={(val) => setSelected(val)}
                    defaultOption={{
                      key: item.social,
                      value: (
                        <Image
                          source={
                            socialList.filter(
                              (socialitem) => socialitem.name == item.social
                            )[0].image
                          }
                          style={styles.link_img}
                        />
                      ),
                    }}
                    data={socialList.map((socialitem, socialindex) => ({
                      key: socialitem.name,
                      value: (
                        <Image
                          source={socialitem.image}
                          style={styles.link_img}
                        />
                      ),
                    }))}
                    onSelect={() => handleSocial(selected, i)}
                    save="key"
                  />
                  <TextInput
                    placeholder="URL to ......"
                    style={styles.urlInput}
                    onChangeText={(val) => handleLink(val, i)}
                    value={item.link}
                  />
                  <TouchableOpacity
                    style={styles.deleteLink_touch}
                    onPress={() => deleteLink(i)}
                  >
                    <Text style={styles.deleteLink_img}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <CustomBtn
              type={"bright"}
              text={"Save"}
              disabled={name == ""}
              onPress={() => setRelModal(true)}
            />
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={goContacts}
          style={styles.modalstyle}
        >
          <ImageBackground
            source={ModalBackground_img}
            style={styles.modalBackground}
          >
            <Image source={ModalLogo_img} style={styles.modalLogo_img} />
            <Text style={styles.modalTitle}>Subject added successful!</Text>
            <Text style={styles.modalContent}>
              You have added {name} to Recite as your subject
            </Text>
          </ImageBackground>
        </Modal>

        <Modal
          isVisible={relModal}
          onBackdropPress={() => setRelModal(false)}
          style={styles.modalstyle}
        >
          <RelativeSubjects
            contactlist={contactlist}
            relList={
              tocontact != ""
                ? tocontact.relate_other_subjects == undefined
                  ? []
                  : tocontact.relate_other_subjects
                : []
            }
            relativemodalclose={setRelModal}
            addcontact={addNewContact}
          />
        </Modal>

        <Modal
          isVisible={deviceContactModal}
          onBackdropPress={() => setDeviceContactModal(false)}
          style={styles.modalstyle}
        >
          <DeviceContact
            importContact={importContact}
            modalclose={setDeviceContactModal}
          />
        </Modal>
      </ScrollView>
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
    width: "15vh",
    height: "15vh",
  },
  camera_img: {
    width: "5vh",
    height: "5vh",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  uploadBtn: {
    borderRadius: "100%",
    overflow: "hidden",
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
    // marginTop: "1.5vh",
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
  },
  uploadText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    opacity: "0.5",
  },
  upload_img: {
    width: "14vh",
    height: "14vh",
    margin: "0.5vh",
  },
  inputgroup: {
    textAlign: "left",
    marginBottom: "2vh",
  },
  Category: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
    textAlign: "center",
  },
  deleteLink_touch: {
    position: "absolute",
    top: "calc(50% - 1.5vh)",
    right: "10px",
  },
  deleteLink_img: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    color: "#EF1515",
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
    marginBottom: "1vh",
  },
  linkimgview: {
    backgroundColor: "white",
    borderRadius: "100%",
    padding: "10px",
  },
  link_img: {
    width: "20px",
    height: "20px",
  },
  urlInput: {
    width: "80%",
    height: "4vh",
    borderRadius: "10px",
    paddingLeft: "10px",
    backgroundColor: "white",
  },
});

export default AddContact;
