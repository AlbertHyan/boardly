import { useEffect, useState } from "react";

export default function TodoInput(props) {

    const { 
        handleAddTodo, 
        todoValue, 
        setTodoValue, 
        getRandomColor,
        textareaHeight,
        setTextareaHeight,

        BoardViewTitle,
        onTitleChange
    } = props;
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [randomColor, setRandomColor] = useState('');

    // Enter keydown
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Предотвращаем переход на новую строку
                document.getElementById('add-btn').click();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, []);

    // Show/Hide Add button
    useEffect(() => {
        setIsButtonActive(todoValue !== '');
    }, [todoValue]);

    // Set random background color for input
    useEffect(() => {
        setRandomColor(getRandomColor());
    }, [getRandomColor]);


    // Handle textarea resize
    const handleTextareaChange = (event) => {
        setTodoValue(event.target.value);
        setTextareaHeight('auto');
        setTextareaHeight(`${event.target.scrollHeight}px`);

        // resposnive textarea
        const header = document.querySelector('header');
        if (event.target.scrollHeight > 65) {
            header.style.flexDirection = 'column';
        } else if (!event.target.value) {
            header.style.flexDirection = 'row';
        }
    };

    const [BoardViewTitleValue, setBoardViewTitleValue] = useState(BoardViewTitle);

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setBoardViewTitleValue(newTitle);
        onTitleChange(newTitle);  // Update title in parent component
    };

    return (
        <>
            <input className="boardTitleInput container"
                maxLength="42"
                type="text" 
                value={BoardViewTitleValue} 
                onChange={handleTitleChange}
                placeholder="TODO Title" 
            />

            <header className="container">
                <textarea
                    className="todoTextarea" 
                    rows={1} 
                    value={todoValue}
                    // onChange={(event) => setTodoValue(event.target.value)}
                    onChange={handleTextareaChange} 
                    style={{ 
                        backgroundColor: `${randomColor.slice(0, -2) + 15}`,
                        height: textareaHeight
                    }}
                    placeholder="Enter todo..." 
                ></textarea>

                <button 
                    id="add-btn"
                    className={isButtonActive ? 'btn-active' : 'btn-inactive'}
                    onClick={() => {
                        todoValue !== '' && handleAddTodo(randomColor);
                    }}
                >Add</button>
            </header>
        </>
    );
}