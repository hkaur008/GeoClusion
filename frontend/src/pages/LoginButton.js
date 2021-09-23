import React from "react";
import "./Login.css";

import { Key } from "../Key";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import GoogleButton from "react-google-button";
import { useHistory, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";


/**
 * Login page.
 * @component
 */
const LoginButton = () => {
    let history = useHistory();
  const responseSuccessGoogle = (response) => {
    console.log("Email verified!");
    history.push("/Home");
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
    alert("Something went wrong");
    
  };
  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
        <div className="container-fluid">
          <div className="row main-content">
            <div className="company__info">
              <h1 className="company_title">Welcome Back!</h1>
            </div>
            <div className="login_form">
              <div className="container-fluid">
                <div className="invisibletext">
                  <p>Welcome Back!</p>
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
      <Footer />
    </div>
  );
};

export default LoginButton;
