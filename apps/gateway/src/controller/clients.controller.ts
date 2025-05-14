import axios, { AxiosRequestConfig } from "axios";
import { BaseRoute } from "commons";
import { handleError } from "../utils/http";
import { HttpControllerRequest } from "./types";

export const getClients = async ({
  res,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getClientsConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.CLIENT}/all`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getClientsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};

export const registerClient = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const createClientConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.CLIENT}`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(createClientConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};
