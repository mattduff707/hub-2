import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useSignUpMutation } from "../store/api/api";

enum FormFields {
  EMAIL = "email",
  PASSWORD = "password",
}
const Login = () => {
  const dispatch = useDispatch();

  const [signUp, { isLoading }] = useSignUpMutation();

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
            const user = await signUp(form).unwrap();

            console.log(user);

            // dispatch(setCredentials(user));
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
