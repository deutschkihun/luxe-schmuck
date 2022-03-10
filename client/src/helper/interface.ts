import { FieldError, UseFormRegister } from "react-hook-form";

export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
  message?: string;
}

export interface findPassword {
  firstName: string;
  lastName: string;
  email: string;
  find?: boolean;
  message?: string;
  code?: number;
}

export interface resetPassword {
  code?: number;
  password?: string;
  email: string;
  reset: boolean;
  message: string;
}

export interface ErrorProps {
  name: string;
  errors: { [x: string]: FieldError } | undefined;
}

export interface LabelProps {
  label: string;
}

export interface TitleProps {
  title: string;
}

export type InputProps<T> = {
  placeholder: string;
  register: UseFormRegister<T>;
  registerValue:
    | "email"
    | "password_confirm"
    | "password"
    | "firstName"
    | "lastName";
  pattern?: RegExp;
  message?: string;
  type?: string;
};
