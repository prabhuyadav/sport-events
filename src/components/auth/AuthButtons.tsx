import React from "react";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { semSpacingXs } from "../../constants/variables";
import { useAuth } from "./AuthProvider";

const StyledDiv = styled.div`
  display: flex;
  gap: ${semSpacingXs};
  margin-left: auto;
`;

const loginPath = "/login";
const signupPath = "/signup";

const AuthButtons: React.FC = () => {
  const { token, setToken } = useAuth();
  const { pathname } = useLocation();

  const content = token ? (
    <Button onClick={() => setToken?.(null)}>Logout</Button>
  ) : (
    <>
      {pathname !== loginPath && (
        <Link to={loginPath}>
          <Button>Login</Button>
        </Link>
      )}

      {pathname !== signupPath && (
        <Link to={signupPath}>
          <Button>SignUp</Button>
        </Link>
      )}
    </>
  );

  return <StyledDiv>{content}</StyledDiv>;
};

export default AuthButtons;
