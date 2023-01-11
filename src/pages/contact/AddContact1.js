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
import RadioGroup from "react-native-radio-buttons-group";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { isEmailValid } from "../../utils";

import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import { useToast } from "react-native-toast-notifications";

import user_img from "../../assets/img/user-Image.png";
import Camera_img from "../../assets/img/camera.png";
import Exit_img from "../../assets/img/exit.svg";
import ModalLogo_img from "../../assets/img/modalLogo.png";
import ModalBackground_img from "../../assets/img/modalBackground.png";
import { createContact } from "../../redux/actions/contact.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const categoryList = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Personal",
    value: "Personal",
    color: "#FA7254",
    selected: true,
  },
  {
    id: "2",
    label: "Business",
    value: "Business",
    color: "#FA7254",
    selected: false,
  },
];

const AddContact = (props) => {
  const [photo, setPhoto] = useState("user-Image.png");
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const authinfo = useSelector((state) => state.authState);

  const [category, setCategory] = useState(categoryList);

  const [emailvalid, setEmailvalid] = useState(true);
  const [name, setName] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [Notes, setNotes] = useState("");
  const toast = useToast();

  const addNewContact = () => () => {
    if (
      name == "" ||
      contact_number == "" ||
      email == "" ||
      location == "" ||
      Notes == ""
    ) {
      toast.show("All fields are required", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }
    if (!emailvalid) {
      toast.show("Email not valid", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }
    if (!authinfo.currentUser) {
      toast.show("Authorization failed", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
      return;
    }
    dispatch(
      createContact(
        {
          owner: authinfo.currentUser.email,
          name,
          contact_number,
          email,
          location,
          category: category.filter((item) => item.selected == true)[0].value,
          Notes,
        },
        setModalVisible,
        toast
      )
    );
  };

  const onPressCategory = (selCategory) => {
    setCategory(selCategory);
  };

  const handleEmail = (e) => {
    if (isEmailValid(e)) {
      setEmailvalid(true);
    } else {
      setEmailvalid(false);
    }
    setEmail(e);
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Contact</Text>
            <TouchableOpacity
              style={styles.skiplink}
              onPress={() => props.navigation.navigate("Contacts")}
            >
              <Text>
                <Image source={Exit_img} style={styles.Exit_img} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.photogroup}>
              <Image source={user_img} style={styles.photo_img} />
              <TouchableOpacity
                onPress={() => props.navigation.navigate("contacts")}
              >
                <Image source={Camera_img} style={styles.camera_img} />
              </TouchableOpacity>
            </View>
            <Text style={styles.uploadNotice}>
              Tap the circle to upload picture
            </Text>
            <View style={styles.inputview}>
              <Text style={styles.personalInfo}>Contact Information</Text>
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Full Name"}
                content={"Ashley Kevib"}
                onChangeText={setName}
                value={name}
              />
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Contact Number"}
                content={"+1 56789 8765"}
                onChangeText={setContact_number}
                value={contact_number}
              />
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Email Address"}
                content={"ashley@gmail.com"}
                wrongmsg={"Email valid failed"}
                valid={emailvalid}
                onChangeText={handleEmail}
                value={email}
              />
              <CustomInput
                type={false}
                contenttype={"none"}
                hideIcon={true}
                title={"Location"}
                content={"Utah, Lehi"}
                onChangeText={setLocation}
                value={location}
              />
              <View style={styles.inputgroup}>
                <Text style={styles.Category}>Category</Text>
                <RadioGroup
                  radioButtons={category}
                  onPress={onPressCategory}
                  layout="row"
                />
              </View>
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
            </View>
            <CustomBtn
              type={"bright"}
              text={"Save"}
              disabled={
                name == "" ||
                contact_number == "" ||
                email == "" ||
                location == "" ||
                Notes == "" ||
                !emailvalid
              }
              onPress={addNewContact()}
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
            <Text style={styles.modalTitle}>Contact added successful!</Text>
            <Text style={styles.modalContent}>
              You have added Ashley L to Recite as your contact
            </Text>
          </ImageBackground>
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
    marginTop: "2vh",
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

export default AddContact;
