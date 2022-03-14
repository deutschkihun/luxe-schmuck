import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  ErrorProps,
  IFormInputs,
  InputProps,
  LabelProps,
  TitleProps,
} from "./interface";
import { Input, Label, TextArea, Title, Warning } from "./lib";

export const LabelComponent = (props: LabelProps): JSX.Element => {
  return <Label>{props.label}</Label>;
};

export const TitleComponent = (props: TitleProps): JSX.Element => {
  return <Title>{props.title}</Title>;
};

export const ErrorMessageComponent = (props: ErrorProps): JSX.Element => {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(([type, message]) =>
              props.name === "password_confirm" && type === "validate" ? (
                <Warning key="validate">The password does not match</Warning>
              ) : (
                <Warning key={type}>{message}</Warning>
              )
            )
          : null;
      }}
    />
  );
};

export const InputComponent = (props: InputProps<IFormInputs>): JSX.Element => {
  return (
    <Input
      type={props.type}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register(props.registerValue, {
        required: "This input is required.",
        pattern: {
          value: props.pattern as RegExp,
          message: props.message as string,
        },
      })}
    />
  );
};

export const TextAreaComponent = (
  props: InputProps<IFormInputs>
): JSX.Element => {
  return (
    <TextArea
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register(props.registerValue, {
        required: "This input is required.",
        pattern: {
          value: props.pattern as RegExp,
          message: props.message as string,
        },
      })}
    />
  );
};
