import React, {FC, useReducer} from "react";
import {isPasswordValid, PasswordTestResult,} from "../../common/validators/PasswordValidator";
import ReactModal from "react-modal";
import ModalProps from "../types/ModalProps";
import "./Registration.css";
import userReducer from "../auth/common/UserReducer";
import {gql, useMutation} from "@apollo/client";
import {isEmailValid,} from "../../common/validators/EmailValidator";


const RegisterMutation = gql`
    mutation register(
        $email: String!
        $userName: String!
        $password: String!
    ) {
        register(
            email: $email
            userName: $userName
            password: $password

        )
    }
`;

const Registration: FC<ModalProps> = ({isOpen, onClickToggle}) => {
    const [execRegister] = useMutation(RegisterMutation);
    const [
        {
            userName,
            password,
            email,
            passwordConfirm,
            resultMsg,
            // isSubmitDisabled,

        },
        dispatch,
    ] = useReducer(userReducer, {
        userName: "",
        password: "",
        email: "",
        passwordConfirm: "",
        resultMsg: "",
        // isSubmitDisabled: true,
    });

    const IsSubmitDisabledFunc = () => {
        if (
            userName === "" ||
            password === "" ||
            email === "" ||
            passwordConfirm === ""
        ) {

            return true;
        }

        return false;
    };

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({payload: e.target.value, type: "userName"});
        if (!e.target.value) {
            dispatch({payload: "Username can not be empty", type: "resultMsg"});
        } else {
            dispatch({payload: "", type: "resultMsg"});
        }
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "email", payload: e.target.value});
        isEmailValid(e.target.value, dispatch);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({payload: e.target.value, type: "password"});
        const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

        if (!passwordCheck.isValid) {
            // allowSubmit(dispatch, passwordCheck.message, true);
            dispatch({payload: passwordCheck.message, type: "resultMsg"});
        } else  if  (resultMsg ===""){
            // allowSubmit(dispatch, passwordCheck.message, IsSubmitDisabledFunc());
            dispatch({payload: "", type: "resultMsg"});
        }
    };

    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (resultMsg ===""){

        dispatch({payload: e.target.value, type: "passwordConfirm"});
        isPasswordTheSame(password, e.target.value);
        }
    };

    const isPasswordTheSame = (
        passwordVal: string,
        passwordConfirmVal: string
    ) => {
        if (passwordVal !== passwordConfirmVal) {
            // allowSubmit(dispatch, "Passwords do not match", true);
            dispatch({payload: "Passwords do not match", type: "resultMsg"});
        } else {
            dispatch({payload: "", type: "resultMsg"});
            // allowSubmit(dispatch, resultMsg, IsSubmitDisabledFunc());
        }
    };

    const onClickRegister = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        try {
            const result = await execRegister({
                variables: {
                    email,
                    userName,
                    password
                },
            });

            dispatch({payload: result.data.register, type: "resultMsg"});

        } catch (ex) {
            // console.log(ex);
            dispatch({payload: "The email is taken", type: "resultMsg"});
        }
    };

    const onClickCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClickToggle(e);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            className="modal-menu"
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <form>
                <div className="req-inputs">
                    <div>
                        <input
                            type="text"
                            value={userName}
                            onChange={onChangeUserName}
                            placeholder="User name"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={email}
                            onChange={onChangeEmail}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password Confirmation"
                            value={passwordConfirm}
                            onChange={onChangePasswordConfirm}
                        />
                    </div>


                </div>
                <div className="reg-buttons">
                    <div className="reg-btn-left">
                        <button
                            style={{
                                marginLeft: ".5em",
                                background: IsSubmitDisabledFunc() ? "skyblue" : "deepskyblue",
                            }}
                            className="action-btn"
                            disabled={IsSubmitDisabledFunc()}
                            onClick={onClickRegister}
                        >
                            Register
                        </button>
                        <button
                            style={{marginLeft: ".5em"}}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                            Close
                        </button>
                    </div>
                    <span className="reg-btn-right">
            <strong>{resultMsg}</strong>
          </span>
                </div>
            </form>
        </ReactModal>
    );
};

export default Registration;
