import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const logout = async ({ history }) => {
  await sessionStorage.clear();
  history.push("/");
};

const addUserData = async (props) => {
  try {
    const res = await axios.post("/", props);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateUserData = async (props) => {
  try {
    const res = await axios.post("/", props);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsersData = async () => {
  try {
    const res = await axios.get("/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};



const AuthProvider = (props) => {
  const [inviteCode, setInviteCode] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [allUsersData, setAllUsersData] = useState([]);

    const tryLocalLogin = async () => {
    try {
      const inviteCode = await sessionStorage.getItem("inviteCode");
        const loggedIn = await sessionStorage.getItem("loggedIn");
        const userData = await JSON.parse(
          sessionStorage.getItem("userData") || "{}"
        );
        const allUsersData = await JSON.parse(
          sessionStorage.getItem("allUsersData") || "[]"
        );
        setInviteCode(inviteCode);
        setLoggedIn(loggedIn);
        setUserData(userData);
        setAllUsersData(allUsersData);
      }
    catch (err) {
      console.log(err);
    }}

    const authContextValue = {
        tryLocalLogin,
        loggedIn,
        setLoggedIn,
        userData,
        setUserData,
        allUsersData,
        setAllUsersData,
        addUserData,
        updateUserData,
        getAllUsersData,
        inviteCode,
        setInviteCode,
        logout,
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {props.children}
      </AuthContext.Provider>
    );
};
export { AuthProvider, AuthContext };
