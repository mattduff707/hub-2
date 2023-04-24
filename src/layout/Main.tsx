import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MainScreen from "./MainScreen";
import Login from "../components/Login";

const Main = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return <main>{user ? <MainScreen /> : <Login />}</main>;
};

export default Main;
