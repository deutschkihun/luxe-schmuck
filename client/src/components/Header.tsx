import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Menu } from "antd";
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
import { logout } from "../reducer/userReducer";
import { RootState } from "../store";

export const Header = (): JSX.Element => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<i className="fa-solid fa-angles-down"></i>}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<i className="fa-solid fa-angles-down"></i>}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<i className="fa-solid fa-angles-down"></i>}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
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
        {userInfo ? (
          <Dropdown overlay={menu}>
            <Button>Button</Button>
          </Dropdown>
        ) : (
          <UserLogo href="/login">
            <i className="fa fa-user" aria-hidden="true"></i>
          </UserLogo>
        )}
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
