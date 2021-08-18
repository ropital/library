import React, { VFC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
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
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            value={title}
            onChange={(event) => onChangeTitle(id, event.target.value)}
          />

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
