// DocumentCard.tsx будет определять тип документа и выбирать нужный компонент:
import NoteCard from "@features/notes/components/NoteCard";
import TaskListCard from "@features/tasks/components/TaskListCard";

import type { BoardItem } from "@shared/types/board";

interface DocumentCardProps {
  item: BoardItem;
  boardId: string;
}

export default function DocumentCard({ item, boardId }: DocumentCardProps) {
  switch (item.type) {
    case "note":
      return <NoteCard note={item} boardId={boardId} />;

    case "task-list":
      return <TaskListCard taskList={item} boardId={boardId} />;

    default:
      return null;
  }
}
