import { Request, Response } from "express";
import { buildErrorMsg } from "../utils/methods";
import { getTransaction } from "../config/getSequelizeInstance";
import { getAllProducts } from "../services/products/getAllProducts";
import { createPurchaseOrder } from "../services/products/purchaseProduct";
import { getPendingPurchasesByClientId } from "../services/products/getPendingPurchasesByClientId";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const response = await getAllProducts();

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: buildErrorMsg("getting products"),
    });
  }
};

export const purchaseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const response = await createPurchaseOrder(req.body, transaction);

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: buildErrorMsg("getting products"),
    });
  }
};

export const getPendingOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const response = await getPendingPurchasesByClientId(
      String(req.query.clientId),
      transaction
    );

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: buildErrorMsg("getting products"),
    });
  }
};
