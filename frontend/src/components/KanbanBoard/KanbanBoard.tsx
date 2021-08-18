import React, { useEffect, useState, VFC } from "react";
import { Column } from "./Column/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";
import {
  ColumnOrder,
  TaskOrderMap,
  useMultipeColumn,
} from "./useMultipleColumn";
import { KanbanData, useKanbanBoard } from "./useKanbanBoard";
import { Droppable } from "../DnD/Droppable/Droppable";

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
  const { kanbanData, onChangeContent, onChangeTitle } = useKanbanBoard(data);
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

  return ready ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" className={styles.columns}>
        {order.map((columnId, index) => {
          const column = columns[columnId];

          return (
            <Column
              key={columnId}
              id={columnId}
              title={kanbanData.columns[columnId].title}
              index={index}
              onChangeTitle={onChangeTitle}
              tasks={column.map((itemId) => ({
                onChange: onChangeContent,
                ...kanbanData.tasks[itemId],
              }))}
            />
          );
        })}
      </Droppable>
    </DragDropContext>
  ) : null;
};
