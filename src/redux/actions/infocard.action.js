import API from "../API";
// import AsyncStorage from '@react-native-community/async-storage';

export function getInfocard(data, navigate) {
  return async (dispatch) => {
    API.get(`infocard/getallinfo?packet=${data}`)
      .then((result) => {
        dispatch(setInfocardlist(result.data.Infocardlist));
        if (result.data.Infocardlist.length === 0) {
          navigate("signDashboard");
        }
      })
      .catch((err) => {
        console.log(JSON.parse(err.request.response).message);
      });
  };
}

export function setInfocardlist(data) {
  return { type: "setInfocardlist", data };
}

export function getSignInUpCard(data, navigate) {
  return async (dispatch) => {
    API.get(`infocard/getallinfo?packet=${data}`)
      .then((result) => {
        dispatch(setSignInUpdata(result.data.Infocardlist));
      })
      .catch((err) => {
        console.log(JSON.parse(err.request.response).message);
      });
  };
}

export function setSignInUpdata(data) {
  return { type: "setSignInUpdata", data };
}
