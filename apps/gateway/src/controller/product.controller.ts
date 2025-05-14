import axios, { AxiosRequestConfig } from "axios";
import { BaseRoute } from "commons";

import { buildQueryParamsFromRequest } from "../utils/query";
import { handleError } from "../utils/http";
import { HttpControllerRequest } from "./types";

export const getProducts = async ({
  res,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getProductsConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/all`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};

export const purchaseProduct = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getProductsConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};

export const getPendingOrders = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getProductsConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase/pending?${buildQueryParamsFromRequest(req)}`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};

export const confirmOrder = async ({
  res,
  req,
  defaultMessage,
  method,
}: HttpControllerRequest): Promise<void> => {
  try {
    const getProductsConfig = {
      method,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase/confirm`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    handleError({
      defaultMessage,
      error,
      res,
    });
  }
};
