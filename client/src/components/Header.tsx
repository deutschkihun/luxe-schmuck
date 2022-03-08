import React from "react";
import {
  HeaderSection,
  Grid,
  Title,
  MenuLogo,
  SearchLogo,
  CartLogo,
  UserLogo,
  MenuContainer,
  Listing,
} from "../helper/lib";

export const Header = (): JSX.Element => {
  return (
    <HeaderSection>
      <Grid>
        <SearchLogo href="/shop/search">
          <i className="fa fa-search fa-4" aria-hidden="true"></i>
        </SearchLogo>
        <MenuLogo href="/">
          <Title>LUXE SCHMUCK</Title>
        </MenuLogo>
        <CartLogo href="/cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </CartLogo>
        <UserLogo href="/login">
          <i className="fa fa-user" aria-hidden="true"></i>
        </UserLogo>
      </Grid>
      <Grid>
        <MenuContainer className="menu-toggle">
          <ul>
            <MenuLogo href="/product">
              <Listing>NEW</Listing>
            </MenuLogo>
            <MenuLogo href="/product">
              <Listing>WOMEN</Listing>
            </MenuLogo>
            <MenuLogo href="/product">
              <Listing>MEN</Listing>
            </MenuLogo>
            <MenuLogo href="/product">
              <Listing>ONLY HERE</Listing>
            </MenuLogo>
          </ul>
        </MenuContainer>
      </Grid>
    </HeaderSection>
  );
};
