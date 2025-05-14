import axios, { AxiosRequestConfig } from "axios";
import { RouteMethod, BaseRoute } from "commons";
import { Request, Response } from "express";
import { buildQueryParamsFromRequest } from "../utils/query";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getProductsConfig = {
      method: RouteMethod.GET,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/all`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};

export const purchaseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getProductsConfig = {
      method: RouteMethod.POST,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};

export const getPendingOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getProductsConfig = {
      method: RouteMethod.GET,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase/pending?${buildQueryParamsFromRequest(req)}`,
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};

export const confirmOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getProductsConfig = {
      method: RouteMethod.PUT,
      url: `${process.env.API_URL}/v1${BaseRoute.PRODUCTS}/purchase/confirm`,
      headers: {
        "content-type": "application/json",
      },
      data: req.body,
    };

    const response = await axios(getProductsConfig as AxiosRequestConfig);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "test",
    });
  }
};
