const initialState = {
  infocardlist: [],
  signInUpData: [],
};

export default function infocardReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setInfocardlist":
      temp.infocardlist = action.data;
      return temp;
    case "setSignInUpdata":
      temp.signInUpData = action.data;
      return temp;
    default:
      return temp;
  }
}
