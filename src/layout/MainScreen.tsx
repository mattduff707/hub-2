import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Screen, addScreen, removeScreen } from "../store/slices/screenSlice";
import { RootState } from "../store/store";
import Nav from "./Nav";
import widgets from "../widgets";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const ScreenWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
const WidgetScreen = styled.section`
  flex: 1;
  border-right: 1px solid black;
  &:last-child {
    border-right: none;
  }
`;
const EmptyWrap = styled.section`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;

const MainScreen = () => {
  const screens = useSelector((state: RootState) => state.screens.active);
  const dispatch = useDispatch();
  console.log(screens);
  const handleAdd = () => {
    dispatch(addScreen({ app: "test" }));
  };

  const [password, setPassword] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const handleNewPassword = async () => {
    const res = await fetch("http://localhost:3000/auth/setPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify({
        email: auth.user!.email,
        password: password,
      }),
    });

    console.log(res);
  };

  return (
    <Wrapper>
      <Nav />
      {screens.length > 0 ? (
        <ScreenWrap>
          {screens.map((screen: Screen, idx: number) => {
            const { Component } = widgets[screen.app];
            return (
              <WidgetScreen key={screen.app}>
                <Component />
              </WidgetScreen>
            );
          })}
        </ScreenWrap>
      ) : (
        <EmptyWrap>
          <div>
            <h1>Empty</h1>
          </div>
        </EmptyWrap>
      )}
    </Wrapper>
  );
};

export default MainScreen;
