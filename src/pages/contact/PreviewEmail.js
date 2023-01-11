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

import delete_img from "../../assets/img/icon/throwing-trash.png";
import reply_img from "../../assets/img/icon/reply.png";
import create_img from "../../assets/img/icon/co-leaders.png";
import remind_img from "../../assets/img/remindNotice.png";

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
          <View style={styles.block}>
            <View style={styles.groupOne}>
              <Text style={styles.title}>From:</Text>
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
          </View>
          {showEmail !== "" && (
            <ScrollView
              style={styles.inputview}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.groupOne}>
                <Text style={styles.title}>Message :</Text>
                <Text style={{...styles.content, minHeight: '20vh'}}>{showEmail.content}</Text>
              </View>
              {
                showEmail.media.length > 0 &&
                <View>
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
                  <Image source={create_img} style={styles.icon} />
                  <Text style={styles.btnText}>+ Subject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnView}
                  onPress={() => onDelete(showEmail._id)}
                >
                  <Image source={delete_img} style={styles.icon} />
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>props.navigation.navigate('remindMe', {id: props.route.params.id})} style={styles.btnView}>
                  <Image source={remind_img} style={styles.icon} />
                  <Text style={styles.btnText}>Remind Me</Text>
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
                    <Image source={reply_img} style={styles.icon} />
                    <Text style={styles.btnText}>Reply</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          )}
          <View style={{ alignItems: "center", width: '100%', borderTopWidth: '1px' }}>
            <Text style={styles.blockTitle}>
              BLOCK email Domain from contacitng you
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
              <TouchableOpacity style={styles.blockTouch}>
                <Text style={styles.btnText1}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.blockTouch}>
                <Text style={styles.btnText1}>Domain</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: "#fbfbfd",
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
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
  },
  content: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "2vh",
    margin: "1vh",
  },
  icon: {
    width: "3vh",
    height: "3vh",
  },
  blockTitle: {
    color: "rgba(45, 52, 66, 0.7)",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
    textAlign: "center",
    margin: '2vh'
  },
  btnText: {
    color: "black",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
    textAlign: "center",
  },
  btnText1: {
    color: "white",
    fontFamily: "ABeeZee",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: "1.7vh",
    textAlign: "center",
  },
  btnView: {
    width: "9vh",
    height: "7vh",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  block: {
    marginTop: "1vh",
    borderBottomWidth: '1px',
    width: '100%',
    paddingLeft: '2vh',
    paddingRight: '2vh',
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
    width: "10vh",
    backgroundColor: "black",
    height: "4vh",
    boxShadow: "1px 1px 1px 1px lightgrey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    marginBottom: "1vh",
  },
});

export default PreviewEmail;
