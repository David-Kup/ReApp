import React, { useState, useEffect } from "react";

import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Dimensions,
} from "react-native";

import DContacts from "react-native-contacts";
import { TouchableOpacity } from "react-native-web";

import Exit_img from "../../assets/img/exit.svg";
import user_img from "../../assets/img/user-Image.png";
import Plus_img from "../../assets/img/addlink.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DeviceContact = (props) => {
  let [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      }).then(() => {
        loadContacts();
        console.log("fdsa");
      });
    }
  }, []);

  const loadContacts = () => {
    DContacts.getAll()
      .then((contacts) => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
        );
        setContacts(contacts);
      })
      .catch((e) => {
        alert("Permission to access contacts was denied");
        console.warn("Permission to access contacts was denied");
      });
  };

  const search = (text) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (DContacts != undefined) {
      if (text === "" || text === null) {
        loadContacts();
      } else if (phoneNumberRegex.test(text)) {
        DContacts.getContactsByPhoneNumber(text).then((contacts) => {
          contacts.sort(
            (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
          );
          setContacts(contacts);
          console.log("contacts", contacts);
        });
      } else {
        DContacts.getContactsMatchingString(text).then((contacts) => {
          contacts.sort(
            (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase()
          );
          setContacts(contacts);
          console.log("contacts", contacts);
        });
      }
    }
  };

  const openContact = (contact) => {
    console.log(JSON.stringify(contact));
    DContacts.openExistingContact(contact);
  };

  const ListItem = (item) => {
    return (
      <View style={styles.subjectView}>
        <ImageBackground
          source={item.hasThumbnail ? { uri: item.thumbnailPath } : user_img}
          resizeMode="contain"
          style={styles.subject_avatar}
        />
        <Text style={styles.subjectName}>{item.familyName}</Text>
        <TouchableOpacity onPress={onPressSubject(index)}>
          <Image source={Plus_img} style={styles.plus_img} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={styles.header}>
            <Text style={styles.title}>Local device contacts</Text>
            <TouchableOpacity
              style={styles.skiplink}
              onPress={() => props.modalclose(false)}
            >
              <Text>
                <Image source={Exit_img} style={styles.Exit_img} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <TextInput
              onChangeText={search}
              placeholder="Search"
              style={styles.searchBar}
            />
            <FlatList
              data={contacts}
              renderItem={(contact) => {
                {
                  console.log("contact -> " + JSON.stringify(contact));
                }
                return (
                  <ListItem key={contact.item.recordID} item={contact.item} />
                );
              }}
              keyExtractor={(item) => item.recordID}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default DeviceContact;

const styles = StyleSheet.create({
  searchBar: {
    width: "80%",
    backgroundColor: "#f0eded",
    paddingHorizontal: 30,
    paddingVertical: 15,
    margin: 10,
  },
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
