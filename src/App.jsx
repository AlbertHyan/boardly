import { useEffect, useState } from "react";
import TodoBoardsPage from "./components/TodoBoardsPage.jsx";
import TodoBoard from "./components/TodoBoard.jsx";
import RecentTodoCards from "./components/RecentTodoCards.jsx";

function App() {
    // Load todoBoards from localStorage when the component mounts
    const [todoBoards, setTodoBoards] = useState(() => {
        const savedTodoBoards = localStorage.getItem('todoBoards');
        console.log(savedTodoBoards);  // show localTodoBoards
        return savedTodoBoards ? JSON.parse(savedTodoBoards) : [
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
    });

    const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

    const todos = selectedBoardIndex !== null 
    ? todoBoards[selectedBoardIndex].todos 
    : [];

    const todoBoardTitle = selectedBoardIndex !== null 
    ? todoBoards[selectedBoardIndex].title
    : "Empty Board Title";

    // Save todoBoards to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todoBoards", JSON.stringify(todoBoards));
    }, [todoBoards]);


    // Change Title in TodoBoard
    const handleTitleChange = (index, newTitle) => {
        const updatedBoards = [...todoBoards];
        updatedBoards[index].title = newTitle;
        setTodoBoards(updatedBoards);
    };


    // Confirmation before deletion
    function handleDeleteLocalStorage() {
        const userConfirmed = 
        window.confirm("Danger Zone \nAre you sure you want to delete your data?")

        if (userConfirmed) {
            const confirmationBeforeDeletion = 
            window.confirm("I understand and want to delete my data.")

            if (confirmationBeforeDeletion) {
                localStorage.clear();
                console.log("Data removed.");
            }
            console.log("Action cancelled.");
        } else {
            console.log("Action cancelled.");
        }
    }

    return (
        <>
            {selectedBoardIndex === null ? (
                <>
                    <TodoBoardsPage
                        onSelectBoard={setSelectedBoardIndex}
                        todoBoards={todoBoards} setTodoBoards={setTodoBoards}
                    />
                    <RecentTodoCards
                        todoBoards={todoBoards}
                    />
                    <button className="reset-btn" 
                        onClick={handleDeleteLocalStorage}
                    >
                        Reset to Default
                    </button>
                </>
            ) : (
                <TodoBoard
                    boardIndex={selectedBoardIndex}
                    todos={todos}
                    onBack={() => setSelectedBoardIndex(null)}
                    setTodoBoards={setTodoBoards}
                    todoBoardTitle={todoBoards[selectedBoardIndex].title}
                    onTitleChange={(newTitle) => handleTitleChange(selectedBoardIndex, newTitle)}
                />
            )}
        </>
    );
}

export default App;
