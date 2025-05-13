import React, { PropsWithChildren } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  controlId: Path<T>;
  label: string;
  errors?: FieldErrors<T>;
  maxLength?: number;
}

export function Input<T extends FieldValues>({
  placeholder,
  type,
  register,
  controlId,
  label,
  errors,
  maxLength,
}: PropsWithChildren<InputProps<T>>) {
  return (
    <div>
      <label
        htmlFor={controlId}
        className="block text-sm font-medium text-blue-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={controlId}
        maxLength={maxLength}
        required
        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        {...register(controlId)}
      />
      {errors?.[controlId]?.message && (
        <p className="text-red-500 text-xs my-2 ml-3">
          {String(errors[controlId]?.message)}
        </p>
      )}
    </div>
  );
}
