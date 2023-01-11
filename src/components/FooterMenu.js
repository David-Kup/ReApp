import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";

// import Home_img from "../assets/img/Home.svg";
// import Folder_img from "../assets/img/Folder_grey.svg";
import SendMsg_img from "../assets/img/icon/resume 1.png";
import AddSubject_img from "../assets/img/icon/add-friend 1.png";
import AddFile_img from "../assets/img/icon/add-file-2.png";
import AddFolder_img from "../assets/img/icon/new-folder.png";
import TakePhoto_img from "../assets/img/icon/camera 1.png";
import Logout_img from "../assets/img/icon/exit.png";

import Account_img from "../assets/img/icon/co-founder 1.png";
import Share_img from "../assets/img/icon/social-media 1.png";




import Home_img from "../assets/img/icon/home.png";
import Folders_img from "../assets/img/icon/folder.png";
import Files_img from "../assets/img/icon/file.png";
import AllSubject_img from "../assets/img/icon/co-leaders.png";

import Home_unsel_img from "../assets/img/icon/home.png";
import Folder_unsel_img from "../assets/img/icon/folder.png";
import Document_unsel_img from "../assets/img/icon/file.png";
import Users_unsel_img from "../assets/img/icon/co-leaders.png";

import MenuItemTop_img from "../assets/img/menuItem_top.png";

import Menubg_img from "../assets/img/menuSubtract.png";

import OnpenModal_img from "../assets/img/OnpenModal.png";
import CloseModal_img from "../assets/img/CloseModal.png";

import Users_blue_img from "../assets/img/Users_blue.png";
import Folder_blue_img from "../assets/img/Folder_blue.png";
import Document_blue_img from "../assets/img/icon/Others.png";
import AddModal_img from "../assets/img/addModal.png";
import { logout } from "../redux/actions/auth.action";

const FooterMenu = (props) => {
  const [selected, setSelected] = useState(props.selected);

  const dispatch = useDispatch();

  const selectSubmenu = (val) => () => {
    props.OpenModalfuc(false);
    props.navigation.navigate(val);
  };

  const logoutRecite = () => {
    dispatch(logout(props.navigation.navigate));
  };

  const goPages = (val) => {
    props.OpenModalfuc(false);
    props.navigation.navigate(val);
  }

  const [isPushNoticeOn, setIsPushNoticeOn] = React.useState(false);
  const [isAutoUpdateOn, setIsAutoUpdateOn] = React.useState(false);

  const onPushNotice = () => setIsPushNoticeOn(!isPushNoticeOn);
  const onAutoUpdate = () => setIsAutoUpdateOn(!isAutoUpdateOn);

  return (
    <ImageBackground
      source={Menubg_img}
      resizeMode="cover"
      style={styles.footerContainer}
    >
      <View style={styles.menugroup}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goPages("allSubjects")}
        >
          <Image
            source={Home_img}
            style={styles.menuselected}
          />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goPages("contacts")}
        >
          <Image
            source={AllSubject_img}
            style={styles.menuselected}
          />
          <Text style={styles.menuText}>All Subjects</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menugroup}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goPages("folders")}
        >
          <Image
            source={Folders_img}
            style={styles.menuselected}
          />
          <Text style={styles.menuText}>Folders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goPages("files")}
        >
          <Image
            source={Files_img}
            style={styles.menuselected}
          />
          <Text style={styles.menuText}>Files</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => props.OpenModalfuc(!props.opensubmodal)}
        style={styles.touchopenmodal}
      >
        <Image
          source={props.opensubmodal ? CloseModal_img : OnpenModal_img}
          style={styles.menuCircelselected}
        />
      </TouchableOpacity>
      {props.opensubmodal && (
        <ImageBackground
          source={AddModal_img}
          resizeMode="contain"
          style={styles.addModal_img}
        >
          <View style={{width: '70%'}}>
            <TouchableOpacity
              style={styles.addSubMenu}
              onPress={selectSubmenu("addContact")}
            >
              <Image source={AddSubject_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Add Subject(s) to Recite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addSubMenu}
              onPress={selectSubmenu("sendEmailOrMsg")}
            >
              <Image source={SendMsg_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>
              Send Message or Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addSubMenu}
              onPress={selectSubmenu("addFolder")}
            >
              <Image source={AddFolder_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Add Folder(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addSubMenu}
              onPress={selectSubmenu("addFile")}
            >
              <Image source={AddFile_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Add Files</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addSubMenu}
            >
              <Image source={TakePhoto_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Take Photo or Video</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '30%'}}>
            <TouchableOpacity
              style={{...styles.addSubMenu, flexDirection:'column'}}
              onPress={() => goPages('settings')}
            >
              <Image source={Account_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.addSubMenu, flexDirection:'column'}}
              onPress={() => logoutRecite()}
            >
              <Image source={Logout_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.addSubMenu, flexDirection:'column'}}
            >
              <Image source={AllSubject_img} style={styles.addSubImg} />
              <Text style={styles.addSubText}>{'Share'}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    minWidth: "375px",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-around",
    height: "14vh",
    borderRadius: "10px",
    bottom: "-6vh",
  },
  menuselected: {
    width: "4vh",
    height: "4vh",
  },
  menuItem: {
    position: "relative",
    paddingBottom: "2vh",
    alignItems: 'center'
  },
  menutop_img: {
    position: "absolute",
    top: 0,
    left: "1px",
  },
  menuCircelselected: {
    width: "9vh",
    height: "9vh",
  },
  touchopenmodal: {
    position: "absolute",
    top: "-3.5vh",
    left: "calc(50%-3.5vh)",
  },
  addModal_img: {
    position: "absolute",
    height: "35vh",
    width: "40vh",
    top: "-38vh",
    left: "calc(50% - 20vh)",
    padding: "2vh",
    justifyContent: "space-between",
    paddingBottom: "5vh",
    flexDirection: 'row'
  },
  addSubMenu: {
    flexDirection: "row",
    alignItems: "center",
    margin: "0.1vh",
    marginVertical: '0.8vh'
  },
  addSubImg: {
    width: "3.5vh",
    height: "3.5vh",
    margin: "0.1vh",
  },
  addSubText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "2vh",
  },
  menuText: {
    color: "#2D3442",
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "1.5vh",
  },
  menugroup: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-around'
  }
});

export default FooterMenu;
