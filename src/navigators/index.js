import React from "react";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Splash from "../pages/Splash";
import Boarding from "../pages/Boarding/Boarding";
import SignDashboard from "../pages/Auth/SignInUp";
import ResetPassword from "../pages/Auth/ResetPassword";
import SignIn from "../pages/Auth/SignIn";
import Verification from "../pages/Auth/Verification";
import SetUpPassword from "../pages/Auth/SetUpPassword";
import SignInWithGoogle from "../pages/Auth/SignInWithGoogle";
import SignUp from "../pages/Auth/SignUp";
import SignUpWithGoogle from "../pages/Auth/SignUpWithGoogle";
import SetProfile from "../pages/Auth/SetProfile";
import AddCredentials_1 from "../pages/Auth/AddCredentials_1";
import AddCredentials_2 from "../pages/Auth/AddCredentials_2";
import VerificationEmail from "../pages/Auth/VerificationEmail";
import SignInAdmin from "../pages/Auth/SignInAdmin";
import Home from "../pages/Home/HomePage";
// import LoginPage from '../pages/Auth/Login/Login.page';
import AddContact from "../pages/contact/AddContact";
import Contacts from "../pages/contact/Contacts";
import ContactInfo from "../pages/contact/ContactInfo";
import SendEmailOrMsg from "../pages/contact/SendEmailOrMsg";
import RelativeSubjects from "../pages/contact/RelativeSubjects";
import AllSubjects from "../pages/home/AllSubjects";
import AddFile from "../pages/FileAndFolder/AddFile";
import AddFolder from "../pages/FileAndFolder/AddFolder";
import PersonalPage from "../pages/home/PersonalPage";
import Settings from "../pages/home/Settings";
import AboutUs from "../pages/home/AboutUs";
import ChangePassword from "../pages/home/ChangePassword";
import Faq from "../pages/home/Faq";
import Privacy from "../pages/home/Privacy";
import PrivacyPolicy from "../pages/home/PrivacyPolicy";
import Support from "../pages/home/Support";
import TermsConditions from "../pages/home/TermsConditions";
import Files from "../pages/FileAndFolder/Files";
import Folders from "../pages/FileAndFolder/Folders";
import PreviewEmail from "../pages/contact/PreviewEmail";
import RemindMe from "../pages/contact/RemindMe";
import EditProfile from "../pages/contact/EditProfile";
import EmailConnect from "../pages/contact/EmailConnect";
import Loading from "../components/Loading";

import store from "../redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useAuth0, Auth0Provider } from "react-native-auth0";
import { TouchableOpacity, Image, View, StyleSheet, Text, Button } from "react-native";

import applogo from "../assets/img/recite.svg";

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const styles = StyleSheet.create({
    container: {
      width: "200px",
      flexDirection: "row",
      position: "relative",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontFamily: "ABeeZee",
      fontStyle: "italic",
      fontWeight: 400,
      fontSize: "20px",
      color: "#66BFE1",
    },
  });

  const customHeader = (children) => (
    <View style={styles.container}>
      <Image
        source={applogo}
        style={{
          width: "38px",
          height: "50px",
          position: "absolute",
          left: "-40px",
        }}
      />
      <Text style={styles.headerTitle}>{children}</Text>
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Auth0Provider domain={"dev-0lpb7q3cwv7fnudg.us.auth0.com"} clientId={"ZA1vTJls8oPFAYD5HNHJJ1Wy6a1VaJFp"}> */}
        <ToastProvider>
          <NavigationContainer>
            <Loading>
            <Stack.Navigator
              initialRouteName="contacts"
              screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#2D3442",
                  height: '10vh'
                },
                headerBackImageSource: require("../assets/img/left_arrow.png"),
              }}
              >
              <Stack.Screen
                options={{ headerShown: false }}
                name="splash"
                component={Splash}
              />
              <Stack.Screen
                options={{headerLeft: false, headerTitle: () => customHeader("On Boarding") }}
                name="onboarding"
                component={Boarding}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("SignIn/Up") }}
                name="signDashboard"
                component={SignDashboard}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Sign In") }}
                name="signIn"
                component={SignIn}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Forgot") }}
                name="forgot"
                component={ResetPassword}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Verification") }}
                name="verification"
                component={Verification}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Set Up Password") }}
                name="setUpPassword"
                component={SetUpPassword}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("SignIn With Google"),
                }}
                name="signInWithGoogle"
                component={SignInWithGoogle}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Sign In Admin") }}
                name="signInAdmin"
                component={SignInAdmin}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Sign Up") }}
                name="signUp"
                component={SignUp}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("SignUp with Google"),
                }}
                name="signUpWithGoogle"
                component={SignUpWithGoogle}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Set Profile") }}
                name="setProfile"
                component={SetProfile}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Add Credentials") }}
                name="addCredentials_1"
                component={AddCredentials_1}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Add Credentials") }}
                name="addCredentials_2"
                component={AddCredentials_2}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("Verification Email"),
                }}
                name="verificationEmail"
                component={VerificationEmail}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Subject") }}
                name="home"
                component={Home}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Add Subject") }}
                name="addContact"
                component={AddContact}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Subjects") }}
                name="contacts"
                component={Contacts}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Subject info") }}
                name="contactInfo"
                component={ContactInfo}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("Send Email Or Message"),
                }}
                name="sendEmailOrMsg"
                component={SendEmailOrMsg}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("Relative Subjects"),
                }}
                name="relativeSubjects"
                component={RelativeSubjects}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Home") }}
                name="allSubjects"
                component={AllSubjects}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Add File") }}
                name="addFile"
                component={AddFile}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Add Folder") }}
                name="addFolder"
                component={AddFolder}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Personal") }}
                name="personalPage"
                component={PersonalPage}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Account Settings") }}
                name="settings"
                component={Settings}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("About us") }}
                name="aboutUs"
                component={AboutUs}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Change Password") }}
                name="changePassword"
                component={ChangePassword}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("FAQ") }}
                name="faq"
                component={Faq}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Privacy") }}
                name="privacy"
                component={Privacy}
              />
              <Stack.Screen
                options={{
                  headerTitle: () => customHeader("Privacy and Policy"),
                }}
                name="privacyPolicy"
                component={PrivacyPolicy}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Support") }}
                name="support"
                component={Support}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Terms") }}
                name="termsConditions"
                component={TermsConditions}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Files") }}
                name="files"
                component={Files}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Folders") }}
                name="folders"
                component={Folders}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Received Message") }}
                name="previewEmail"
                component={PreviewEmail}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Remind Me") }}
                name="remindMe"
                component={RemindMe}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Profile") }}
                name="editProfile"
                component={EditProfile}
              />
              <Stack.Screen
                options={{ headerTitle: () => customHeader("Connect Email") }}
                name="emailConnect"
                component={EmailConnect}
              />
            </Stack.Navigator>
            </Loading>
          </NavigationContainer>
        </ToastProvider>
        {/* </Auth0Provider> */}
      </PersistGate>
    </Provider>
  );
};

export default Navigation;
