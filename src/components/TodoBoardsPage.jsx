import { useState } from "react"
import { useDebounce } from "../hooks/useDebounce.js";

export default function TodoBoardsPage({ onSelectBoard, todoBoards, setTodoBoards }) {

    // Modal useStates
    const [editIndex, setEditIndex] = useState(null); 
    const [newTitle, setNewTitle] = useState(""); 
    const [newColor, setNewColor] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 400);

    const boardsList = todoBoards.filter(board => 
        board.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    document.title = `TODO Boards [ ${todoBoards.length} ]`;

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

    function handleAddTodoBoard() {
        const newTodoBaord = {
            title: `Board ${todoBoards.length + 1}`,
            color: getRandomBoardColor(),  // color default by #76ce12
            todos: []
        }

        setTodoBoards(prevTodoBoards => [...prevTodoBoards, newTodoBaord]);
    }

    function handleEditTodoBoard(index) {
        setEditIndex(index); 
        setNewTitle(todoBoards[index].title); 
        setNewColor(todoBoards[index].color || "#76ce12");
    }
    function handleSaveEdit(index) { 
        if (newTitle && newTitle.length <= 42) { 
            const updatedBoards = todoBoards.map((board, i) => i === index 
            ? { ...board, title: newTitle, color: newColor } : board); 
            setTodoBoards(updatedBoards); 
            setEditIndex(null);
        } else { 
            alert("Title must be 42 characters or less."); 
        } 
    }
    function handleCloseModal() {
        setEditIndex(null);
    }

    function handleDeleteTodoBoard(index) {
        const newTodoBoards = todoBoards.filter((_, i) => i !== index);
        setTodoBoards(newTodoBoards);
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
        const updatedBoards = [...todoBoards];
        const draggedBoard = updatedBoards.splice(draggedBoardIndex, 1)[0];
        updatedBoards.splice(index, 0, draggedBoard);

        setTodoBoards(updatedBoards);
        setDraggedBoardIndex(null); // сброс индекса после перетаскивания

        setIsDragging(false); // Сброс состояния после перетаскивания
    };

    return (
        <main className="todo-boards-container">
            <h2>Your Boards {todoBoards.length}</h2>

            <input type="search" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search Board..."
                className="search-input"
            />

            <div className="boards-grid">
                {boardsList.map((board, boardIndex) => {
                    return (

                        <div className={`board-card ${isDragging && draggedBoardIndex === boardIndex ? "dragging" : ""}`}
                            key={boardIndex}
                            style={{ backgroundColor: board.color || "#76ce12" }}
                            
                            draggable="true"
                            onDragStart={() => handleDragStart(boardIndex)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(boardIndex)}
                            onDragEnd={handleDragEnd}
                        >
                            <div onClick={() => onSelectBoard(boardIndex)} />
                            <h3 onClick={() => onSelectBoard(boardIndex)}>
                                {board.title || "No Title"}
                            </h3>
                            <button className="board-action-icon-left"
                                onClick={() => { handleEditTodoBoard(boardIndex) }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="board-action-icon-right"
                                onClick={() => { handleDeleteTodoBoard(boardIndex) }}>
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    );
                })}

                <div className="board-card add-new-board-card"
                    onClick={() => { handleAddTodoBoard() }}
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
                                    ? {color: "red"} 
                                    : {color: "#1f2023"}}
                            >
                                42/{newTitle.length}
                            </span>
                            <button className="save-modal-button" 
                                onClick={() => handleSaveEdit(editIndex)}
                                style={newTitle 
                                    ? {pointerEvents: 'initial', opacity: 1} 
                                    : {pointerEvents: 'none', opacity: .5}}
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
