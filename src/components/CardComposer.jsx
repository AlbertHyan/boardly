import { useEffect, useState } from "react";

export default function CardComposer(props) {

  const {
    handleAddCard,
    cardValue,
    setCardValue,
    getRandomColor,
    textareaHeight,
    setTextareaHeight,
    boardTitle,
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
    setIsButtonActive(cardValue.trim() !== '');
  }, [cardValue]);

  // Set random background color for input
  useEffect(() => {
    setRandomColor(getRandomColor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Handle textarea resize
  const handleTextareaChange = (event) => {
    setCardValue(event.target.value);
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

  const [boardTitleValue, setBoardTitleValue] = useState(boardTitle);

  useEffect(() => {
    setBoardTitleValue(boardTitle);
  }, [boardTitle]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setBoardTitleValue(newTitle);
    onTitleChange(newTitle);  // Update title in parent component
  };

  return (
    <>
      <input className="boardTitleInput container"
        maxLength="42"
        type="text"
        value={boardTitleValue}
        onChange={handleTitleChange}
        placeholder="Board Title"
      />

      <header className="container">
        <textarea
          className="todoTextarea"
          rows={1}
          value={cardValue}
          onChange={handleTextareaChange}
          style={{
            backgroundColor: `${randomColor.slice(0, -2) + 15}`,
            height: textareaHeight
          }}
          placeholder="Enter card content..."
        ></textarea>

        <button
          id="add-btn"
          className={isButtonActive ? 'btn-active' : 'btn-inactive'}
          onClick={() => {
            cardValue.trim() !== '' && handleAddCard(randomColor);
          }}
        >Add</button>
      </header>
    </>
  );
}
