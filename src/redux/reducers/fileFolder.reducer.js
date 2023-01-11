const initialState = {
  filelist: [],
  folderlist: [],
  folderfilelist: [],
  allfolderlist: [],
  folderPath: '/'
};

export default function fileFolderReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setfilelist":
      temp.filelist = action.data;
      return temp;
    case "setFolderlist":
        temp.folderlist = action.data;
        return temp;
    case "setFolderFilelist":
        temp.folderfilelist = action.data;
        return temp;
    case "setFolderPath":
        temp.folderPath = action.data;
        return temp;
    case "setAllFolderlist":
        temp.allfolderlist = action.data;
        return temp;
   
    default:
      return temp;
  }
}
