const initialState = {
  contactlist: [],
  contactEmailInfo: [],
  contactMessageInfo: [],
  unreadlist: [],
  contactPersonal: [],
  showEmail: "",
  accountlist: [],
  emptynotice: true,
  category: 'Both',
  focus_folloing: 'Both',
  selected: -1,
};

export default function contactReducer(state = initialState, action) {
  const temp = { ...state };
  switch (action.type) {
    case "setContactlist":
      temp.contactlist = action.data;
      return temp;
    case "setContactInfo":
      temp.contactInfo = action.data;
      return temp;
    case "setContactEmailInfo":
      temp.contactEmailInfo = action.data;
      return temp;
    case "setContactMessageInfo":
      temp.contactMessageInfo = action.data;
      return temp;
    case "setUnreadlist":
      temp.unreadlist = action.data.infos;
      temp.emptynotice = action.data.empty;
      return temp;
    case "setPersonInfo":
      temp.contactPersonal = action.data;
      return temp;
    case "setEmail":
      temp.showEmail = action.data;
      return temp;
    case "setAccountlist":
      temp.accountlist = action.data;
      return temp;
    case "setData":
      temp[action.data.field] = action.data.value;
      return temp;
    default:
      return temp;
  }
}
