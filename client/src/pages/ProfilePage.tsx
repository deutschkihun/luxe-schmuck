import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { IFormInputs } from "../helper/interface";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, SubmitButton, SubmitInput } from "../helper/lib";
import {
  ErrorMessageComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from "../helper/helperComponent";
import { rex, stringRex } from "../helper/utils";
import { RootState } from "../store";
import { USER_UPDATE_PROFILE_RESET } from "../actions/types";
import { getUserDetails } from "../actions/user_actions";

export const ProfilePage = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  /*const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");*/
  const password: React.MutableRefObject<string | undefined> = useRef();
  password.current = watch("password");
  const [body, setBody] = useState<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) =>
    setBody(data);

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: RootState) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        //dispatch(listMyOrders());
      } else {
        //setFirstname();
        //setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleComponent title={"Setting"} />
      <LabelComponent label={"First Name"} />
      <InputComponent
        placeholder={"enter your first name"}
        type="text"
        //defaultValue={found.user.firstName}
        register={register}
        registerValue={"firstName"}
        pattern={stringRex}
        message={"This input is string only."}
      />
      <ErrorMessageComponent name={"firstName"} errors={errors} />

      <LabelComponent label={"Last Name"} />
      <InputComponent
        placeholder={"enter your last name"}
        type="text"
        //defaultValue={found.user.lastName}
        register={register}
        registerValue={"lastName"}
        pattern={stringRex}
        message={"This input is string only."}
      />
      <ErrorMessageComponent name={"lastName"} errors={errors} />

      <LabelComponent label={"Password"} />
      <InputComponent
        type={"password"}
        placeholder={"enter your password"}
        register={register}
        registerValue={"password"}
        pattern={rex}
        message={
          "At least 1 uppercase, special character and longer than 8 chars"
        }
      />
      <ErrorMessageComponent name={"password"} errors={errors} />
      <LabelComponent label={"Confirm Password"} />
      <Input
        type="password"
        placeholder="check your password again"
        {...register("password_confirm", {
          required: "This input is required.",
          validate: (value: string) => value === password.current,
        })}
      />
      <ErrorMessageComponent name={"password_confirm"} errors={errors} />

      <SubmitInput value="change" />
      <SubmitButton onClick={() => history.push("/")}>back</SubmitButton>
    </Form>
  );
};
