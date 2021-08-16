import React, { VFC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task, TaskProps } from "../Task/Task";
import styles from "./Column.module.css";

export type ColumnProps = {
  id: string;
  title: string;
  tasks: Omit<TaskProps, "index">[];
};

export const Column: VFC<ColumnProps> = ({ title, id, tasks }) => {
  return (
    <div className={styles.column}>
      <h2>{title}</h2>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className={styles.tasks}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task {...task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
