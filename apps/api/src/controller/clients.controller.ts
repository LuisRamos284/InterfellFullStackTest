import { Request, Response } from "express";
import { getAllClients } from "../services/clients/getAllClients";
import { buildErrorMsg } from "commons";
import { getTransaction } from "../config/getSequelizeInstance";
import { registerNewClient } from "../services/clients/registerNewClient";

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

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const clientData = req.body;

    const response = await registerNewClient(clientData, transaction);

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message:
        (error as unknown as Error)?.message ||
        buildErrorMsg("registering client"),
    });
  }
};
