import { Request, Response } from "express";
import { buildErrorMsg } from "../utils/methods";
import { getTransaction } from "../config/getSequelizeInstance";
import { getAllProducts } from "../services/products/getAllProducts";

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
