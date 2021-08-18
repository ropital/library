import { Meta } from "@storybook/react";
import { KanbanBoard, KanbanBoardProps } from "./KanbanBoard";
import { getKanbanBoard } from "./repository";

export default {
  title: "KanbanBoard",
  component: KanbanBoard,
} as Meta;

export const Default = () => {
  return <KanbanBoard {...getKanbanBoard("kanban-1")} />;
};
