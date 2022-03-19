import React from "react";
import { logoutUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export const ProfileDropdown = (): JSX.Element => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="dropdown show">
      <a
        className="btn btn-secondary btn-sm dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ margin: "1rem" }}
      >
        MY LS
      </a>

      <div
        className="dropdown-menu dropdown-menu"
        aria-labelledby="dropdownMenuLink"
      >
        <a className="dropdown-item" href="/profile">
          Profile
        </a>
        <a className="dropdown-item" href="/login" onClick={logoutHandler}>
          Logout
        </a>
        {userInfo?.isAdmin && (
          <>
            <a className="dropdown-item" href="/admin/userlist">
              Users
            </a>
            <a className="dropdown-item" href="/admin/productlist">
              Products
            </a>
            <a className="dropdown-item" href="/login">
              Orders
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export const MenuDropdown = (): JSX.Element => {
  return (
    <div className="dropdown show">
      <a
        className="btn btn-secondary btn-sm dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ margin: "1rem" }}
      >
        MENU LS
      </a>

      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuLink"
      >
        <a className="dropdown-item" href="/">
          LUXE SCHMUCK
        </a>
        <a className="dropdown-item" href="/product">
          NEW
        </a>
        <a className="dropdown-item" href="/product">
          ONLY
        </a>
        <a className="dropdown-item" href="/product">
          MEN
        </a>
        <a className="dropdown-item" href="/product">
          WOMEN
        </a>
      </div>
    </div>
  );
};
