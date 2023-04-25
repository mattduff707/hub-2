import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const WidgetHeader = (props: any) => {
  const { className, children, ...rest } = props;
  const menuStatus = useSelector((state: RootState) => state.ui.menuStatus);
  const isMenuClosed = menuStatus === "closed";

  return (
    <header
      className={
        (className ? className : "") + `${isMenuClosed ? "pt-12px" : "pt-76px"}`
      }
      {...rest}
    >
      {children}
    </header>
  );
};

export default WidgetHeader;
