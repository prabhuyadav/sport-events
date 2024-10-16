import { AxiosError } from "axios";
import { NestError } from "./constants/types";

export const getFormattedErrorMessage = (error: AxiosError) => {
  if (!error) {
    return "Error Occurred";
  }
  const messages = (error?.response?.data as NestError)?.message;

  return messages
    ? Array.isArray(messages)
      ? messages.join(", ")
      : messages
    : error.message;
};
