export default function TodoCard(props) {

    const { 
        children, // todo
        index, 
        moveTodoUp,
        moveTodoDown, 
        handleEditTodo,
        handleDeleteTodo,
        todo
    } = props;
    
    return (
        <>
            <li className="todoItem" style={{ backgroundColor: todo.color }}>
                {children}
                <div className="wrapper">
                    <span className="todoDate">
                        {todo.date}
                    </span>
                    <div className="actionsContainer">
                        <button onClick={() => { moveTodoUp(index) }}>
                            <i className="fa-solid fa-angle-up"></i>
                        </button>
                        <button onClick={() => { moveTodoDown(index) }}>
                            <i className="fa-solid fa-angle-down"></i>
                        </button>
                        <button onClick={() => { handleEditTodo(index) }}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={() => { handleDeleteTodo(index) }}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </li>
        </>
    );
}