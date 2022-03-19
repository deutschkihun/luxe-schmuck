import React from "react";
import {
  FooterSection,
  FooterBreadCrumb,
  FooterNavigation,
  FooterLink,
} from "../helper/lib";

export const Footer = (): JSX.Element => {
  return (
    <FooterSection>
      <FooterBreadCrumb>LUXE SCHMUCK</FooterBreadCrumb>
      <FooterNavigation>
        <FooterLink href="/about">About US</FooterLink>
      </FooterNavigation>
    </FooterSection>
  );
};
