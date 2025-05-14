import axios, { AxiosRequestConfig } from "axios";
import { RouteMethod, BaseRoute } from "commons";
import { Request, Response } from "express";
import { buildQueryParamsFromRequest } from "../utils/query";

export const rechargeWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rechargeWalletConfig = {
      method: RouteMethod.PATCH,
      url: `${process.env.API_URL}/v1${BaseRoute.WALLET}/recharge`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(rechargeWalletConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};

export const getClientWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getClientWalletConfig = {
      method: RouteMethod.GET,
      url: `${process.env.API_URL}/v1${BaseRoute.WALLET}/client?${buildQueryParamsFromRequest(req)}`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getClientWalletConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};
