import { useEffect, useState } from "react";
import BoardsPage from "./components/BoardsPage.jsx";
import BoardView from "./components/BoardView.jsx";
import RecentCards from "./components/RecentCards.jsx";


const DEFAULT_BOARDS = [
  {
    title: "Project “New Product Launch”",
    color: "#76ce12",
    todos: [
      { text: "Conduct market research.", color: "#76ce1280", date: "01.11.26", currentTime: 1730841459567 },
      { text: "Develop a prototype.", color: "#76ce1260", date: "02.11.26", currentTime: 1730841511550 },
      { text: "Plan an advertising campaign.", color: "#76ce1240", date: "03.11.26", currentTime: 1730841530406 },
      { text: "Prepare for the product presentation.", color: "#76ce1220", date: "04.11.26", currentTime: 1730841589676 },
    ]
  },
  {
    title: "Personal Development and Education",
    color: "#ceb512",
    todos: [
      { text: "Read a book on personal growth.", color: "#ceb51280", date: "01.11.26", currentTime: 1730841459567 },
      { text: "Complete an online course on new skills.", color: "#ceb51260", date: "02.11.26", currentTime: 1730841511550 },
      { text: "Attend a webinar.", color: "#ceb51240", date: "03.11.26", currentTime: 1730841530406 },
      { text: "Write a reflection on the learned materials.", color: "#ceb51220", date: "04.11.26", currentTime: 1730841589676 },
    ]
  },
  {
    title: "Team Project “Company Rebranding”",
    color: "#12ce86",
    todos: [
      { text: "Analyze the current brand.", color: "#12ce8680", date: "01.11.26", currentTime: 1730841459567 },
      { text: "Create new logos and slogans.", color: "#12ce8660", date: "02.11.26", currentTime: 1730841511550 },
      { text: "Review designs with the team.", color: "#12ce8640", date: "03.11.26", currentTime: 1730841530406 },
      { text: "Prepare materials for the rebranding launch.", color: "#12ce8620", date: "04.11.26", currentTime: 1730841589676 },
    ]
  },
  {
    title: "Personal Project “Travel Planning”",
    color: "#12cecb",
    todos: [
      { text: "Choose a destination and travel dates.", color: "#12cecb80", date: "01.11.26", currentTime: 1730841459567 },
      { text: "Book tickets and accommodation.", color: "#12cecb60", date: "02.11.26", currentTime: 1730841511550 },
      { text: "Make a list of places to visit.", color: "#12cecb40", date: "03.11.26", currentTime: 1730841530406 },
      { text: "Prepare documents and luggage.", color: "#12cecb20", date: "04.11.26", currentTime: 1730841589676 },
    ]
  }
];


function App() {
  // Load BoardViews from localStorage when the component mounts
  const [BoardViews, setBoardViews] = useState(() => {
    try {
      const savedBoardViews = localStorage.getItem('BoardViews');
      console.log(savedBoardViews);  // show localBoardViews
      return savedBoardViews ? JSON.parse(savedBoardViews) : DEFAULT_BOARDS;
    } catch (error) {
      console.error("Failed to parse Boards from localStorage", error);
      return DEFAULT_BOARDS;
    }
  });

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  // Save BoardViews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("BoardViews", JSON.stringify(BoardViews));
    } catch (error) {
      console.error("Failed to save Boards to localStorage", error);
    }
  }, [BoardViews]);

  // Change title in Board
  const handleTitleChange = (index, newTitle) => {
    setBoardViews(prevBoards =>
      prevBoards.map((board, i) =>
        i === index ? { ...board, title: newTitle } : board
      )
    );
  };

  // Confirmation before deletion
  const handleDeleteLocalStorage = () => {
    const userConfirmed = window.confirm("Danger Zone \nAre you sure you want to delete your data?")
    if (!userConfirmed) return;  // Action cancelled.

    const confirmationBeforeDeletion = window.confirm("I understand and want to delete my data.")
    if (!confirmationBeforeDeletion) return;
    
    localStorage.removeItem("BoardViews");
    setBoardViews(DEFAULT_BOARDS);
    setSelectedBoardIndex(null);  // Return the user to the main screen
    console.log("Data reset to default.");
  }

  const currentBoard = selectedBoardIndex !== null && BoardViews[selectedBoardIndex]
    ? BoardViews[selectedBoardIndex] 
    : null;

  const todos = currentBoard ? currentBoard.todos : [];
  const BoardViewTitle = currentBoard ? currentBoard.title : "Empty Board Title";

  return (
    <>
      {selectedBoardIndex === null ? (
        <>
          <BoardsPage
            onSelectBoard={setSelectedBoardIndex}
            BoardViews={BoardViews} 
            setBoardViews={setBoardViews}
          />
          <RecentCards
            BoardViews={BoardViews}
          />
          <button className="reset-btn"
            onClick={handleDeleteLocalStorage}
          >
            Reset to Default
          </button>
        </>
      ) : (
        <BoardView
          boardIndex={selectedBoardIndex}
          todos={todos}
          onBack={() => setSelectedBoardIndex(null)}
          setBoardViews={setBoardViews}
          BoardViewTitle={BoardViewTitle}
          onTitleChange={(newTitle) => handleTitleChange(selectedBoardIndex, newTitle)}
        />
      )}
    </>
  );
}

export default App;
