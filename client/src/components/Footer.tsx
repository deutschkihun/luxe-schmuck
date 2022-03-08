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
        <FooterLink href="/newletter">Newletter</FooterLink>
        <FooterLink href="/about">About Us</FooterLink>
        <FooterLink href="contact">Contact</FooterLink>
      </FooterNavigation>
    </FooterSection>
  );
};
