import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useMutation } from "@apollo/client";
import { LoginMutation, RegisterMutation } from "../../gql/gql_functions";
import { useDispatch, useSelector } from "react-redux";
import useRefreshReduxMe, { Me } from "../../hooks/useRefreshReduxMe";
import { getEmailFetch } from "../../common/validators/EmailValidator";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppState } from "../../store/AppState";
// import { getEmails } from "../../common/validators/EmailValidator";

const GLogin = () => {
  // const { execMe, updateMe } = useRefreshReduxMe();
  const { refetch, updateMe } = useRefreshReduxMe();
  const history = useHistory();
  const user = useSelector((state: AppState) => state.user);

  const [execRegister] = useMutation(RegisterMutation);
  const [execLogin] = useMutation(LoginMutation, {
    refetchQueries: [
      {
        query: Me,
      },
    ],
  });
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log("Response google: ", response);
    const email = response.profileObj.email;
    const userName = response.profileObj.name;
    const password = response.profileObj.googleId;
    // setConfirm(true);
    // await getEmails(email, dispatch);

    try {
      if (!(await getEmailFetch(email))) {
        console.log("Email is taken");

        await execRegister({
          variables: {
            email,
            userName,
            password,
          },
        });
      }

      const result = await execLogin({
        variables: {
          email,
          password,
        },
      });
      console.log("Result: ", result);
      refetch();

      // dispatch({ payload: result.data.login, type: "resultMsg" });

      updateMe();
    } catch (ex) {
      console.log("Error: ", ex);
    }
  };

  return (
    <>
      {/*{confirm ? (*/}
      {/*  <Button>Confirm</Button>*/}
      {/*) : (*/}
      <GoogleLogin
        clientId="289670306900-qd4kr7dadmffm0lv2vrvkadebolamou6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        // className="cancel-btn "

        // render={(renderProps) => (
        //   <button
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //     className="cancel-btn "
        //     style={{ marginLeft: ".5em" }}
        //   >
        //       <FontAwesomeIcon icon={faGofore} />Login
        //   </button>
        // )}
      />
      {/*)}*/}
    </>
  );
};

export default GLogin;
