import React from "react";
import styled from "styled-components";
import { Typography, Layout, theme } from "antd";
import {
  semSpacingM,
  semSpacingXl,
  semSpacingXs,
} from "../constants/variables";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthButtons from "./auth/AuthButtons";
import EventsView from "./events/EventsView";
import { useAuth } from "./auth/AuthProvider";

const { Text } = Typography;

const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

const StyledContent = styled(Content)`
  padding: ${semSpacingM} ${semSpacingXl};
`;

const StyledText = styled(Text)`
  color: white;
  font-size: 14px;
  font-weight: 700;
`;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { token } = useAuth();

  return (
    <Layout>
      <StyledHeader>
        <Link to="/">
          <StyledText>SEM</StyledText>
        </Link>
        <AuthButtons />
      </StyledHeader>
      <StyledContent>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 580,
            padding: token ? 0 : semSpacingM,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </StyledContent>
      <Footer style={{ textAlign: "center", minHeight: 100 }}>
        Sporting Events Manager ©{new Date().getFullYear()} Created by Prabhu
        Yadav P.S.
      </Footer>
    </Layout>
  );
};

export default App;
