export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Event {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  sport: string;
  status?: Status;
}

export interface NestError {
  error: string;
  message: string[];
  statusCode: number;
}

export enum Status {
  Open = "Open",
  InProgress = "InProgress",
  Cancelled = "Cancelled",
  Finished = "Finished",
}
