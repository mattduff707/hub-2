import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Screen, addScreen, removeScreen } from "../store/slices/screenSlice";
import { RootState } from "../store/store";
import Nav from "./Nav";
import widgets from "../widgets";

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
    <div className="hf wf pos-r">
      <Nav />
      {screens.length > 0 ? (
        <div className={"hf wf flex"}>
          {screens.map((screen: Screen, idx: number) => {
            const { Component } = widgets[screen.app];
            return (
              <section
                key={screen.app}
                className={`
            flex-1 border-r-1 border-0 border-solid border-black
              first:border-l-0 last:border-r-0 
            `}
              >
                <Component />
              </section>
            );
          })}
        </div>
      ) : (
        <section
          className={`
          hf wf grid place-items-center
        `}
        >
          <div>
            <h1>Empty</h1>
            <button onClick={handleAdd}>Add</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default MainScreen;
