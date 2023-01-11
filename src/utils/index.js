import {IMG_URL} from '../config'
export const isEmailValid = (val) => {
  let email = val;
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
};

export const isNameValid = (val) => {
  let name = val;
  let pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  return pattern.test(String(name).toLowerCase());
};

export const isPhoneValid = (val) => {
  let phone = val;
  let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return pattern.test(String(phone).toLowerCase());
};

export const isNumberValid = (val) => {
  let num = val;
  let pattern = /^[0-9\b]+$/;
  return pattern.test(String(num).toLowerCase());
};

export const getBrowser = (window) => {
  let currentBrowser = "Not known";
  if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
    currentBrowser = "Google Chrome";
  } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
    currentBrowser = "Mozilla Firefox";
  } else if (window.navigator.userAgent.indexOf("MSIE") !== -1) {
    currentBrowser = "Internet Exployer";
  } else if (window.navigator.userAgent.indexOf("Edge") !== -1) {
    currentBrowser = "Edge";
  } else if (window.navigator.userAgent.indexOf("Safari") !== -1) {
    currentBrowser = "Safari";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "Opera";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "YaBrowser";
  } else {
    console.log("Others");
  }

  return currentBrowser;
};

const IconList = ["pdf", "docx", "mp3", "mp4", "text", "zip", "xml"];

export const getIcon = (file_name) => {
  let fileArray = file_name.split(".");
  let filetype = fileArray[fileArray.length - 1];
  if (!file_name.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
    if (IconList.indexOf(filetype) > -1) {
      return require(`../assets/img/filetype/${filetype}.png`);
    } else {
      return require(`../assets/img/filetype/default.svg`);
    }
  } else {
    return `${IMG_URL}${file_name}`;
  }
};
