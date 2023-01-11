import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import socket from "../utils/socket";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllInfo,
    getUnreadInfo,
  } from "../redux/actions/contact.action";
const Loading = ({children}) => {
    const isFocused = useIsFocused();
    const [getmessage, setGetmessage] = useState(true);
    const dispatch = useDispatch(true);
    const toast = useToast();
    const authinfo = useSelector((state) => state.authState);
    const contactInfo = useSelector((state) => state.contactState);

    useEffect(()=>{
        socket.on("newMessage", (message) => {
            if(authinfo.currentUser.email == message.from || authinfo.currentUser.email == message.to){
                setGetmessage(!getmessage)
                getdata(contactInfo.selected, contactInfo.unreadlist)
            }
        });
    },[socket, isFocused, contactInfo.selected])

    const getdata = (selected, unreadlist) => {
        if(unreadlist.length > 0 && selected != -1){
            dispatch(
                getAllInfo(
                {
                    owner: authinfo.currentUser.email,
                    id: unreadlist[selected].to._id,
                },
                toast
                )
            );
        }

        dispatch(
            getUnreadInfo({
              owner: authinfo.currentUser.email,
              category: contactInfo.category,
              focus_folloing: contactInfo.focus_folloing,
            })
        );
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            {/* <ActivityIndicator style={styles.spinner} size="large" color="#00ff00" /> */}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        zIndex: 1
    }
});

export default Loading;
