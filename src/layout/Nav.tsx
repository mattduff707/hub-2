import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScreen, removeScreen } from "../store/slices/screenSlice";
import { RootState } from "../store/store";
import { MenuStatus, updateMenuStatus } from "../store/slices/uiSlice";
import widgets from "../widgets";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
};

// const navOptions = [
//   { icon: "i-material-symbols-checklist-rounded", app: "tasks" },
//   { icon: "i-material-symbols-bookmark-outline-rounded", app: "bookmarks" },
// ];

const Nav = () => {
  const menuStatus = useSelector((state: RootState) => state.ui.menuStatus);
  const screens = useSelector((state: RootState) => state.screens.active);

  const dispatch = useDispatch();

  const handleUpdateMenuStatus = (status: MenuStatus) => {
    dispatch(updateMenuStatus(status));
  };
  const handleAdd = (app: string) => {
    dispatch(addScreen({ app }));
  };
  const handleRemove = (idx: number) => {
    dispatch(removeScreen(idx));
  };

  return (
    <nav
      className={`
      pos-a top-0 left-0 flex isolation-isolate ${
        menuStatus === "open" ? "translate-y-0px" : "translate-y--100%"
      }
    `}
    >
      <motion.h1
        className={`
        ff-primary
          fs-10 grid place-items-center cursor-pointer bg-white
          border-1 border-black border-solid border-l-0 border-t-0 ofh
          z-10 h-64px w-220px
        `}
        layout
      >
        <AnimatePresence mode="wait">
          <motion.span layout={true} key="longname" {...fade}>
            THE HUB
          </motion.span>
        </AnimatePresence>
      </motion.h1>
      <motion.div className={"flex"} layout>
        <div
          onClick={() =>
            handleUpdateMenuStatus(menuStatus === "open" ? "closed" : "open")
          }
          className={`
        w-64px h-64px border-1 border-black border-solid border-l-0 border-t-0
        z-0 
        transition-transform duration-400 ease last:br-br-4
        `}
        >
          <div
            className={`
          wf hf grid place-items-center cursor-pointer
          `}
          >
            <motion.div
              className={`
                i-ic-baseline-close h-40px w-40px
                `}
              layout="preserve-aspect"
            />
          </div>
        </div>
        {Object.entries(widgets).map(([name, widget], idx) => (
          <div
            key={name}
            onClick={() => {
              const isActive = screens.find((screen) => screen.app === name);
              if (isActive) {
                const idx = screens.reduce((acc: number, screen, idx) => {
                  if (screen.app === name) return idx;
                  return acc;
                }, 0);
                handleRemove(idx);
              } else {
                handleAdd(name);
              }
            }}
            className={`
        w-64px h-64px bg-white border-1 border-black border-solid border-l-0 border-t-0
        z-0 transition-transform duration-400 ease last:br-br-4
        `}
          >
            <div
              className={`
            wf hf grid place-items-center cursor-pointer
            `}
            >
              <div
                className={`
              ${widget.icon} h-40px w-40px
              `}
                key={idx}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </nav>
  );
};

export default Nav;
