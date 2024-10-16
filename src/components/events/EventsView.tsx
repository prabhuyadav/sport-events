import React from "react";
import { Splitter } from "antd";

import { useAuth } from "../auth/AuthProvider";
import EventsList from "./EventsList";
import AvailableEvents from "./AvailableEvents";
import RegisteredEvents from "./RegisteredEvents";

const { Panel } = Splitter;

const EventsView: React.FC = () => {
  const { token } = useAuth();

  return token ? (
    <Splitter
      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: 8 }}
    >
      <Panel collapsible defaultSize="50%" min="20%" max="70%">
        <AvailableEvents />
      </Panel>
      <Panel collapsible>
        <RegisteredEvents />
      </Panel>
    </Splitter>
  ) : (
    <EventsList />
  );
};

export default EventsView;
