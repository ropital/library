import React, { useEffect, useState, VFC } from "react";
import { Column, ColumnProps } from "./Column/Column";
import { KanbanData } from "./data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";
import { ColumnsType, ColumnType, useMultipeColumn } from "./useMultipleColumn";

type Props = {
  initialData: KanbanData;
};

export const KanbanBoard: VFC<Props> = ({ initialData }) => {
  const { columns, order, onDragEnd } = useMultipeColumn(
    mapToColumns(initialData.columns),
    initialData.columnOrder
  );
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
            {order.map((id, index) => {
              const column = columns[id];

              return (
                <Column
                  key={column.id}
                  {...getColumnProps(column, initialData, index)}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

function getColumnProps(column: ColumnType, data: KanbanData, index: number) {
  const tasks = column.itemIds.map((itemId) => data.tasks[itemId]);
  const props: ColumnProps = {
    id: column.id,
    title: data.columns[column.id].title,
    tasks,
    index,
  };

  return props;
}

function mapToColumns(data: KanbanData["columns"]): ColumnsType {
  return Object.keys(data).reduce((columns: ColumnsType, key) => {
    const column = {
      id: data[key].id,
      itemIds: data[key].taskIds,
    };

    columns[key] = column;
    return columns;
  }, {});
}
