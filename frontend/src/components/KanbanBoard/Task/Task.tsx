import React, { ChangeEventHandler, VFC } from "react";
import { Draggable } from "../../DnD/Draggable/Draggable";
import styles from "./Task.module.css";

export type TaskProps = {
  id: string;
  content: string;
  index: number;
  onChange: (id: string, content: string) => void;
};

export const Task: VFC<TaskProps> = ({ id, content, index, onChange }) => {
  return (
    <Draggable draggableId={id} index={index} className={styles.task}>
      <input
        type="text"
        value={content}
        onChange={(event) => onChange(id, event.target.value)}
      />
    </Draggable>
  );
};
