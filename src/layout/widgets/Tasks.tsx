import React from "react";
import WidgetHeader from "../../components/common/WidgetHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateMenuStatus } from "../../store/slices/uiSlice";
import { motion } from "framer-motion";

const Tasks = () => {
  const menuStatus = useSelector((state: RootState) => state.ui.menuStatus);
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    if (menuStatus === "closed") {
      dispatch(updateMenuStatus("open"));
    } else {
      dispatch(updateMenuStatus("closed"));
    }
  };

  return (
    <motion.div layout>
      <WidgetHeader>
        <motion.h2 layout>Tasks</motion.h2>
      </WidgetHeader>
      <motion.button layout onClick={handleMenuToggle}>
        Close menu
      </motion.button>
    </motion.div>
  );
};

export default Tasks;
