import { useNavigate } from 'react-router';
import { createNote, createTaskList } from '@shared/lib/boards.js';

import { useState } from 'react';
import BoardTitleInput from '@features/boards/components/BoardTitleInput';
import DocumentGrid from '@features/documents/components/DocumentGrid';
import { useDebounce } from '@shared/hooks/useDebounce';

export default function BoardPage({ board, setBoards }) {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('grid');

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  function updateBoardTitle(newTitle) {
    setBoards((prevBoards) =>
      prevBoards.map((currentBoard) =>
        currentBoard.id === board.id
          ? { ...currentBoard, title: newTitle }
          : currentBoard
      )
    );
  }

  function addItem(item) {
    setBoards((previousBoards) =>
      previousBoards.map((currentBoard) =>
        currentBoard.id === board.id
          ? {
              ...currentBoard,
              items: [...currentBoard.items, item],
            }
          : currentBoard
      )
    );
  }

  function handleCreateNote() {
    const note = createNote();

    addItem(note);
    navigate(`/boards/${board.id}/items/${note.id}`);
  }

  function handleCreateTaskList() {
    const taskList = createTaskList();

    addItem(taskList);
    navigate(`/boards/${board.id}/items/${taskList.id}`);
  }

  return (
    <main className="app-container flex flex-col gap-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <button
          type="button"
          className="button--back font-medium"
          onClick={() => navigate("/boards")}
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          <span>Back to boards</span>
        </button>

        <BoardTitleInput
          value={board.title}
          onChange={updateBoardTitle}
          placeholder="Board Title"
          ariaLabel="Board title"
        />
      </header>

      <section aria-label="Create document" className="flex flex-wrap justify-between items-end gap-3">
        <div className="flex flex-wrap gap-3">
          <button type="button"
            className="btn--primary"
            onClick={handleCreateNote}
          >
            <div className="flex-center size-8 bg-white text-[#B3702E] border-2 border-[#B3702E75] rounded-lg"
              aria-hidden="true"
            >
              <i className="fa-solid fa-file-lines" />
            </div>

            <span className="font-medium">New note</span>
          </button>

          <button type="button"
            className="btn--primary"
            onClick={handleCreateTaskList}
          >
            <div className="flex-center size-8 bg-white text-[#5792FA] border-2 border-[#5792FA75] rounded-lg"
              aria-hidden="true"
            >
              <i className="fa-solid fa-list-check" />
            </div>

            <span className="font-medium">New task list</span>
          </button>
        </div>

        <div className="flex items-center text-gray-700 bg-gray-200 rounded-lg border-4 border-[#d9dfe9] overflow-hidden">
          <button type="button"
            onClick={() => setViewMode('grid')}
            className={`px-2 py-1 cursor-pointer transition-colors ${
              viewMode === 'grid' ? 'bg-gray-500 text-white' : 'hover:text-blue-600'
            }`}
            title="Grid view"
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <i className="fa-solid fa-grip"></i>
          </button>

          <button type="button"
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 cursor-pointer transition-colors ${
              viewMode === 'list' ? 'bg-gray-500 text-white' : 'hover:text-blue-600'
            }`}
            title="List view"
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <i className="fa-solid fa-list -scale-x-100"></i>
          </button>
        </div>
      </section>

      <div className="relative flex items-center">
        <i className="fa-solid fa-magnifying-glass absolute ml-3 text-sm text-gray-500 select-none"></i>
        <input
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Item..."
          className="w-full md:w-[50%] pl-9 pr-2 py-1 bg-[#E3E9F2] rounded-lg font-shantell"
          id="search-input"
        />
      </div>

      <section aria-label="Board documents">
        <DocumentGrid
          items={board.items}
          boardId={board.id}
        />
      </section>
    </main>
  );
}
