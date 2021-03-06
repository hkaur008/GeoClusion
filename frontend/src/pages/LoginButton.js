import React,{ Component, useContext, useEffect }  from "react";
import "./Login.css";

import { Key } from "../Key";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import GoogleButton from "react-google-button";
import { useHistory, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { OAuth2Client } from "google-auth-library";
import { AuthContext } from "../context/context";
import Particle  from "./Particle"
import logo from "./logo.png";
// import { keyframes } from "styled-components";
// import { google } from "googleapis";
/**
 * Login page.
 * @component
 */
const LoginButton = () => {
  let history = useHistory();
    const {

       loggedIn,
       tryLocalLogin,
       setLoggedIn,
       setUserData,
      
     } = useContext(AuthContext);

  useEffect(async () => {
    let isAuth = await sessionStorage.getItem("loggedIn");
    if (isAuth) {
      history.push("/Home");
    }
    tryLocalLogin();
  }, []);

  const responseSuccessGoogle = (response) => {
    console.log("Email verified!");
    const client = new OAuth2Client(Key.GoogleClientID);
    const tokenId = response.tokenId;
    client
    .verifyIdToken({ idToken: tokenId, audience: Key.GoogleClientID })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;
      if(email_verified) {
        setUserData([name, email, picture]);
        setLoggedIn(true);
        var run = async () => {
          try {
            await sessionStorage.setItem("userData", [name, email, picture]); 
            await sessionStorage.setItem("loggedIn", true);
            console.log("Redirecting to Home Page...");
            history.push("/Home");
          } catch (err) {
            alert("Something went wrong!");
            console.log(err);
          }
        };
        run();
      }
      else{
        alert("Something went wrong!");
      }
  
    })

 
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
    alert("Something went wrong");
    
  };
  return (
    <div>
      <Particle />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="page-container" style={{ marginTop: "10%" }}>
          <div className="content-wrap">
            <div className="container-fluid">
              <div className="row main-content">
                <div className="company__info">
                  <h1 className="company_title">
                    <img src={logo} width="190" height="190" alt="Logo" marginTop="-10%"/>
                    <br />
                    Let's see people around you!
                  </h1>
                </div>
                <div className="login_form">
                  <div className="container-fluid">
                    <div className="invisibletext">
                      <p>Welcome to GeoClusion!</p>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row">
                      <GoogleLogin
                        render={(renderProps) => (
                          <GoogleButton onClick={renderProps.onClick} />
                        )}
                        clientId={Key.GoogleClientID}
                        buttonText="Login with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
