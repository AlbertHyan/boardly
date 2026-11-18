import type { Dispatch, SetStateAction } from 'react';


export interface Task {
  id: string;
  text: string;
  color: string;
  date: string;
  currentTime: number;
  completed: boolean;
}

export interface TaskListItem {
  id: string;
  type: 'task-list';
  title: string;
  tasks: Task[];
}

export interface NoteItem {
  id: string;
  type: 'note';
  title: string;
  content: string;
}

export type BoardItem = TaskListItem | NoteItem;

export interface Board {
  id: string;
  title: string;
  color: string;
  items: BoardItem[];
}

export interface BoardsStateProps {
  boards: Board[];
  setBoards: Dispatch<SetStateAction<Board[]>>;
}