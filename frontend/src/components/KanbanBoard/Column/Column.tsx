import React, { VFC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task, TaskProps } from "../Task/Task";
import styles from "./Column.module.css";

export type ColumnProps = {
  id: string;
  title: string;
  index: number;
  tasks: Omit<TaskProps, "index">[];
};

export const Column: VFC<ColumnProps> = ({ title, id, index, tasks }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  );
};
