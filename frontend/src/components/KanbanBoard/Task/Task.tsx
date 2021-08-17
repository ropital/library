import React, { VFC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./Task.module.css";

export type TaskProps = {
  id: string;
  content: string;
  index: number;
};

export const Task: VFC<TaskProps> = ({ id, content, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};
