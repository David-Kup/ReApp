import API from "../API";

export function createFile(data, setResultModalVisible) {
  return async (dispatch) => {
    try {
      const result = await API.post("file/create", data.formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (result.data.status == "success") {
        dispatch(getAllFiles({ creator: data.creator }));
        setResultModalVisible(true);
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

export function createFolder(data, setResultModalVisible) {
  return async (dispatch) => {
    try {
      const result = await API.post("folder/create", data);
      if (result.data.status == "success") {
        setResultModalVisible(true);
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

export function getAllFiles(data, navigate) {
  return async (dispatch) => {
    try {
      const result = await API.get(`file/getAllFiles?creator=${data.creator}`);
      dispatch(setFilelist(result.data.fileresult));
    } catch (err) {
      toast.show("Server Error", {
        duration: 5000,
        type: "warning",
        placement: "bottom",
      });
    }
  };
}

export function setFilelist(data) {
  return { type: "setfilelist", data };
}

export function getAllFolders(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `folder/getAllFolders?creator=${data.creator}&path=${data.folderPath}`
      );
      dispatch(setFolderlist(result.data.folderList));
      dispatch(setFolderFilelist(result.data.fileList));
    } catch (err) {
      console.error(err);
    }
  };
}

export function setFolderlist(data) {
  return { type: "setFolderlist", data };
}

export function setFolderFilelist(data) {
  return { type: "setFolderFilelist", data };
}

export function setFolderPath(data) {
  console.warn(data);
  return { type: "setFolderPath", data };
}

export function getFolderList(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.get(
        `folder/getFolderList?creator=${data.creator}`
      );
      dispatch(setAllFolderlist(result.data.folderList));
    } catch (err) {
      console.error(err);
    }
  };
}

export function setAllFolderlist(data) {
  return { type: "setAllFolderlist", data };
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


export function deleteFile(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post(`file/delete`, data);
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


export function shareFile(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post(`file/share`, data);
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

export function deleteFolder(data, toast) {
  return async (dispatch) => {
    try {
      const result = await API.post(`folder/delete`, data);
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