import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSignInMutation } from "../store/api/api";
import { setCredentials } from "../store/slices/authSlice";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

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
    <div style={{ padding: "16px" }}>
      <Label>
        Email
        <input
          name={FormFields.EMAIL}
          value={form.email}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Password
        <input
          name={FormFields.PASSWORD}
          value={form.password}
          onChange={handleChange}
        />
      </Label>
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
