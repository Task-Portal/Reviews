export interface PasswordTestResult {
  message: string;
  isValid: boolean;
}

export const isPasswordValid = (password: string): PasswordTestResult => {
  const passwordTestResult: PasswordTestResult = {
    message: "",
    isValid: true,
  };

  if (password.length < 1) {
    passwordTestResult.message = "Password must be at least 1 characters";
    passwordTestResult.isValid = false;
    return passwordTestResult;
  }

  const strongPassword = new RegExp(
    "^[a-zA-Z0-9]+$"
  );
  if (!strongPassword.test(password)) {
    passwordTestResult.message =
      "Password must contain at least 1 character";
    passwordTestResult.isValid = false;
  }

  return passwordTestResult;
};
