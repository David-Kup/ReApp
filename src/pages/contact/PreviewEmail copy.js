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
import { useToast } from "react-native-toast-notifications";

import create_img from "../../assets/img/Copy.svg";
import delete_img from "../../assets/img/Delete.svg";
import reply_img from "../../assets/img/Logout_grey.svg";
import { getIcon } from "../../utils";

import {
  getEmail,
  deleteEmail,
  getMessage,
  deleteMessage,
  readEOM,
} from "../../redux/actions/contact.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PreviewEmail = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const authinfo = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const showEmail = useSelector((state) => state.contactState.showEmail);
  const toast = useToast();

  useEffect(() => {
    if (props.route.params == undefined) {
      props.navigation.navigate("contacts");
      return;
    }
    if (props.route.params.type == "Email") {
      dispatch(getEmail({ id: props.route.params.id }, toast));
    } else {
      dispatch(getMessage({ id: props.route.params.id }, toast));
    }
    if (props.route.params.email !== authinfo.currentUser.email) {
      dispatch(
        readEOM(
          props.route.params.type == "Email" ? "email" : "message",
          { id: props.route.params.id },
          toast
        )
      );
    }
  }, [props.route.params]);

  const onDelete = (id) => {
    if (props.route.params.type == "Email") {
      dispatch(deleteEmail({ id }, props.navigation));
    } else {
      dispatch(deleteMessage({ id }, props.navigation));
    }
  };

  return (
    <View style={styles.homebg}>
      <View style={styles.contanier}>
        <View style={styles.body}>
          {showEmail !== "" && (
            <ScrollView
              style={styles.inputview}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.block}>
                <View style={styles.groupOne}>
                  <Text style={styles.title}>Email From:</Text>
                  <Text style={styles.content}>{showEmail.from}</Text>
                </View>
                <View style={styles.groupOne}>
                  <Text style={styles.title}>Subject:</Text>
                  <Text style={styles.content}>{showEmail.subject}</Text>
                </View>
                <View style={styles.groupOne}>
                  <Text style={styles.title}>To: </Text>
                  <Text style={styles.content}>{showEmail.to}</Text>
                </View>
                <View style={styles.groupOne}>
                  <Text style={styles.title}>Message:</Text>
                  <Text style={{...styles.content, minHeight: '20vh'}}>{showEmail.content}</Text>
                </View>
              </View>
              {
                showEmail.media.length > 0 &&
                <View style={styles.block}>
                  <Text style={styles.title}>Attachments:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                    }}
                  >
                    {showEmail.media.length > 0 &&
                      showEmail.media.map((item, i) => (
                        <View style={{ textAlign: "center", margin: "1vh", borderColor: 'grey', borderWidth: '1px', padding: '0.2vh', borderRadius: '1vh' }} key={i}>
                          <ImageBackground
                            resizeMode="contain"
                            source={getIcon(item)}
                            style={{ width: "12vh", height: "12vh",  textAlign: "center", margin: "1vh" }}
                          />
                          <Text style={{...styles.content, width: '12vh', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",}} key={i}>
                            {item}
                          </Text>
                        </View>
                      ))}
                  </View>
                </View>
              }
              {
                showEmail.link.length > 0 &&
                <View style={styles.block}>
                  <Text style={styles.title}>Links:</Text>
                  <View>
                    {showEmail.link.length > 0 &&
                      showEmail.link.map((item, i) => (
                        <Text style={styles.content} key={i}>
                          {item}
                        </Text>
                      ))}
                  </View>
                </View>
              }
              <View style={styles.btnGroup}>
                <TouchableOpacity style={styles.btnView}>
                  <Text style={styles.btnText}>Create Subject</Text>
                  <Image source={create_img} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnView}
                  onPress={() => onDelete(showEmail._id)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                  <Image source={delete_img} style={styles.icon} />
                </TouchableOpacity>
                {showEmail.from !== authinfo.currentUser.email && (
                  <TouchableOpacity
                    style={styles.btnView}
                    onPress={() =>
                      props.navigation.navigate("sendEmailOrMsg", {
                        type: props.route.params.type,
                        email: showEmail.from,
                      })
                    }
                  >
                    <Text style={styles.btnText}>Reply</Text>
                    <Image source={reply_img} style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.blockTouch}>
                  <Text style={styles.btnText}>
                    BLOCK email Domain from contacitng you
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  w_100: {
    width: "101%",
  },
  homebg: {
    width: windowWidth,
    backgroundColor: "#2D3442",
    alignItems: "center",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
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
  body: {
    backgroundColor: "#e2e2e2",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: "2vh",
    height: "87.2vh",
  },
  inputview: {
    height: "72vh",
    width: "90%",
    marginTop: "2.5vh",
  },
  title: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "2.5vh",
    minWidth: "30%",
  },
  content: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2vh",
    margin: "1vh",
    backgroundColor: '#8080803b',
    borderRadius: '5px',
    padding: '1vh'
  },
  icon: {
    width: "3vh",
    height: "3vh",
  },
  btnText: {
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
    textAlign: "center",
  },
  btnView: {
    width: "10vh",
    height: "8vh",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "1px 1px 1px 1px lightgrey",
  },
  block: {
    backgroundColor: "#fbfbfd",
    borderRadius: "10px",
    marginTop: "1vh",
    marginBottom: "2vh",
    padding: '2vh'
  },
  groupOne: {
    // flexDirection: "row",
    marginTop: "1vh",
    // alignItems: "center",
  },
  groupTwo: {
    flexDirection: "column",
    marginTop: "1vh",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: '2vh'
  },
  btnGroup: {
    flexDirection: "row",
    margin: "1vh",
    justifyContent: "space-around",
  },
  messageView: {
    backgroundColor: "white",
    margin: "1vh",
    padding: "1vh",
    borderRadius: "10px",
    minHeight: "20vh",
  },
  blockTouch: {
    width: "90%",
    backgroundColor: "white",
    height: "7vh",
    boxShadow: "1px 1px 1px 1px lightgrey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    marginBottom: "3vh",
  },
});

export default PreviewEmail;
