import React, { VFC } from "react";
import { Draggable } from "../../DnD/Draggable/Draggable";
import { Droppable } from "../../DnD/Droppable/Droppable";
import { Task, TaskProps } from "../Task/Task";
import styles from "./Column.module.css";

export type ColumnProps = {
  id: string;
  title: string;
  index: number;
  tasks: Omit<TaskProps, "index">[];
  onChangeTitle: (id: string, title: string) => void;
};

export const Column: VFC<ColumnProps> = ({
  title,
  id,
  index,
  tasks,
  onChangeTitle,
}) => {
  return (
    <Draggable draggableId={id} index={index} className={styles.column}>
      <input
        value={title}
        onChange={(event) => onChangeTitle(id, event.target.value)}
      />
      <Droppable className={styles.tasks} droppableId={id}>
        {tasks.map((task, index) => (
          <Task {...task} key={task.id} index={index} />
        ))}
      </Droppable>
    </Draggable>
  );
};
