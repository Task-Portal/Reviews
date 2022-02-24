import { allowSubmit } from "../../components/auth/common/Helpers";

export interface EmailTestResult {
  message: string;
  isValid: boolean;
}

export const isEmailValid = (
  email: string,
  dispatch: { (value: any): void; (value: any): void }
) => {
  const isEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (email.length < 5) {
    allowSubmit(dispatch, "Email must be at least 5 characters", true);
  } else if (!isEmail.test(email)) {
    allowSubmit(dispatch, "It does not look like an email.", true);
  } else {
    getEmails(email, dispatch);
  }
};

const getEmails = (
  email: string,
  dispatch: (p: { payload: any; type: string }) => void
) => {
  (async () => {
    await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query Email($email: String!) {
    checkEmail(email: $email)
   
  }
        `,
        variables: { email: email },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data.checkEmail) {
          if (data.data.checkEmail === "Email is taken") {
            allowSubmit(dispatch, data.data.checkEmail, true);
          } else {
            allowSubmit(dispatch, "", false);
          }
        }
      });
  })();
};
