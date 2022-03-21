import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import { RootState } from "../store";
import { UserListContainer, ListTitle, Warning } from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { deleteData } from "../helper/message";

const UserListScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userList = useSelector((state: RootState) => state.userList);
  const { loading, error, userlist } = userList;
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state: RootState) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm(deleteData)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <UserListContainer>
      {loading ? (
        <LoadingView
          title={"Loading ..."}
          body={"We are processing the requested work."}
        />
      ) : error ? (
        <Warning>{error}</Warning>
      ) : userlist ? (
        <>
          <ListTitle>User Lists</ListTitle>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FIRSTNAME</th>
                <th scope="col">LASTNAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th scope="col">DELETE</th>
              </tr>
            </thead>
            <tbody>
              {userlist.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteHandler(user._id as string)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </UserListContainer>
  );
};

export default UserListScreen;
