"use client";

import type React from "react";

import {
  ClientRegisterPayload,
  ClientRegisterSchema,
} from "../validations/registerClient";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Container } from "../components/container";
import { Input } from "../components/input";
import { FormButtons } from "../components/formButtons";
import { makeApiMutation } from "../hooks/useApi";
import { BaseRoute, RouteMethod } from "commons";

export default function ClientRegister() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientRegisterPayload>({
    resolver: yupResolver(ClientRegisterSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const handleClear = () => {
    reset();
  };

  const onSubmit = async (payload: ClientRegisterPayload): Promise<void> => {
    await makeApiMutation({
      path: `${BaseRoute.CLIENT}`,
      method: RouteMethod.POST,
      body: payload,
    });

    console.log(payload);
  };

  return (
    <Container>
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Client Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            register={register}
            controlId="firstName"
            label="First Name"
            placeholder="John"
            type="text"
            errors={errors}
          />

          <Input
            register={register}
            controlId="lastName"
            label="Last Name"
            placeholder="Doe"
            type="text"
            errors={errors}
          />
        </div>

        <Input
          register={register}
          controlId="email"
          label="Email"
          placeholder="john@doe.com"
          type="email"
          errors={errors}
        />

        <Input
          register={register}
          controlId="document"
          label="Document"
          placeholder="123234"
          type="number"
          errors={errors}
        />

        <Input
          register={register}
          controlId="phone"
          label="Phone Number"
          placeholder="+58123456789"
          type="tel"
          errors={errors}
        />

        <FormButtons handleClear={handleClear} />
      </form>
    </Container>
  );
}
