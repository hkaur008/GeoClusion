import React, { useState } from "react";
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
/**
 * Login page.
 * @component
 */
const Home = () => {
  let history = useHistory();
  const [code, setCode] = useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }


  function handleSubmitCode() {
    // verify the code from db and fetch the details of org
    // redirect to dashboard having sidebar of questions
    console.log(code);
  }

  const RedirectDashboard = () =>{
    history.push("/Dashboard");

  }

  return (
    <div className="page-container">
      <Header />
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
                  <CustomStyle onClick = {RedirectDashboard}>
                    Create New Organization
                  </CustomStyle>
                  <br></br>
                  <br></br>
                  <CustomStyle onClick={openModal}>
                    Join Existing Organization
                  </CustomStyle>

                  <StyledModal
                    isOpen={modalIsOpen}
                   
                    ariaHideApp={false}
                  >
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

                      <SubmitStyle
                        onClick={handleSubmitCode}
                        type="submit"
                      >
                        Submit
                      </SubmitStyle>
                  </StyledModal>
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

export default Home;
