import { AxiosError } from "axios";
import { Response } from "express";

interface HandleErrorProps {
  res: Response;
  error: unknown;
  defaultMessage: string;
}

export const handleError = ({
  res,
  error,
  defaultMessage,
}: HandleErrorProps): void => {
  if (error instanceof AxiosError && error.response) {
    const { status, data } = error.response;
    const message = data?.message || defaultMessage;

    res.status(status).json({ message });
  } else {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: defaultMessage });
  }
};
