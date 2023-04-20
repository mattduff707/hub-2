import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScreen, removeScreen } from "../store/slices/screenSlice";
import { RootState } from "../store/store";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
};

const navOptions = [
  { icon: "i-material-symbols-checklist-rounded", app: "tasks" },
  { icon: "i-material-symbols-bookmark-outline-rounded", app: "bookmarks" },
];

const Nav = () => {
  const screens = useSelector((state: RootState) => state.screens.active);
  const [isShowing, setIsShowing] = useState(true);
  const [isMenuShowing, setIsMenuShowing] = useState(false);

  const dispatch = useDispatch();

  const handleAdd = (app: string) => {
    dispatch(addScreen({ app }));
  };
  const handleRemove = (idx: number) => {
    dispatch(removeScreen(idx));
  };

  return (
    <nav
      className={`
      pos-a top-0 left-0 flex flex-col isolation-isolate
    `}
    >
      <motion.h1
        className={`
        ff-primary
          fs-10 grid place-items-center cursor-pointer bg-white
          border-1 border-black border-solid border-l-0 ofh
          z-10 br-br-4 h-74px ${isShowing ? "w-220px" : "w-64px"}
        `}
        onClick={() => {
          if (isMenuShowing) setIsMenuShowing(false);
          setIsShowing(!isShowing);
        }}
        layout
      >
        <AnimatePresence mode="wait">
          {isShowing ? (
            <motion.span layout={true} key="longname" {...fade}>
              THE HUB
            </motion.span>
          ) : (
            <motion.span layout={true} key="shortname" {...fade}>
              TH
            </motion.span>
          )}
        </AnimatePresence>
      </motion.h1>
      <motion.div layout>
        <div
          className={`
        w-64px h-64px border-1 border-black border-solid border-l-0 border-t-0
        z-0 ${isShowing ? "translate-y-0" : "translate-y--64px"}
        transition-transform duration-400 ease last:br-br-4
        `}
        >
          <div
            className={`
          wf hf grid place-items-center cursor-pointer
          `}
            onClick={() => setIsMenuShowing(!isMenuShowing)}
          >
            {isMenuShowing ? (
              <>
                <motion.div
                  className={`
                i-ic-baseline-close h-40px w-40px
                `}
                  layout="preserve-aspect"
                />
              </>
            ) : (
              <motion.div
                className={`i-material-symbols-menu-rounded h-40px w-40px
                `}
                layout="preserve-aspect"
              />
            )}
          </div>
        </div>
        {isMenuShowing &&
          navOptions.map((option, idx) => (
            <div
              onClick={() => {
                const isActive = screens.find(
                  (screen) => screen.app === option.app
                );
                if (isActive) {
                  const idx = screens.reduce((acc: number, screen, idx) => {
                    if (screen.app === option.app) return idx;
                    return acc;
                  }, 0);
                  handleRemove(idx);
                } else {
                  handleAdd(option.app);
                }
              }}
              className={`
        w-64px h-64px bg-white border-1 border-black border-solid border-l-0 border-t-0
        z-0 ${isShowing ? "translate-y-0" : "translate-y--64px"}
        transition-transform duration-400 ease last:br-br-4
        `}
            >
              <div
                className={`
            wf hf grid place-items-center cursor-pointer
            `}
              >
                <div
                  className={`
              ${option.icon} h-40px w-40px
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
