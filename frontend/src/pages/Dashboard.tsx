import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import MapFrame from "./map/mapframe";

export default function Dashboard() {
  const {
    loggedIn,
    tryLocalLogin,
    setLoggedIn,
    setUserData,
    setInviteCode,
    inviteCode,
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return (
  <>

    {/* <p style = {{marginLeft:"20%"}}>Invite Code: {inviteCode}</p> */}
    {/* <Map/> */}
    <MapFrame/>

  </>
  )

}
