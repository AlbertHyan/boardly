import { useEffect, useState } from "react";
import BoardsPage from "./components/BoardsPage.jsx";
import BoardPage from "./components/BoardPage.jsx";
import RecentCards from "./components/RecentCards.jsx";


const DEFAULT_BOARDS = [
  {
    title: "Project “New Product Launch”",
    color: "#76ce12",
    todos: [
      { text: "Conduct market research.", color: "#76ce1280", date: "01.11.26", currentTime: 1793491200000 },
      { text: "Develop a prototype.", color: "#76ce1260", date: "02.11.26", currentTime: 1793577600000 },
      { text: "Plan an advertising campaign.", color: "#76ce1240", date: "03.11.26", currentTime: 1793664000000 },
      { text: "Prepare for the product presentation.", color: "#76ce1220", date: "04.11.26", currentTime: 1793750400000 },
    ]
  },
  {
    title: "Personal Development and Education",
    color: "#ceb512",
    todos: [
      { text: "Read a book on personal growth.", color: "#ceb51280", date: "01.11.26", currentTime: 1793491210000 },
      { text: "Complete an online course on new skills.", color: "#ceb51260", date: "02.11.26", currentTime: 1793577610000 },
      { text: "Attend a webinar.", color: "#ceb51240", date: "03.11.26", currentTime: 1793664100000 },
      { text: "Write a reflection on the learned materials.", color: "#ceb51220", date: "04.11.26", currentTime: 1793750410000 },
    ]
  },
  {
    title: "Team Project “Company Rebranding”",
    color: "#12ce86",
    todos: [
      { text: "Analyze the current brand.", color: "#12ce8680", date: "01.11.26", currentTime: 1793491220000 },
      { text: "Create new logos and slogans.", color: "#12ce8660", date: "02.11.26", currentTime: 1793577620000 },
      { text: "Review designs with the team.", color: "#12ce8640", date: "03.11.26", currentTime: 1793664200000 },
      { text: "Prepare materials for the rebranding launch.", color: "#12ce8620", date: "04.11.26", currentTime: 1793750420000 },
    ]
  },
  {
    title: "Personal Project “Travel Planning”",
    color: "#12cecb",
    todos: [
      { text: "Choose a destination and travel dates.", color: "#12cecb80", date: "01.11.26", currentTime: 1793491230000 },
      { text: "Book tickets and accommodation.", color: "#12cecb60", date: "02.11.26", currentTime: 1793577630000 },
      { text: "Make a list of places to visit.", color: "#12cecb40", date: "03.11.26", currentTime: 1793664300000 },
      { text: "Prepare documents and luggage.", color: "#12cecb20", date: "04.11.26", currentTime: 1793750430000 },
    ]
  }
];


function App() {
  // Load boards from localStorage when the component mounts
  const [boards, setBoards] = useState(() => {
    try {
      const savedBoards = localStorage.getItem('boardly:boards');
      console.log(savedBoards);  // show localBoards
      return savedBoards ? JSON.parse(savedBoards) : DEFAULT_BOARDS;
    } catch (error) {
      console.error("Failed to parse boards from localStorage", error);
      return DEFAULT_BOARDS;
    }
  });

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  // Save boards to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("boardly:boards", JSON.stringify(boards));
    } catch (error) {
      console.error("Failed to save boards to localStorage", error);
    }
  }, [boards]);

  // Change title in Board
  const handleBoardTitleChange = (index, newTitle) => {
    setBoards(prevBoards =>
      prevBoards.map((board, boardIndex) =>
        boardIndex === index ? { ...board, title: newTitle } : board
      )
    );
  };

  // Confirmation before deletion
  const handleResetData = () => {
    const userConfirmed = window.confirm(
      "Danger Zone \nAre you sure you want to delete your data?"
    );

    if (!userConfirmed) return;  // Action cancelled.

    const confirmationBeforeDeletion = window.confirm(
      "I understand and want to delete my data."
    );

    if (!confirmationBeforeDeletion) return;

    try {
      localStorage.removeItem('boardly:boards');
    } catch (error) {
      console.error("Failed to clear stored data:", error);
      window.alert("Could not reset the saved data.");
      return;
    }

    setBoards(DEFAULT_BOARDS);
    setSelectedBoardIndex(null);  // Return the user to the main screen
    console.log("Data reset to default.");
  }

  const currentBoard =
    selectedBoardIndex !== null && boards[selectedBoardIndex]
      ? boards[selectedBoardIndex]
      : null;

  // const todos = currentBoard ? currentBoard.todos : [];
  const boardTitle = currentBoard ? currentBoard.title : "Empty Board Title";

  return (
    <>
      {selectedBoardIndex === null ? (
        <>
          <BoardsPage
            onSelectBoard={setSelectedBoardIndex}
            boards={boards}
            setBoards={setBoards}
          />

          <RecentCards boards={boards} />

          <button
            className="reset-btn"
            onClick={handleResetData}
          >
            Reset to Default
          </button>
        </>
      ) : (
        <BoardPage
          key={selectedBoardIndex}
          boardIndex={selectedBoardIndex}
          cards={currentBoard.todos} // todos
          onBack={() => setSelectedBoardIndex(null)}
          setBoards={setBoards}
          boardTitle={boardTitle}
          onTitleChange={(newTitle) => handleBoardTitleChange(selectedBoardIndex, newTitle)}
        />
      )}
    </>
  );
}

export default App;
