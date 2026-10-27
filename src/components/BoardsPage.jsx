import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";

export default function BoardsPage({ onSelectBoard, boards, setBoards }) {
  // Modal useStates
  const [editIndex, setEditIndex] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const boardsList = boards
    .map((board, originalIndex) => ({ board, originalIndex }))
    .filter(({ board }) =>
      board.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  document.title = `Boards [ ${boards.length} ] | Boardly`;

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0'); // converting to 2-digit HEX
    };

    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function getRandomBoardColor() {
    // Prototype - hsl(88, 84, 44);
    const randomNumber = Math.floor(Math.random() * 359);
    return hslToHex(randomNumber, 84, 44);
  }

  function handleAddBoard() {
    const newBoard = {
      title: `Board ${boards.length + 1}`,
      color: getRandomBoardColor(),  // color default by #76ce12
      todos: []
    }

    setBoards(prevBoards => [...prevBoards, newBoard]);
  }

  function handleEditBoard(index) {
    setEditIndex(index);
    setNewTitle(boards[index].title);
    setNewColor(boards[index].color || "#76ce12");
  }

  function handleSaveEdit(index) {
    if (newTitle && newTitle.length <= 42) {
      const updatedBoards = boards.map((board, i) => i === index
        ? { ...board, title: newTitle, color: newColor } : board);
      setBoards(updatedBoards);
      setEditIndex(null);
    } else {
      alert("Title must be 42 characters or less.");
    }
  }

  function handleCloseModal() {
    setEditIndex(null);
  }

  function handleDeleteBoard(index) {
    const newBoards = boards.filter((_, i) => i !== index);
    setBoards(newBoards);
  }


  /*======== DRAG AND DROP ========*/
  const [draggedBoardIndex, setDraggedBoardIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);  // state for .dragging class

  const handleDragStart = (index) => {
    setDraggedBoardIndex(index);

    setIsDragging(true); // Начало перетаскивания
  };

  const handleDragEnd = () => {
    setIsDragging(false); // Завершение перетаскивания 
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // позволяет перемещать элементы над другими
  };

  const handleDrop = (index) => {
    if (draggedBoardIndex === null || draggedBoardIndex === index) return;

    // Создаем новый порядок карточек после перетаскивания
    const updatedBoards = [...boards];
    const draggedBoard = updatedBoards.splice(draggedBoardIndex, 1)[0];

    updatedBoards.splice(index, 0, draggedBoard);

    setBoards(updatedBoards);
    setDraggedBoardIndex(null); // сброс индекса после перетаскивания
    setIsDragging(false); // Сброс состояния после перетаскивания
  };

  return (
    <main className="todo-boards-container">
      <h2>Your Boards {boards.length}</h2>

      <input
        type="search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search Board..."
        className="search-input"
        id="search-input"
      />

      <div className="boards-grid">
        {boardsList.map(({ board, originalIndex }) => (
          <div className={`board-card ${isDragging && draggedBoardIndex === originalIndex ? "dragging" : ""}`}
            key={originalIndex}
            style={{ backgroundColor: board.color || "#76ce12" }}
            draggable="true"
            onDragStart={() => handleDragStart(originalIndex)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(originalIndex)}
            onDragEnd={handleDragEnd}
          >
            <div onClick={() => onSelectBoard(originalIndex)} />
            <h3 onClick={() => onSelectBoard(originalIndex)}>
              {board.title || "No Title"}
            </h3>

            <button className="board-action-icon-left"
              onClick={() => { handleEditBoard(originalIndex) }}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button className="board-action-icon-right"
              onClick={() => { handleDeleteBoard(originalIndex) }}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        ))}

        <div className="board-card add-new-board-card"
          onClick={() => { handleAddBoard() }}
        >
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>

      {editIndex !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-flex">
              <input
                className="inputBoardColor"
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <button className="close-modal-button" onClick={handleCloseModal}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <input
              className="inputBoardTitle"
              maxLength="42"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
            />
            <div className="modal-flex">
              <span
                style={newTitle.length >= 42
                  ? { color: "red" }
                  : { color: "#1f2023" }}
              >
                42/{newTitle.length}
              </span>
              <button className="save-modal-button"
                onClick={() => handleSaveEdit(editIndex)}
                style={newTitle
                  ? { pointerEvents: 'initial', opacity: 1 }
                  : { pointerEvents: 'none', opacity: .5 }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
