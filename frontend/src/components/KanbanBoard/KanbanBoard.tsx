import React, { useEffect, useState, VFC } from "react";
import { Column, ColumnProps } from "./Column/Column";
import { KanbanData } from "./data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";
import { ColumnsType, useMultipeColumn } from "./useMultipleColumn";

type Props = {
  initialData: KanbanData;
};

export const KanbanBoard: VFC<Props> = ({ initialData }) => {
  const { columns, order, onDragEnd } = useMultipeColumn({
    initialColumns: mapToColumns(initialData.columns),
    initialOrder: initialData.columnOrder,
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
                  title={initialData.columns[columnId].title}
                  index={index}
                  tasks={column.map((itemId) => initialData.tasks[itemId])}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

function mapToColumns(data: KanbanData["columns"]): ColumnsType {
  return Object.keys(data).reduce((columns: ColumnsType, key) => {
    const itemOrder = data[key].taskIds;

    columns[key] = itemOrder;
    return columns;
  }, {});
}
