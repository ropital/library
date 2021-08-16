import React, { useEffect, useState, VFC } from "react";
import { Column, ColumnProps } from "./Column/Column";
import { KanbanData } from "./data";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";
import { Columns, useMultipeColumn } from "./useMultipleColumn";

type Props = {
  initialData: KanbanData;
};

export const KanbanBoard: VFC<Props> = ({ initialData }) => {
  const { columns, onDragEnd } = useMultipeColumn(mapToColumns(initialData));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columns}>
        {Object.keys(columns).map((key) => {
          const column = columns[key];
          const tasks = column.itemIds.map(
            (itemId) => initialData.tasks[itemId]
          );
          const props: ColumnProps = {
            id: column.id,
            title: initialData.columns[column.id].title,
            tasks,
          };

          return <Column key={column.id} {...props} />;
        })}
      </div>
    </DragDropContext>
  ) : null;
};

function mapToColumns(data: KanbanData): Columns {
  const columnArray = Object.keys(data.columns).map((key) => {
    return {
      id: data.columns[key].id,
      itemIds: data.columns[key].taskIds,
    };
  });

  const columns = columnArray.reduce((columns: Columns, column) => {
    columns[column.id] = column;
    return columns;
  }, {});

  return columns;
}
