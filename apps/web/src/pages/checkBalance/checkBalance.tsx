import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  CheckBalancePayload,
  CheckBalanceSchema,
} from "../../validations/checkBalance";
import { Input } from "../../components/input";
import { Balance } from "./balance";
import { Container } from "../../components/container";
import { FormButtons } from "../../components/formButtons";
import { BaseRoute, WalletWithEventsResponse } from "commons";
import { makeApiGetRequest } from "../../hooks/useApi";

export default function CheckBalance() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckBalancePayload>({
    resolver: yupResolver(CheckBalanceSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const [wallet, setWallet] = useState<WalletWithEventsResponse | null>(null);

  const handleClear = () => {
    reset();
  };

  const onSubmit = async (payload: CheckBalancePayload): Promise<void> => {
    const { response, error } =
      await makeApiGetRequest<WalletWithEventsResponse>({
        path: `${BaseRoute.WALLET}/client`,
        query: payload,
      });

    console.log(error);
    //TODO HANDLE ERROR
    if (error) {
      setWallet(null);
      console.log(error);
      return;
    }

    setWallet(response);
  };

  return (
    <Container>
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Check Wallet Balance
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <Input
          register={register}
          controlId="document"
          label="Document"
          placeholder="Insert Document"
          type="text"
          errors={errors}
        />

        <Input
          register={register}
          controlId="phone"
          label="Phone"
          placeholder="Insert Phone"
          type="tel"
          errors={errors}
        />

        <FormButtons handleClear={handleClear} />
      </form>

      <Balance wallet={wallet} />
    </Container>
  );
}
