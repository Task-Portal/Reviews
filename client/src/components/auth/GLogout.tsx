import React from "react";
import { GoogleLogout } from "react-google-login";

const GLogout = () => {
  const logout = () => {
    console.log("Response logout: ");
  };

  return (
    <GoogleLogout
      clientId="289670306900-qd4kr7dadmffm0lv2vrvkadebolamou6.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    />
  );
};

export default GLogout;
