import React from "react";
import { GoogleLogout } from "react-google-login";

const GLogout = () => {
  const logout = () => {
    console.log("Response logout: ");
  };

  return (
    <GoogleLogout
      // clientId="289670306900-qd4kr7dadmffm0lv2vrvkadebolamou6.apps.googleusercontent.com"
      clientId={`${process.env.REACT_APP_GOOGLE_KEY}`}
      buttonText="Logout"
      onLogoutSuccess={logout}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{ marginLeft: ".5em", borderRadius: "5px" }}
        >
          Google Logout
        </button>
      )}
    />
  );
};

export default GLogout;
