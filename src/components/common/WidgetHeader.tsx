import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";

const Wrapper = styled.header<{ menuOpen: boolean }>`
  padding-top: ${(props) => (props.menuOpen ? "76px" : "12px")};
`;

const WidgetHeader = (props: any) => {
  const { className, children, ...rest } = props;
  const menuStatus = useSelector((state: RootState) => state.ui.menuStatus);

  return (
    <Wrapper className={className} menuOpen={menuStatus === "open"} {...rest}>
      {children}
    </Wrapper>
  );
};

export default WidgetHeader;
