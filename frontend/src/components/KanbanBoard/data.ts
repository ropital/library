type Column = {
  id: string, title: string, taskIds: string[]
}

export type KanbanData = {
  tasks: {
    [key in string]: { id: string, content: string }
  },
  columns: {
    [key in string]: Column
  },
  columnOrder: string[]
}

export const initialData: KanbanData = {
  tasks: {
    'task1' : {id: 'task1', content: 'Take out the garbage'},
    'task2' : {id: 'task2', content: 'Watch my favorite show'},
    'task3' : {id: 'task3', content: 'Charge my phone'},
    'task4' : {id: 'task4', content: 'Cook dinner'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task1', 'task2', 'task3', 'task4']
    },
    'column-2': {
      id: 'column-2',
      title: 'progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'done',
      taskIds: []
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}