import axios, { AxiosRequestConfig } from "axios";
import { BaseRoute } from "commons";
import { buildQueryParamsFromRequest } from "../utils/query";
import { handleError } from "../utils/http";
import { HttpControllerRequest } from "./types";

export const rechargeWallet = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const rechargeWalletConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.WALLET}/recharge`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(rechargeWalletConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};

export const getClientWallet = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getClientWalletConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.WALLET}/client?${buildQueryParamsFromRequest(req)}`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getClientWalletConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};
