import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Picker,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import { isPhoneValid } from "../../utils";

import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import Call_img from "../../assets/img/Call.svg";
import Profile_img from "../../assets/img/Profile.svg";
import Upload_img from "../../assets/img/user.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SetProfile = (props) => {
  const [daylist, setdayList] = useState([1]);
  const [selectedDate, setSelectedDate] = useState(1);
  const [monthlist, setMonthList] = useState([1]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [yearlist, setYearList] = useState([1]);
  const [selectedYear, setSelectedYear] = useState(1970);

  const [namevalid] = useState(true);
  const [phonevalid, setPhonevalid] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useLayoutEffect(() => {
    const now = new Date();
    const yearlisttemp = [];
    for (let i = 1970; i <= 2050; i++) {
      yearlisttemp.push(i);
    }
    setYearList(yearlisttemp);
    setSelectedYear(now.getFullYear());

    const monthlisttemp = [];
    for (let i = 1; i <= 12; i++) {
      monthlisttemp.push(i);
    }
    setMonthList(monthlisttemp);
    setSelectedMonth(now.getMonth() + 1);

    const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const daylisttemp = [];
    for (let i = 1; i <= lastday.getDate(); i++) {
      daylisttemp.push(i);
    }
    setdayList(daylisttemp);
    setSelectedDate(now.getDate());
  }, []);

  const changemonth = (val) => {
    const daylisttemp = [];
    for (let i = 1; i <= new Date(selectedYear, val, 0).getDate(); i++) {
      daylisttemp.push(i);
    }
    setdayList(daylisttemp);
    setSelectedDate(1);
    setSelectedMonth(val);
  };

  const continueProfile = () => () => {
    props.navigation.navigate("addCredentials_1");
  };

  const handleName = (e) => {
    if (isNameValid(e)) {
      setNamevalid(true);
    } else {
      setNamevalid(false);
    }
    setName(e);
  };

  const handlePhone = (e) => {
    if (isPhoneValid(e)) {
      setPhonevalid(true);
    } else {
      setPhonevalid(false);
    }
    var numb = e.match(/\d/g);
    if (numb === null) {
      setPhone("");
    } else {
      numb = numb.join("");
      setPhone(numb);
    }
  };

  return (
    <View style={styles.homebg}>
      <ScrollView>
        <View style={styles.contanier}>
          <View style={styles.header}>
            <Text style={styles.title}>Set Up Profile</Text>
            <Text style={styles.skiplink}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("splash")}
              >
                Skip
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.inputview}>
              <View style={styles.uploadView}>
                <ImageBackground
                  source={Upload_img}
                  style={styles.upload_img}
                  resizeMode="contain"
                />
                <Text style={styles.uploadText}>
                  Tap the circle to upload your picture
                </Text>
              </View>
              <Text style={styles.personalInfo}>Personal Informations</Text>
              <CustomInput
                type={false}
                iconimg={Profile_img}
                contenttype={"name"}
                title={"Name"}
                valid={namevalid}
                content={"Enter your name here"}
                wrongmsg={"Should fill field"}
                onChangeText={handleName}
                value={name}
              />
              <CustomInput
                type={false}
                iconimg={Call_img}
                title={"Contact Number"}
                valid={phonevalid}
                content={"Enter Contact Number here"}
                wrongmsg={"telephone valid failed"}
                onChangeText={handlePhone}
                value={phone}
              />
              <View style={styles.birthgroup}>
                <Text style={styles.birthtitle}>Date Of Birth</Text>
                <View style={styles.dategroup}>
                  <Picker
                    selectedValue={selectedDate}
                    style={styles.selectPicker}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedDate(itemValue)
                    }
                  >
                    {daylist.map((item, i) => (
                      <Picker.Item label={item} value={item} key={i} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={selectedMonth}
                    style={styles.selectPicker}
                    onValueChange={(itemValue, itemIndex) =>
                      changemonth(itemValue)
                    }
                  >
                    {monthlist.map((item, i) => (
                      <Picker.Item label={item} value={item} key={i} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={selectedYear}
                    style={styles.selectPicker}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedYear(itemValue)
                    }
                  >
                    {yearlist.map((item, i) => (
                      <Picker.Item label={item} value={item} key={i} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
            <CustomBtn
              type={"bright"}
              text={"Continue"}
              onPress={continueProfile()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homebg: {
    width: windowWidth,
    height: windowHeight - '10vh',
    backgroundColor: "#2D3442",
    alignItems: "center",
  },
  contanier: {
    minWidth: "375px",
    width: "100vw",
    alignItems: "center",
    textAlign: "center",
    // paddingTop: "0.8vh",
  },
  header: {
    maxWidth: "375px",
    width: "100%",
    alignItems: "center",
    height: "10vh",
    padding: "2vh",
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
  body: {
    backgroundColor: "#fbfbfd",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    padding: "0.5vw",
    maxWidth: "375px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    height: "80vh",
    position: "relative",
    // marginTop: "2vh",
  },
  inputview: {
    height: "70vh",
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
    width: "12vh",
    height: "11.9vh",
    margin: "0.2vh",
  },
  birthgroup: {
    textAlign: "left",
  },
  birthtitle: {
    fontFamily: "Museo Slab",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "32px",
    marginBottom: "1vh",
  },
  selectPicker: {
    width: "30%",
    height: "6vh",
    borderRadius: "10px",
    border: 0,
    paddingLeft: "5px",
  },
  dategroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SetProfile;
