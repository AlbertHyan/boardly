import { useEffect } from "react";


export default function RecentTodoCards(props) {
    const { todoBoards } = props;

    // Flatten todos from all boards into a single array
    const allTodos = todoBoards.reduce((acc, board) => {
        return acc.concat(board.todos.map(todo => ({
            ...todo
        })));
    }, []);

    // Sort todos by date in descending order
    const sortedTodos = allTodos.sort((a, b) => b.currentTime - a.currentTime);

    // Take the top 10 most recent todos 
    const recentTodos = sortedTodos.slice(0, 10);

    function responsiveTodo() {
        const todoBoxElements = document.querySelectorAll('.todoItem');
        todoBoxElements.forEach(todoBoxElement => {
            if (todoBoxElement.offsetHeight >= 72) {
                todoBoxElement.querySelector('p').classList.add('long-text');
            } else {
                todoBoxElement.querySelector('p').classList.remove('long-text');
            }
        });
    }
    useEffect(() => {
        responsiveTodo();
    }, [recentTodos]);

    return(
        <main className="recent-todos-container">
            <hr />
            <h2>Recent Todos</h2>

            <ul className="main" style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {recentTodos.map((todo, index) => {
                    return(
                        <li className="todoItem" 
                            key={index} 
                            style={{ 
                                backgroundColor: todo.color
                            }}
                        >
                            <p>{todo.text}</p>
                            <div className="wrapper">
                                <span className="todoDate">
                                    {todo.date}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
