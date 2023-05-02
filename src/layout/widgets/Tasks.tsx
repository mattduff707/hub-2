import React, { useState } from "react";
import WidgetHeader from "../../components/common/WidgetHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateMenuStatus } from "../../store/slices/uiSlice";
import { motion } from "framer-motion";
import { useCreateProjectMutation } from "../../store/api/api";
import styled from "styled-components";

const Wrapper = styled(motion.section)`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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
  const [title, setTitle] = useState("");
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleSubmit = () => {
    createProject({ title });
  };

  return (
    <Wrapper layout>
      <WidgetHeader>
        <motion.h2 layout>Tasks</motion.h2>
      </WidgetHeader>
      <motion.button layout onClick={handleMenuToggle}>
        Close menu
      </motion.button>
      <label style={{ paddingTop: "20px" }}>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </Wrapper>
  );
};

export default Tasks;
