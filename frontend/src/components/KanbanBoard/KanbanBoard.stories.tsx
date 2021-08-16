import { Meta } from "@storybook/react";
import { initialData } from "./data";
import { KanbanBoard } from "./KanbanBoard";

export default {
  title: "KanbanBoard",
  component: KanbanBoard,
} as Meta;

export const Default = () => {
  return <KanbanBoard initialData={initialData} />;
};
