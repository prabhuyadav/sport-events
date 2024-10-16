import React from "react";
import styled from "styled-components";
import { Button, Card, Typography } from "antd";
import moment from "moment";

import { semSpacingTiny, semSpacingXxs } from "../../constants/variables";
import { Event } from "../../constants/types";

const { Text } = Typography;

const StyledCard = styled(Card)<{ buttonText?: string }>`
  width: 305px;
  background-color: bisque;
  transition: all 0.6s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      props.buttonText === "Register" ? "darkseagreen" : "darkgray"};
  }
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${semSpacingXxs};
`;

const SportText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

const TimingsContainer = styled.div`
  display: inline-block;
`;

const TimingsText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  margin-right: ${semSpacingTiny};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${semSpacingXxs};
`;

const StyledButton = styled(Button)`
  background-color: rgb(0, 21, 41);
  color: white;
`;

const dateFormat = "MMM Do, h:mm a";

interface Props extends Event {
  buttonText?: string;
  onClick?: Function;
}

const getFormattedDateText = (startTime: string, endTime: string) => {
  const [day, start] = moment(startTime).format(dateFormat).split(",");
  const end = moment(endTime).format(dateFormat).split(",")[1];

  return `${start} - ${end}, ${day}`;
};

const EventCard: React.FC<Props> = ({
  _id: id,
  name,
  startTime,
  endTime,
  sport,
  buttonText = "Register",
  onClick,
}) => {
  return (
    <StyledCard title={name} bordered={false} buttonText={buttonText}>
      <StyledBody>
        <SportText>{sport}</SportText>
        <TimingsContainer>
          <TimingsText>Timings: </TimingsText>
          <Text>{getFormattedDateText(startTime, endTime)}</Text>
        </TimingsContainer>

        <ButtonContainer>
          <StyledButton onClick={() => onClick?.(id)}>
            {buttonText}
          </StyledButton>
        </ButtonContainer>
      </StyledBody>
    </StyledCard>
  );
};

export default EventCard;
