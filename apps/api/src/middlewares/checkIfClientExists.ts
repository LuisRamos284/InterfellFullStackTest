import { NextFunction, Request, Response } from "express";
import { checkClientDataInDb } from "../models/Client/dbMethods/checkClientDataInDb";

export async function checkIfClientExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const clientExist = await checkClientDataInDb(req.body);

    if (clientExist) {
      res
        .status(400)
        .json({ message: "Email, Phone or Document are already being used." });
      return;
    } else {
      next();
    }
  } catch (e) {
    const error = new Error((e as Error).message);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.next!(error);
  }
}
