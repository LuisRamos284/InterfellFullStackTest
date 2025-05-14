import type React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import {
  WalletRechargePayload,
  WalletRechargeSchema,
} from "../validations/walletRecharge";
import { Input } from "../components/input";
import { Container } from "../components/container";
import { FormButtons } from "../components/formButtons";
import { makeApiMutation } from "../hooks/useApi";
import { BaseRoute, RouteMethod } from "commons";
import { useTriggerToast } from "../hooks/useTriggerToast";
import { useState } from "react";

export default function WalletRecharge() {
  const [isLoading, setIsLoading] = useState(false);

  const { triggerErrorToast, triggerSuccessToast } = useTriggerToast();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletRechargePayload>({
    resolver: yupResolver(WalletRechargeSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const handleClear = () => {
    reset();
  };

  const onSubmit = async (payload: WalletRechargePayload): Promise<void> => {
    setIsLoading(true);
    const { error } = await makeApiMutation({
      path: `${BaseRoute.WALLET}/recharge`,
      method: RouteMethod.PATCH,
      body: payload,
    });

    if (error) {
      triggerErrorToast({ message: error.message.toString() });
    } else {
      triggerSuccessToast({ message: "Wallet Successfully recharged" });
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Wallet Recharge
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          register={register}
          controlId="rechargeAmount"
          label="Recharge Amount"
          placeholder="1000"
          type="number"
          errors={errors}
        />

        <Input
          register={register}
          controlId="phone"
          label="Phone Number"
          placeholder="+58123456"
          type="tel"
          errors={errors}
        />

        <Input
          register={register}
          controlId="document"
          label="Document"
          placeholder="V123456"
          type="text"
          errors={errors}
        />

        <FormButtons handleClear={handleClear} disabled={isLoading} />
      </form>
    </Container>
  );
}
