import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../components/icons/CloseIcon";
import { addScreen, removeScreen } from "../store/slices/screenSlice";
import { MenuStatus, updateMenuStatus } from "../store/slices/uiSlice";
import { RootState } from "../store/store";
import widgets from "../widgets";

const Navbar = styled.nav<{ open: boolean }>`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  isolation: isolate;
  transform: ${(props) =>
    props.open ? "translateY(0px)" : "translateY(-100%)"};
  transition: transform 0.4s ease;
`;

const Title = styled.h1`
  font-family: "Megrim", monospace;
  font-size: 2.5rem;
  display: grid;
  place-items: center;
  border: 1px solid black;
  border-top: none;
  z-index: 10;
  height: 64px;
  width: 220px;
`;
const MenuWrap = styled.div`
  display: flex;
`;
const MenuItemWrap = styled.div`
  width: 64px;
  height: 64px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  overflow: hidden;
  &:last-child {
    border-radius: 0px 0px 12px 0px;
  }
`;
const MenuItem = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: white;
  cursor: pointer;
`;

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
    <Navbar open={menuStatus === "open"}>
      <Title>THE HUB</Title>
      <MenuWrap>
        <MenuItemWrap
          onClick={() =>
            handleUpdateMenuStatus(menuStatus === "open" ? "closed" : "open")
          }
        >
          <MenuItem>
            <CloseIcon />
          </MenuItem>
        </MenuItemWrap>
        {Object.entries(widgets).map(([name, { Icon }], idx) => (
          <MenuItemWrap
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
          >
            <MenuItem>
              <Icon />
            </MenuItem>
          </MenuItemWrap>
        ))}
      </MenuWrap>
    </Navbar>
  );
};

export default Nav;
