import React from "react";
import { AxiosError } from "axios";

import RegistrationForm from "./RegistrationForm";
import { useRegistration } from "../../hooks/useRegistration";
import { login } from "../../api/service";

const Login: React.FC = () => {
  const { mutate, error } = useRegistration("login", login);

  return (
    <RegistrationForm
      onSubmit={mutate}
      error={error as AxiosError}
      buttonText="Login"
      hideNameInput
    />
  );
};

export default Login;
