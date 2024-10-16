import axios from "axios";
import { User } from "../constants/types";

export const API_BASE_URL = "http://localhost:3000";

const service = axios.create({
  baseURL: API_BASE_URL,
});

export const signup = async (user: User) => {
  const response = await service.post("/auth/signup", {
    ...user,
  });

  return response.data;
};

export const login = async (user: Omit<User, "name">) => {
  const response = await service.post("/auth/login", { ...user });

  return response.data;
};

export const fetchEvents = async () => {
  const response = await service.get("/events");

  return response.data;
};

export const registerEvent = async (eventId: string) => {
  const response = await service.post(
    "/events/register",
    { eventId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response.data;
};

export const deRegisterEvent = async (eventId: string) => {
  const response = await service.post(
    "/events/deRegister",
    { eventId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response.data;
};

export const getAvailableEvents = async () => {
  const response = await service.get("/listAvailableEvents", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};

export const getRegisteredEvents = async () => {
  const response = await service.get("/listRegisteredEvents", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response.data;
};
