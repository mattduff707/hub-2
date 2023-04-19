import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScreen, removeScreen } from "../store/slices/screenSlice";
import { RootState } from "../store/store";
import Nav from "./Nav";

const MainScreen = () => {
  const screens = useSelector((state: RootState) => state.screens.active);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addScreen({ app: "test" }));
  };
  const handleRemove = (idx: number) => {
    dispatch(removeScreen(idx));
  };

  return (
    <div className="hf wf pos-r">
      <Nav />
      {screens.length > 0 ? (
        <div className={"hf wf flex"}>
          {screens.map((screen: any, idx: number) => (
            <section
              className={`
              flex-1 border-2 border-green-500 border-solid grid place-items-center
            `}
            >
              <div>
                <h1>Screen {idx}</h1>
                <button onClick={handleAdd}>Add</button>
                <button onClick={() => handleRemove(idx)}>Remove</button>
              </div>
            </section>
          ))}
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
