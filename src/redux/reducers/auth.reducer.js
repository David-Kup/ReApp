const initialState = {
  currentUser: localStorage.user ? JSON.parse(localStorage.user) : "",
  tempemail: "",
  tempcode: "",
};

export default function authReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setUser":
      temp.currentUser = action.data;
      return temp;
    case "settempemail":
      temp.tempemail = action.data;
      return temp;
    case "settempcode":
      temp.tempcode = action.data;
      return temp;
    default:
      return temp;
  }
}
