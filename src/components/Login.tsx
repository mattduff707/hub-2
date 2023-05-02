import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSignInMutation, useTokenAuthMutation } from "../store/api/api";
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

  const [tokenSignIn, { data, isLoading: isTokenAuthLoading }] =
    useTokenAuthMutation();

  useEffect(() => {
    const tokenAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await tokenSignIn({ token }).unwrap();
        const { access_token, ...userWithoutToken } = user;
        dispatch(setCredentials(userWithoutToken));
      }
    };
    tokenAuth();
  }, []);

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
            const { access_token, ...userWithoutToken } = user;

            localStorage.setItem("token", access_token);

            dispatch(setCredentials(userWithoutToken));
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
