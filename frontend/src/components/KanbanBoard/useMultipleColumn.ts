import { useState } from "react";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";

export type ColumnOrder = string[]

export type TaskOrderMap = {
  [key in string]: string[]
}

export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const newList = Array.from(list);

  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);

  return newList
};

export const multipleReorder = (columns: TaskOrderMap, source: DraggableLocation, destination: DraggableLocation): TaskOrderMap => {
  const startItemIds = [...columns[source.droppableId]]
  const targetItemId = startItemIds[source.index]
  startItemIds.splice(source.index, 1);
  
  const endItemIds = [...columns[destination.droppableId]]
  endItemIds.splice(destination.index, 0, targetItemId);

  const newColumns: TaskOrderMap = {
    ...columns,
    [source.droppableId]: startItemIds,
    [destination.droppableId]: endItemIds
  }

  return newColumns
}

type Props = {
  initialTaskOrderMap: TaskOrderMap
  initialColumnOrder: ColumnOrder
  onMoveColumn?: (columnId: string, toIndex: number) => void
  onMoveItem?: (itemId: string, columnId: string, toIndex: number) => void
}

export const useMultipeColumn = ({ initialTaskOrderMap: initialColumns, initialColumnOrder: initialOrder, onMoveColumn, onMoveItem } :Props) => {
  const [columns, setColumns] = useState<TaskOrderMap>(initialColumns);
  const [order, setOrder] = useState<string[]>(initialOrder)

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

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
      onMoveColumn?.(draggableId, destination.index)
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
      onMoveItem?.(draggableId, destination.droppableId, destination.index)
      
    } else {
      const newColumns = multipleReorder(columns, source, destination);
      setColumns(newColumns);
      onMoveItem?.(draggableId, destination.droppableId, destination.index)
    }
  };

  return {
    columns,
    order,
    onDragEnd,
  }
}