import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EventsContainer from "./EventsContainer";
import { deRegisterEvent, getRegisteredEvents } from "../../api/service";
import { useAuth } from "../auth/AuthProvider";

const RegisteredEvents: React.FC = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`registeredEvents`, userId],
    queryFn: getRegisteredEvents,
    refetchOnWindowFocus: true,
  });

  const { mutate } = useMutation({
    mutationKey: ["deRegisterEvent"],
    mutationFn: deRegisterEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availableEvents", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["registeredEvents", userId],
      });
    },
  });

  return (
    <EventsContainer
      title="Registered Events"
      cardButtonText="De-Register"
      isLoading={isPending}
      error={isError ? error : null}
      events={data}
      onCardButtonClick={mutate}
    />
  );
};

export default RegisteredEvents;
