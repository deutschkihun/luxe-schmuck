import React from "react";
import {
  Github,
  LinkedIn,
  Mail,
  Message,
  SubmitButton,
  SubTitle,
  Wrapper,
} from "../helper/lib";

export const AboutPage = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <SubTitle>About LUXE SCHMUCK</SubTitle>
        <Message>
          This page shows beautiful data visualization in various forms in web
          browsers using javascript and React, HTML, CSS, and D3. D3 is a
          JavaScript library for manipulating documents based on data. D3’s
          emphasis on web standards gives you the full capabilities of modern
          browsers without tying yourself to a proprietary framework, combining
          powerful visualization components and a data-driven approach to DOM
          manipulation.
        </Message>
        <SubmitButton
          style={{ width: "auto" }}
          onClick={() =>
            window.location.assign(
              "https://github.com/deutschkihun/luxeschmuck"
            )
          }
        >
          Link to source code
        </SubmitButton>
      </Wrapper>
      <Wrapper>
        <SubTitle>Profile</SubTitle>
        <h4>Kihun Kim</h4>
        <Message>
          LUXE SCHMUCK is made by Kihun Kim. He is currently junior frontend
          engineer at PACE Telematics in Germany. He is in charge of web
          development of the PACE Drive App at PACE Telematics. Specifically,
          this app is an all-in-one application that contains all the functions
          necessary for refueling such as handling enter fueling process with
          smartphone, Mobile payment real-time fuel price comparision, gas
          station search, and friend referral discount system.
        </Message>
        <SubmitButton
          style={{ width: "auto" }}
          onClick={() => window.location.assign("https://deutschkihun.com")}
        >
          Get to Know more about Kihun
        </SubmitButton>
        <br />
        <Mail
          onClick={() =>
            window.location.assign("mailto:deutschkihun@gmail.com")
          }
        />
        <LinkedIn
          onClick={() =>
            window.location.assign(
              "https://www.linkedin.com/in/kihun-kim-b35b73174/"
            )
          }
        />
        <Github
          onClick={() =>
            window.location.assign("https://github.com/deutschkihun")
          }
        />
      </Wrapper>
      <Wrapper>
        <SubTitle>His other Projects</SubTitle>
        <Message>
          In addition to LUXE SCHMUCK, he has other great projects that he has
          worked on his own.
        </Message>
        <SubmitButton
          style={{ width: "auto" }}
          onClick={() =>
            window.location.assign("https://d3-react-exhibition.herokuapp.com/")
          }
        >
          D3 & React Exhibition
        </SubmitButton>
        <br />
        <SubmitButton
          style={{ width: "auto" }}
          onClick={() =>
            window.location.assign(
              "https://sportdbapp-deutschkihun.herokuapp.com/"
            )
          }
        >
          Sport DB Application
        </SubmitButton>
        <br />
        <SubmitButton
          style={{ width: "auto" }}
          onClick={() =>
            window.location.assign(
              "https://login-boilerplate-deutschkihun.herokuapp.com/"
            )
          }
        >
          Login-Sys boilerplate
        </SubmitButton>
      </Wrapper>
    </>
  );
};
