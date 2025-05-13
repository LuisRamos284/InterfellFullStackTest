import * as yup from "yup";
import { ObjectSchema } from "yup";

export type PayPayload = {
  token: string;
};

export const PaySchema: ObjectSchema<PayPayload> = yup.object({
  token: yup.string().length(6, "Token must be 6 digits").required(),
});
