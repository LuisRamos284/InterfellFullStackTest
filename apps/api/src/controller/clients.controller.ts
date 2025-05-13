import { Request, Response } from "express";
import { getAllClients } from "../services/getAllClients";
import { buildErrorMsg } from "../utils/methods";

export const getClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getAllClients();
    res.json(response);
  } catch (error) {
    res.status(500).send({
      message: buildErrorMsg("retrieving the clients"),
    });
  }
};
