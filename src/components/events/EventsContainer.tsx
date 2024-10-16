import React from "react";
import { Row, Col, Typography } from "antd";
import EventCard from "./EventCard";
import styled from "styled-components";
import { semSpacingS, semSpacingXxs } from "../../constants/variables";
import { Event } from "../../constants/types";
import { StyledText, Wrapper } from "./EventsList";

const { Title } = Typography;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${semSpacingS};
  padding: ${semSpacingS};
  max-height: 580px;
`;

interface Props {
  title: string;
  containerStyle?: React.CSSProperties;
  cardButtonText?: string;
  events?: Event[];
  onCardButtonClick?: any;
  isLoading?: boolean;
  error: Error | null;
}

const EventsContainer: React.FC<Props> = ({
  title,
  containerStyle,
  cardButtonText,
  onCardButtonClick,
  events = [],
  isLoading,
  error,
}) => {
  return (
    <StyledContainer style={{ ...containerStyle }}>
      <div
        style={{
          width: "40%",
          borderBottom: "1px solid black",
          marginBottom: semSpacingXxs,
        }}
      >
        <Title
          style={{ textAlign: "center", marginTop: semSpacingXxs }}
          level={4}
        >
          {title}
        </Title>
      </div>

      {isLoading && (
        <Wrapper>
          <StyledText type="secondary">Loading...</StyledText>
        </Wrapper>
      )}

      {!!error && (
        <Wrapper>
          <StyledText type="danger">{error.message}</StyledText>
        </Wrapper>
      )}

      {!isLoading && !error && events.length === 0 ? (
        <Wrapper>
          {cardButtonText === "De-Register"
            ? "No registered events."
            : "No available events."}
        </Wrapper>
      ) : (
        <div style={{ overflow: "scroll" }}>
          <Row gutter={[16, 16]}>
            {events.map((event, idx) => {
              return (
                <Col
                  key={`col-${idx}`}
                  xs={{ flex: "50%" }}
                  sm={{ flex: "33%" }}
                  md={{ flex: "30%" }}
                  lg={{ flex: "25%" }}
                  style={{ transition: "all 0.5s ease" }}
                >
                  <EventCard
                    buttonText={cardButtonText}
                    onClick={onCardButtonClick}
                    {...event}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </StyledContainer>
  );
};

export default EventsContainer;
