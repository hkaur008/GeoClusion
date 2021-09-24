import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useHistory, Redirect } from "react-router-dom";
import ReactModal from "react-modal";
import * as FaIcons from "react-icons/fa";
import CSS from "csstype";
import {SubmitStyle, CustomStyle, StyledModal} from "./global";
import styled from "styled-components";
import { REFUSED } from "dns";
import { AuthContext } from "../context/context";

import Particle from "./Particle";

/**
 * Login page.
 * @component
 */
const Home = () => {
  let history = useHistory();
  const { loggedIn, tryLocalLogin, setLoggedIn, setUserData, setInviteCode } = useContext(AuthContext);
 
  useEffect(() => {
  
    tryLocalLogin();
  }, []);
  const [code, setCode] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }


  function handleSubmitCode() {
    // verify the code from db and fetch the details of org
    // redirect to dashboard having sidebar of questions
    console.log(code);
    RedirectDashboard(code);
  }

  const RedirectDashboard = async(inviteCode: any) =>{

    setInviteCode(inviteCode);
    await sessionStorage.setItem("inviteCode", inviteCode)
    history.push("/Dashboard");

  }

  function makeid(length:number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function  createCode() {
    var newCode = makeid(5);
    console.log(newCode);
    
    RedirectDashboard (newCode);
  }
  

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
          {/* <Header /> */}
          <div className="content-wrap">
            <div className="container-fluid">
              <div className="row main-content">
                <div className="company__info">
                  <h1 className="company_title">Let's Go!</h1>
                </div>
                <div className="login_form">
                  <div className="container-fluid">
                    <div className="invisibletext">
                      <p>Let's Go!</p>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row">
                      <CustomStyle onClick={createCode}>
                        Create New Organization
                      </CustomStyle>
                      <br></br>
                      <br></br>
                      <CustomStyle onClick={openModal}>
                        Join Existing Organization
                      </CustomStyle>

                      <StyledModal isOpen={modalIsOpen} ariaHideApp={false}>
                        <h2 style={{ color: "#008080" }}>Enter the Code:</h2>
                        <button
                          style={{
                            background: "#f4f7f8",
                            position: "absolute",
                            border: "none",
                            top: "20px",
                            right: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          {" "}
                          <FaIcons.FaTimes />
                        </button>
                        <input
                          value={code}
                          style={{ height: "25px" }}
                          onChange={(evt) => {
                            setCode(evt.target.value);
                          }}
                        />

                        <SubmitStyle onClick={handleSubmitCode} type="submit">
                          Submit
                        </SubmitStyle>
                      </StyledModal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
