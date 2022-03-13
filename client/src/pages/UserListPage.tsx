import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import { RootState } from "../store";
import { Warning } from "../helper/lib";
import { LoadingView } from "../components/LoadingView";
import { deleteAccount } from "../helper/message";

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
    if (window.confirm(deleteAccount)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container">
      <h3 className="admin__list__title">USERS</h3>
      <div className="admin__list">
        {loading ? (
          <LoadingView
            title={"Loading ..."}
            body={"We are processing the requested work."}
          />
        ) : error ? (
          <Warning>{error}</Warning>
        ) : userlist ? (
          <table className="admin__list__table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {userlist.users?.map((user, index) => (
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
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td className="admin__list__btn">
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button className="btn admin__list__edit">
                          <i className="fas fa-edit"></i>
                        </button>
                      </Link>
                    </td>
                    <td className="admin__list__btn">
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
          </table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserListScreen;
