import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../components/icons/Close";
import MenuIcon from "../components/icons/Menu";

const Wrapper = styled.nav`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  isolation: isolate;
`;
const Title = styled(motion.h1)<{ isShowing: boolean }>`
  font-size: 2rem;
  border-radius: 0px 0px 16px 0px;
  border: 1px solid black;
  border-left: none;
  height: 74px;
  width: ${(props) => (props.isShowing ? "220px" : "64px")};
  display: grid;
  place-items: center;
  cursor: pointer;
  white-space: nowrap;
  background-color: white;
  z-index: 10;
`;
const MenuWrap = styled(motion.div)<{ isShowing: boolean }>`
  border-radius: 0px 0px 16px 0px;

  height: 64px;
  width: 64px;
  transform: ${(props) =>
    props.isShowing ? "translateY(0px)" : "translateY(-64px)"};
  transition: transform 0.4s ease;
  border: 1px solid black;
  border-top: none;
  border-left: none;
  overflow: hidden;
  z-index: 0;
  cursor: pointer;
`;
const BurgerWrap = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
};

const navOptions = [{ icon: "/tasks.svg", app: "tasks" }];

const Nav = () => {
  const [isShowing, setIsShowing] = useState(true);
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  return (
    <Wrapper>
      <Title
        isShowing={isShowing}
        onClick={() => setIsShowing(!isShowing)}
        layout
      >
        <AnimatePresence mode="wait">
          {isShowing ? (
            <motion.span layout={true} key="longname" {...fade}>
              The Hub
            </motion.span>
          ) : (
            <motion.span layout={true} key="shortname" {...fade}>
              TH
            </motion.span>
          )}
        </AnimatePresence>
      </Title>
      <MenuWrap isShowing={isShowing} layout>
        <BurgerWrap onClick={() => setIsMenuShowing(!isMenuShowing)}>
          {isMenuShowing ? (
            <CloseIcon layout="preserve-aspect" />
          ) : (
            <MenuIcon layout="preserve-aspect" />
          )}
        </BurgerWrap>
        1
      </MenuWrap>
    </Wrapper>
  );
};

export default Nav;
