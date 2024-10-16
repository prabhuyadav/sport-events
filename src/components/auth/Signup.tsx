import React from "react";
import { AxiosError } from "axios";

import { signup } from "../../api/service";

import RegistrationForm from "./RegistrationForm";
import { useRegistration } from "../../hooks/useRegistration";

const Signup: React.FC = () => {
  const { mutate, error } = useRegistration("signup", signup);

  return <RegistrationForm onSubmit={mutate} error={error as AxiosError} />;
};

export default Signup;
