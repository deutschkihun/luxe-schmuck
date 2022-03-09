import React from "react";
import { logout } from "../reducer/userReducer";
import { useDispatch } from "react-redux";

export const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
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

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item" href="/profile">
          Profile
        </a>
        <a className="dropdown-item" onClick={logoutHandler}>
          Logout
        </a>
      </div>
    </div>
  );
};
