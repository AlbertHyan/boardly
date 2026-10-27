import { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import CardList from "./CardList.jsx";

export default function BoardView({ 
    boardIndex, 
    todos, 
    onBack, 
    setBoardViews, 
    BoardViewTitle,
    onTitleChange }) {

    const [todoItems, setTodoItems] = useState(todos);
    const [todoValue, setTodoValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');

    document.title = `${BoardViewTitle} [ ${todoItems.length} ]`;

    useEffect(() => {
        setTodoItems(todos);
    }, [todos]);

    useEffect(() => {
        setBoardViews(prevBoards => {
            const updatedBoards = [...prevBoards];
            updatedBoards[boardIndex] = {
                ...updatedBoards[boardIndex],
                todos: todoItems
            };
            return updatedBoards;
        });
    }, [todoItems, setBoardViews, boardIndex]);

    function responsiveTodo() {
        const todoTextElements = document.querySelectorAll('.todoItem p');
        todoTextElements.forEach(todoTextElement => {
            if (todoTextElement.textContent.length > 40 ||
                (todoTextElement.offsetHeight >= 68 && todoTextElement.offsetWidth < 110)
            ) {
                todoTextElement.classList.add('long-text');
            } else {
                todoTextElement.classList.remove('long-text');
            }
        });
    }
    useEffect(() => {
        responsiveTodo();
    }, [todos]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#'; 
        for (let i = 0; i < 6; i++) { 
            color += letters[Math.floor(Math.random() * 16)];
        } 
        return color += '50';
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        let day = date.getDate();
        let month = date.getMonth() + 1;  // Months started with 0
        const year = date.getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return `${day}.${month}.${year}`;
    }

    function handleAddTodo(randomColor) {
        const newTodo = { 
            text: todoValue.trim(), 
            color: randomColor,
            date: formatDate(Date.now()),
            currentTime: Date.now()
        };

        // Update in App's BoardViews
        setTodoItems([...todoItems, newTodo]);
        setTodoValue('');
        
        // responsive textarea
        setTextareaHeight('auto');
        const header = document.querySelector('header'); 
        header.style.flexDirection = 'row';
    }

    function moveTodoUp(index) {
        if(index > 0) {
            const updatedTodos = [...todoItems];
            [updatedTodos[index], updatedTodos[index - 1]] =
            [updatedTodos[index - 1], updatedTodos[index]];

            setTodoItems(updatedTodos);
        }
    }

    function moveTodoDown(index) {
        if(index < todoItems.length - 1) {
            const updatedTodos = [...todoItems];
            [updatedTodos[index], updatedTodos[index + 1]] =
            [updatedTodos[index + 1], updatedTodos[index]];

            setTodoItems(updatedTodos);
        }
    }

    function handleDeleteTodo(index) {
        // const newCardList = 
        // todos.filter((todo, todoIndex) => { return todoIndex !== index; });
        const updatedTodos = todoItems.filter((_, i) => i !== index);
        setTodoItems(updatedTodos);
    }

    function handleEditTodo(index) {
        const valueToBeEdited = todoItems[index].text;
        setTodoValue(valueToBeEdited);

        handleDeleteTodo(index);  // delete todo
    }

    // useEffect(() => {
    //     if (!localStorage) {  // if we don't have permision to use localStorage
    //         return;
    //     }

    //     let localTodos = localStorage.getItem('todos');
    //     if (!localTodos) {
    //         return
    //     }

    //     console.log(localTodos);
    //     localTodos = JSON.parse(localTodos).todos;
    //     setTodos(localTodos);

    // }, []);

    return (
        <>
            <div className="flex-wrapper container">
                <button className="back-btn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Back to Boards</span>
                </button>
                <h3>{todoItems.length} Tasks</h3>
            </div>
            <TodoInput
                todoValue={todoValue} 
                setTodoValue={setTodoValue}
                textareaHeight={textareaHeight}
                setTextareaHeight={setTextareaHeight}
                handleAddTodo={handleAddTodo}
                getRandomColor={getRandomColor}

                BoardViewTitle={BoardViewTitle}
                onTitleChange={onTitleChange}
            />
            <CardList
                moveTodoUp={moveTodoUp}
                moveTodoDown={moveTodoDown}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                todos={todoItems}
            />
        </>
    );
}