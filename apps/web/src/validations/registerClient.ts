import * as yup from "yup";
import { ObjectSchema } from "yup";

export type ClientRegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  document: number;
  phone: string;
};

export const ClientRegisterSchema: ObjectSchema<ClientRegisterPayload> =
  yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    document: yup.number().required(),
    phone: yup.string().required(),
  });
