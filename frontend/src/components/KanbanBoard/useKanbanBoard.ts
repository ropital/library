import { useState } from "react";

type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
};

export type KanbanData = {
  tasks: {
    [key in string]: Task;
  };
  columns: {
    [key in string]: Column;
  };
};

export const useKanbanBoard = (data: KanbanData) => {
  const [kanbanData, setKanbanData] = useState(data);

  const onChangeContent = (id: string, content: string) => {
    setKanbanData({
      ...kanbanData,
      tasks: {
        ...kanbanData.tasks,
        [id]: {
          id,
          content,
        },
      },
    });
  };

  const onChangeTitle = (id: string, title: string) => {
    setKanbanData({
      ...kanbanData,
      columns: {
        ...kanbanData.columns,
        [id]: {
          id,
          title,
        }
      }
    })
  }

  console.log(kanbanData)

  return {
    kanbanData,
    onChangeContent,
    onChangeTitle,
  }
}