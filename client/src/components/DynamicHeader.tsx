import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
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
  DynamicHeaderSection,
  TransactionsLogo,
} from "../helper/lib";
import { RootState } from "../store";
import { MenuDropdown, ProfileDropdown } from "./Dropdown";
import style from "./Style.js";

export const DynamicHeader = (): JSX.Element => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const [hover, setHover] = useState(false);

  return (
    <DynamicHeaderSection>
      <Grid
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        style={{
          ...style.normal,
          ...(hover ? style.hover : null),
        }}
      >
        {userInfo ? (
          <DropdowLogo>
            <ProfileDropdown />
          </DropdowLogo>
        ) : (
          <UserLogo href="/login">
            <i
              onMouseOver={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              style={{
                ...style.normal,
                ...(hover ? style.hover : null),
              }}
              className="fa fa-user"
              aria-hidden="true"
            />
          </UserLogo>
        )}
        <MenuLogo className="logo-toggle" href="/">
          <Title
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            style={{
              borderBottom: "none",
              ...style.normal,
              ...(hover ? style.hover : null),
            }}
          >
            LUXE SCHMUCK
          </Title>
        </MenuLogo>
        <MenubarLogo className="toggle-btn">
          <MenuDropdown />
        </MenubarLogo>

        {userInfo ? (
          <>
            <TransactionsLogo href="/transactions">
              <i
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
                className="fa fa-table"
                aria-hidden="true"
              ></i>
            </TransactionsLogo>
            <CartLogo href="/cart">
              <i
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
                className="fa fa-shopping-cart"
                aria-hidden="true"
              />
            </CartLogo>
          </>
        ) : (
          <CartLogo href="/about">
            <i
              onMouseOver={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              style={{
                ...style.normal,
                ...(hover ? style.hover : null),
              }}
              className="fa fa-info"
              aria-hidden="true"
            ></i>
          </CartLogo>
        )}
      </Grid>
      <Grid
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        style={{
          ...style.normal,
          ...(hover ? style.hover : null),
        }}
      >
        <MenuContainer1 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
              >
                NEW
              </Listing>
            </MenuDeco>
          </ul>
        </MenuContainer1>
        <MenuContainer2 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
              >
                ONLY
              </Listing>
            </MenuDeco>
          </ul>
        </MenuContainer2>
        <MenuContainer3 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
              >
                MEN
              </Listing>
            </MenuDeco>
          </ul>
        </MenuContainer3>
        <MenuContainer4 className="menu-toggle">
          <ul>
            <MenuDeco href="/product">
              <Listing
                onMouseOver={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
                style={{
                  ...style.normal,
                  ...(hover ? style.hover : null),
                }}
              >
                WOMEN
              </Listing>
            </MenuDeco>
          </ul>
        </MenuContainer4>
      </Grid>
    </DynamicHeaderSection>
  );
};
