import TaskIcon from "./components/icons/TasksIcon";
import Tasks from "./layout/widgets/Tasks";

export interface Widget {
  name: string;
  Component: React.FC;
  Icon: React.FC;
}

const widgets: { [key: string]: Widget } = {
  tasks: {
    name: "tasks",
    Component: Tasks,
    Icon: TaskIcon,
  },
};

export default widgets;
