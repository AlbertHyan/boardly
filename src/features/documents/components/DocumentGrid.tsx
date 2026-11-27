import DocumentCard from "./DocumentCard";
import type { BoardItem } from "@shared/types/board";


interface DocumentGridProps {
  items: BoardItem[];
  boardId: string;
}


export default function DocumentGrid({ items, boardId }: DocumentGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white/60 rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="text-lg font-medium">
          This board is empty
        </h2>
        <p className="mt-2 text-gray-500">
          Create a note or a task list to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <DocumentCard
            item={item}
            boardId={boardId}
          />
        </li>
      ))}
    </ul>
  );
}
