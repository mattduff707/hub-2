import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSignInMutation, useSignUpMutation } from "../store/api/api";
import { setCredentials } from "../store/slices/authSlice";

enum FormFields {
  EMAIL = "email",
  PASSWORD = "password",
}
const Login = () => {
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const [form, setForm] = useState({
    [FormFields.EMAIL]: "",
    [FormFields.PASSWORD]: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={"p-4"}>
      <label className={"flex flex-col max-w-200px"}>
        Email
        <input
          name={FormFields.EMAIL}
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label className={"flex flex-col max-w-200px"}>
        Password
        <input
          name={FormFields.PASSWORD}
          value={form.password}
          onChange={handleChange}
        />
      </label>
      <button
        onClick={async () => {
          try {
            const user = await signIn(form).unwrap();

            console.log(user);

            dispatch(setCredentials(user));
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Sign up
      </button>
    </div>
  );
};

export default Login;
