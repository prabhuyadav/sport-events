import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EventsContainer from "./EventsContainer";
import { getAvailableEvents, registerEvent } from "../../api/service";
import { semSpacingS } from "../../constants/variables";
import { Alert, Modal } from "antd";
import { getFormattedErrorMessage } from "../../utils";
import { AxiosError } from "axios";
import { useAuth } from "../auth/AuthProvider";
import { Event, Status } from "../../constants/types";

const AvailableEvents: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`availableEvents`, userId],
    queryFn: getAvailableEvents,
    refetchOnWindowFocus: true,
  });

  const { mutate, error: mutationError } = useMutation({
    mutationKey: ["registerEvent"],
    mutationFn: registerEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`availableEvents`, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [`registeredEvents`, userId],
      });
    },
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
          description={getFormattedErrorMessage(mutationError as AxiosError)}
          type="error"
          style={{ margin: semSpacingS }}
          showIcon
        />
      </Modal>
      <EventsContainer
        events={data?.filter(
          (event: Event) => event.status !== Status.Cancelled
        )}
        isLoading={isPending}
        error={isError ? error : null}
        title="Available Events"
        onCardButtonClick={mutate}
      />
    </>
  );
};

export default AvailableEvents;
