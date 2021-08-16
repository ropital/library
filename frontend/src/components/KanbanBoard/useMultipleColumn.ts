import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

type ColumnMap = { columnId: string; itemIndex: number };

export type Column = { id: string, itemIds: string[] }
export type Columns = {
  [key in string]: Column // IDがnumberじゃなくても対応できるようにstring型
}

export const moveInSingleColumn = (source: ColumnMap, destination: ColumnMap, targetItemId: string, columns: Columns): Columns => {
  const targetColumn = columns[source.columnId]
  const newItemIds = Array.from(targetColumn.itemIds);
console.log(source, destination)

  newItemIds.splice(source.itemIndex, 1);
  newItemIds.splice(destination.itemIndex, 0, targetItemId);

  console.log(newItemIds)

  const newColumn: Column = {
    ...targetColumn,
    itemIds: newItemIds,
  };

  const newColumns: Columns = {
    ...columns,
    [newColumn.id]: newColumn,
  };

  return newColumns
};

export const moveInMultipleColumn = (source: ColumnMap, destination: ColumnMap, draggedItemId: string, columns: Columns): Columns => {
  const startColumn = columns[source.columnId]
  const startTasksIds = Array.from(startColumn.itemIds);
  startTasksIds.splice(source.itemIndex, 1);

  const newStartColumn: Column = {
    ...startColumn,
    itemIds: startTasksIds,
  };

  const finishColumn = columns[destination.columnId]
  const finishTasksIds = Array.from(finishColumn.itemIds);
  finishTasksIds.splice(destination.itemIndex, 0, draggedItemId);

  const newFinishColumn = {
    ...finishColumn,
    itemIds: finishTasksIds,
  };

  const newColumns: Columns = {
    ...columns,
    [newStartColumn.id]: newStartColumn,
    [newFinishColumn.id]: newFinishColumn,
  }

  console.log(newColumns)

  return newColumns
}

export const useMultipeColumn = (initialColumns: Columns) => {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    // アイテムが動いていなければ処理を終了
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const newColumns = moveInSingleColumn(
        {
          columnId: source.droppableId,
          itemIndex: source.index,
        },
        {
          columnId: destination.droppableId,
          itemIndex: destination.index,
        },
        draggableId,
        columns
      );
      setColumns(newColumns);
    } else {
      const newColumns = moveInMultipleColumn(
        {
          columnId: source.droppableId,
          itemIndex: source.index,
        },
        {
          columnId: destination.droppableId,
          itemIndex: destination.index,
        },
        draggableId,
        columns
      );
      setColumns(newColumns);
    }
  };

  return {
    columns,
    onDragEnd,
  }
}