import Tasks from "./layout/widgets/Tasks";

export interface Widget {
  name: string;
  Component: React.FC;
  icon: string;
}

const widgets: { [key: string]: Widget } = {
  tasks: {
    name: "tasks",
    Component: Tasks,
    icon: "i-material-symbols-checklist-rounded",
  },
};

export default widgets;
