import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/actions/auth.action";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  // let location = props.router.location;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const decodedJwt = parseJwt(accessToken);

      if (decodedJwt.exp * 24 * 60 * 60 * 1000 < Date.now()) {
        dispatch(logout());
      }
    }
  }, [location]);

  return <div></div>;
};

export default AuthVerify;