import * as yup from "yup";
import { ObjectSchema } from "yup";

export type WalletRechargePayload = {
  rechargeAmount: number;
  phone: string;
  document: string;
};

export const WalletRechargeSchema: ObjectSchema<WalletRechargePayload> =
  yup.object({
    rechargeAmount: yup.number().required(),
    phone: yup.string().required(),
    document: yup.string().required(),
  });
