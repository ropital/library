import React, { useEffect, useState, VFC } from "react";
import { Column } from "./Column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";
import {
  ColumnOrder,
  TaskOrderMap,
  useMultipeColumn,
} from "./useMultipleColumn";

type Task = {
  id: string;
  content: string;
};

type ColumnType = {
  id: string;
  title: string;
};

type KanbanData = {
  tasks: {
    [key in string]: Task;
  };
  columns: {
    [key in string]: ColumnType;
  };
};

export type KanbanBoardProps = {
  data: KanbanData;
  columnOrder: ColumnOrder;
  taskOrderMap: TaskOrderMap;
};

export const KanbanBoard: VFC<KanbanBoardProps> = ({
  data,
  columnOrder,
  taskOrderMap,
}) => {
  const [kanbanData, setKanbanData] = useState(data);
  const { columns, order, onDragEnd } = useMultipeColumn({
    initialTaskOrderMap: taskOrderMap,
    initialColumnOrder: columnOrder,
    onMoveColumn: (columnId, index) => console.log(columnId, index),
    onMoveItem: (itemId, columnId, index) =>
      console.log(itemId, columnId, index),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const onChange = (id: string, content: string) => {
    setKanbanData({
      ...kanbanData,
      tasks: {
        ...kanbanData.tasks,
        [id]: {
          id: id,
          content: content,
        },
      },
    });
  };

  return ready ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN">
        {(provided) => (
          <div
            className={styles.columns}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {order.map((columnId, index) => {
              const column = columns[columnId];

              return (
                <Column
                  key={columnId}
                  id={columnId}
                  title={kanbanData.columns[columnId].title}
                  index={index}
                  tasks={column.map((itemId) => ({
                    onChange,
                    ...kanbanData.tasks[itemId],
                  }))}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};
