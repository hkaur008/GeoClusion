import React, { Component } from "react";
import Particles from "react-particles-js";

export default function Particle ({children}:any){
 
    return (
      <div
        style={{
          backgroundColor: "#101935",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        {/* <p>hey</p> */}
        <Particles
          style={{ height: "100vh", minHeight: "100vh" }}
          params={{
            particles: {
              number: {
                value: 70,
              },
              size: {
                value: 4,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
        {children}
      </div>
    );
  }


