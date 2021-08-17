import { useState } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

export type ColumnsType = {
  [key in string]: string[]
}

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const newList = Array.from(list);

  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);

  return newList
};

export const multipleReorder = (columns: ColumnsType, source: DraggableLocation, destination: DraggableLocation): ColumnsType => {
  const startItemIds = [...columns[source.droppableId]]
  const targetItemId = startItemIds[source.index]
  startItemIds.splice(source.index, 1);
  
  const endItemIds = [...columns[destination.droppableId]]
  endItemIds.splice(destination.index, 0, targetItemId);

  const newColumns: ColumnsType = {
    ...columns,
    [source.droppableId]: startItemIds,
    [destination.droppableId]: endItemIds
  }

  return newColumns
}

export const useMultipeColumn = (initialColumns: ColumnsType, initialOrder: string[]) => {
  const [columns, setColumns] = useState<ColumnsType>(initialColumns);
  const [order, setOrder] = useState<string[]>(initialOrder)

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

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

    if (type === "COLUMN") {
      const newColumnOrder = reorder(
        order,
        source.index,
        destination.index
      )

      setOrder(newColumnOrder)
      return
    }

    if (destination.droppableId === source.droppableId) {
      const newItemIds = reorder(
        columns[source.droppableId],
        source.index,
        destination.index,
      );

      setColumns({
        ...columns,
        [source.droppableId]: newItemIds,
      });
    } else {
      const newColumns = multipleReorder(columns, source, destination);
      setColumns(newColumns);
    }
  };

  return {
    columns,
    order,
    onDragEnd,
  }
}