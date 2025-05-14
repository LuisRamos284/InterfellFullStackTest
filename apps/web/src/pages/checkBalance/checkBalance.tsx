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
import { useTriggerToast } from "../../hooks/useTriggerToast";

export default function CheckBalance() {
  const [isLoading, setIsLoading] = useState(false);
  const { triggerErrorToast } = useTriggerToast();
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
    setIsLoading(true);
    const { response, error } =
      await makeApiGetRequest<WalletWithEventsResponse>({
        path: `${BaseRoute.WALLET}/client`,
        query: payload,
      });

    if (error) {
      triggerErrorToast({ message: error.message.toString() });
      setWallet(null);

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

        <FormButtons handleClear={handleClear} disabled={isLoading} />
      </form>

      <Balance wallet={wallet} />
    </Container>
  );
}
