import { Request, Response } from "express";
import { buildErrorMsg } from "../utils/methods";
import { getTransaction } from "../config/getSequelizeInstance";
import { rechargeClientWallet } from "../services/wallet/rechargeClientWallet";
import { getWalletByDocument } from "../services/wallet/getWalletByClientId";

export const rechargeWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const walletData = req.body;

    const response = await rechargeClientWallet(walletData, transaction);

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: buildErrorMsg("recharging the wallet"),
    });
  }
};

export const getClientWallet = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await getTransaction();
  try {
    const { phone, document } = req.query;

    const response = await getWalletByDocument(
      {
        phone: String(phone),
        document: String(document),
      },
      transaction
    );

    await transaction.commit();
    res.json(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: buildErrorMsg("recharging the wallet"),
    });
  }
};
