import React from "react";
import { useSelector } from "react-redux";
import {
  HeaderSection,
  Grid,
  Title,
  MenuLogo,
  CartLogo,
  UserLogo,
  Listing,
  MenuDeco,
  MenuContainer1,
  MenuContainer2,
  MenuContainer3,
  MenuContainer4,
  MenubarLogo,
  DropdowLogo,
} from "../helper/lib";
import { RootState } from "../store";
import { MenuDropdown, ProfileDropdown } from "./Dropdown";

export const Header = (): JSX.Element => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <HeaderSection>
      <Grid>
        {userInfo ? (
          <DropdowLogo>
            <ProfileDropdown />
          </DropdowLogo>
        ) : (
          <UserLogo href="/login">
            <i className="fa fa-user" aria-hidden="true" />
          </UserLogo>
        )}
        <MenuLogo className="logo-toggle" href="/">
          <Title>LUXE SCHMUCK</Title>
        </MenuLogo>
        <MenubarLogo className="toggle-btn">
          <MenuDropdown />
        </MenubarLogo>

        {userInfo ? (
          <CartLogo href="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true" />
          </CartLogo>
        ) : (
          <CartLogo href="/about">
            <i className="fa fa-info" aria-hidden="true"></i>
          </CartLogo>
        )}
      </Grid>
      <Grid>
        <MenuContainer1 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing>NEW</Listing>
            </MenuDeco>
          </ul>
        </MenuContainer1>
        <MenuContainer2 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing>ONLY</Listing>
            </MenuDeco>
          </ul>
        </MenuContainer2>
        <MenuContainer3 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing>MEN</Listing>
            </MenuDeco>
          </ul>
        </MenuContainer3>
        <MenuContainer4 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing>WOMEN</Listing>
            </MenuDeco>
          </ul>
        </MenuContainer4>
      </Grid>
    </HeaderSection>
  );
};
