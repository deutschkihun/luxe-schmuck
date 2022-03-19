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
          LUXE SCHMUCK is a combination of French and German, meaning luxury
          accessories. LUXE SCHMUCK is an e-commerce platform that helps many
          users purchase luxury products online. We do not actually sell the
          items posted in this project. Please note that the posted items are
          data generated for example. This project allows you to register and
          delete products through an administrator account. You can also manage
          accounts registered with LUXE SCHMUCK. Users can search, fill, and get
          more information as well as order and pay through LUXE SCHMUCK.
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
