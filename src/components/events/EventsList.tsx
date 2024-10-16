import React, { PropsWithChildren, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Alert, Modal, Typography } from "antd";

import EventsContainer from "./EventsContainer";
import { fetchEvents, registerEvent } from "../../api/service";
import { semSpacingS } from "../../constants/variables";
import { Event, Status } from "../../constants/types";

const { Text } = Typography;

const StyledDiv = styled.div`
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

export const StyledText = styled(Text)`
  font-size: 24px;
  font-weight: 500;
`;

export const Wrapper = ({ children }: PropsWithChildren) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const EventsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    refetchOnWindowFocus: true,
  });

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerEvent,
    onError: () => setIsModalOpen(true),
  });

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Alert
          message="Error"
          description={"Please signup/login to be able to register for events."}
          type="error"
          style={{ margin: semSpacingS }}
          showIcon
        />
      </Modal>
      <EventsContainer
        title="All Events"
        events={data?.filter(
          (event: Event) => event.status !== Status.Cancelled
        )}
        isLoading={isPending}
        error={isError ? error : null}
        containerStyle={{ padding: 0 }}
        onCardButtonClick={mutate}
      />
    </>
  );
};

export default EventsList;
