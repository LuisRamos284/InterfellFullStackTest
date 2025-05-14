import { Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { BaseRoute, RouteMethod } from "commons";

export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getClientsConfig = {
      method: RouteMethod.GET,
      url: `${process.env.API_URL}/v1${BaseRoute.CLIENT}/all`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getClientsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const createClientConfig = {
      method: RouteMethod.POST,
      url: `${process.env.API_URL}/v1${BaseRoute.CLIENT}`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(createClientConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};
