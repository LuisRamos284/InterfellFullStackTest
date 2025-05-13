import * as yup from "yup";
import { ObjectSchema } from "yup";

export type CheckBalancePayload = {
  document: string;
  phone: string;
};

export const CheckBalanceSchema: ObjectSchema<CheckBalancePayload> = yup.object(
  {
    document: yup.string().required(),
    phone: yup.string().required(),
  }
);
