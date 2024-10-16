import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import { semSpacingM, semSpacingXs } from "../constants/variables";
import React from "react";

interface Error {
  statusText?: string;
  message?: string;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${semSpacingXs};
  margin: ${semSpacingM};
`;

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <StyledDiv>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText ?? error.message}</i>
      </p>
    </StyledDiv>
  );
};

export default ErrorPage;
