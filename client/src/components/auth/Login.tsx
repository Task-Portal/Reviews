import React, { FC, useReducer } from "react";
import ReactModal from "react-modal";
import ModalProps from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import { gql, useMutation } from "@apollo/client";
import useRefreshReduxMe, { Me } from "../../hooks/useRefreshReduxMe";
import GLogin from "./GLogin";
import { LoginMutation } from "../../gql/gql_functions";

const Login: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
  const [execLogin] = useMutation(LoginMutation, {
    refetchQueries: [
      {
        query: Me,
      },
    ],
  });

  const [{ email, password, resultMsg, isSubmitDisabled }, dispatch] =
    useReducer(userReducer, {
      email: "alex@alex.com",
      password: "1",
      resultMsg: "",
      isSubmitDisabled: true,
    });
  // const { execMe, updateMe } = useRefreshReduxMe();
  const { refetch, updateMe } = useRefreshReduxMe();

  const onChangeUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "email", payload: e.target.value.trim() });
    if (!e.target.value) allowSubmit(dispatch, "Email cannot be empty", true);
    else allowSubmit(dispatch, "", true);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "password", payload: e.target.value.trim() });
    if (!e.target.value)
      allowSubmit(dispatch, "Password cannot be empty", true);
    else allowSubmit(dispatch, "", false);
  };

  const onClickLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const result = await execLogin({
      variables: {
        email,
        password,
      },
    });

    dispatch({ type: "resultMsg", payload: result.data.login });
    refetch();
    updateMe();
  };

  const onClickCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClickToggle(e);
  };

  return (
    <ReactModal
      className="modal-menu"
      isOpen={isOpen}
      onRequestClose={onClickToggle}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      {/*<form>*/}
      <div className="reg-inputs">
        <div>
          <label>email</label>
          <input type="text" value={email} onChange={onChangeUserEmail} />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
      </div>
      <div className="form-buttons form-buttons-sm">
        <div className="form-btn-left">
          <button
            style={{
              marginLeft: ".5em",
              background: isSubmitDisabled ? "skyblue" : "deepskyblue",
            }}
            className="action-btn"
            disabled={isSubmitDisabled}
            onClick={onClickLogin}
          >
            Login
          </button>
          <button
            style={{ marginLeft: ".5em" }}
            className="cancel-btn"
            onClick={onClickCancel}
          >
            Close
          </button>
          {/*Todo check if it can be accessed*/}
          {/*<GLogin />*/}
        </div>

        <span className="form-btn-left">
          <strong>{resultMsg}</strong>
        </span>
      </div>
      {/*</form>*/}
    </ReactModal>
  );
};

export default Login;
