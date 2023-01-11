import API from "../API";

export function createContact(data, setModalVisible, setRelModal, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/create", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        setRelModal(false);
        setModalVisible(true);
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function getContact(data, navigate) {
  return async (dispatch) => {
    try {
      const result = await API.get(`contact/getContact?owner=${data.owner}`);
      dispatch(setContactlist(result.data.contactresult));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setContactlist(data) {
  return { type: "setContactlist", data };
}

export function deleteContact(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post(`contact/delete`, { id: data.id });
      dispatch(getUnreadInfo(data.getunread));
    } catch (err) {
      console.log(err);
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function deleteEmail(data, navigation) {
  return async (dispatch) => {
    try {
      const result = await API.post(`email/delete`, data);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteMessage(data, navigation) {
  return async (dispatch) => {
    try {
      const result = await API.post(`message/delete`, data);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
}

export function setContactInfo(data) {
  return { type: "setContactInfo", data };
}

export function getContactEmailInfo(data, navigate) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `email/getAllEmail?owner=${data.owner}&to=${data.to}`
      );
      dispatch(setContactEmailInfo(result.data.emailresult));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setContactEmailInfo(data) {
  return { type: "setContactEmailInfo", data };
}

export function getContactMessageInfo(data, navigate) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `message/getAllMessage?user1=${data.user1}&user2=${data.user2}`
      );
      dispatch(setContactMessageInfo(result.data.messageresult));
    } catch (err) {
      console.log(err);
    }
  };
}

export function setContactMessageInfo(data) {
  return { type: "setContactMessageInfo", data };
}

export function sendEmail(data, navigation, setModalVisible, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("email/send", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      console.log(err);
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function sendMessage(data, navigation, setModalVisible, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("message/send", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function saveRelative(data, setModalVisible, navigation, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/saveRelative", data);
      if (result.data.status === "success") {
        setModalVisible(false);
        navigation.navigate("contacts");
      }
    } catch (err) {
      toast.show(JSON.parse(err.request.response).message, {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function getUnreadInfo(data) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `contact/getUnreadInfo?owner=${data.owner}&category=${data.category}&focus_following=${data.focus_folloing}`
      );
      dispatch(setUnreadlist(result.data));
    } catch (err) {
      console.error(err);
    }
  };
}

export function setUnreadlist(data) {
  return { type: "setUnreadlist", data };
}

export function updateContact(data, setModalVisible, setRelModal, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post("contact/edit", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        setRelModal(false);
        setModalVisible(true);
      }
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function getAllInfo(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `contact/getAllInfo?owner=${data.owner}&id=${data.id}`
      );
      dispatch(
        setPersonInfo({
          contactresult: result.data.contactresult,
          infos: result.data.infos,
        })
      );
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function setPersonInfo(data) {
  return { type: "setPersonInfo", data };
}

export function getEmail(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(`email/getEmail?id=${data.id}`);
      dispatch(setEmail(result.data.result));
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function setEmail(data) {
  return { type: "setEmail", data };
}

export function getMessage(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(`message/getMessage?id=${data.id}`);
      dispatch(setEmail(result.data.result));
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function getAccount(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(`contact/getAccount?owner=${data.owner}`);
      dispatch(setAccountlist(result.data.accountresult));
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function setAccountlist(data) {
  return { type: "setAccountlist", data };
}

export function readEOM(type, data, toast) {
  return async (dispatch) => {
    try {
      await API.post(`${type}/read`, data);
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function setVData(data) {
  return { type: "setData", data };
}
