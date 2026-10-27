import { useState, useEffect } from "react";
import CardComposer from "./CardComposer.jsx";
import CardList from "./CardList";

export default function BoardPage({
  boardIndex,
  cards,
  onBack,
  setBoards,
  boardTitle,
  onTitleChange
}) {

  const [cardItems, setCardItems] = useState(cards);
  const [cardValue, setCardValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');

  document.title = `${boardTitle} [ ${cardItems.length} ]`;

  useEffect(() => {
    setCardItems(cards);
  }, [cards]);

  useEffect(() => {
    setBoards(prevBoards => {
      if (!prevBoards[boardIndex]) {
        return prevBoards;
      }

      if (prevBoards[boardIndex]?.todos === cardItems) {
        return prevBoards;
      }

      const updatedBoards = [...prevBoards];

      updatedBoards[boardIndex] = {
        ...updatedBoards[boardIndex],
        todos: cardItems
      };

      return updatedBoards;
    });
  }, [cardItems, setBoards, boardIndex]);

  function responsiveCards() {
    const cardTextElements = document.querySelectorAll('.todoItem p');

    cardTextElements.forEach(cardTextElement => {
      if (cardTextElement.textContent.length > 40 ||
        (cardTextElement.offsetHeight >= 68 && cardTextElement.offsetWidth < 110)
      ) {
        cardTextElement.classList.add('long-text');
      } else {
        cardTextElement.classList.remove('long-text');
      }
    });
  }

  useEffect(() => {
    responsiveCards();
  }, [cards]);

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

  function handleAddCard(randomColor) {
    const newCard = {
      text: cardValue.trim(),
      color: randomColor,
      date: formatDate(Date.now()),
      currentTime: Date.now()
    };

    // Update in App's boards
    setCardItems([...cardItems, newCard]);
    setCardValue('');

    // responsive textarea
    setTextareaHeight('auto');

    const header = document.querySelector('header');
    header.style.flexDirection = 'row';
  }

  function moveCardUp(index) {
    if (index > 0) {
      const updatedCards = [...cardItems];

      [updatedCards[index], updatedCards[index - 1]] =
        [updatedCards[index - 1], updatedCards[index]];

      setCardItems(updatedCards);
    }
  }

  function moveCardDown(index) {
    if (index < cardItems.length - 1) {
      const updatedCards = [...cardItems];

      [updatedCards[index], updatedCards[index + 1]] =
        [updatedCards[index + 1], updatedCards[index]];

      setCardItems(updatedCards);
    }
  }

  function handleDeleteCard(index) {
    const updatedCards = cardItems.filter((_, i) => i !== index);
    setCardItems(updatedCards);
  }

  function handleEditCard(index) {
    const valueToBeEdited = cardItems[index].text;
    setCardValue(valueToBeEdited);

    handleDeleteCard(index);  // delete todo
  }

  return (
    <>
      <div className="flex-wrapper container">
        <button className="back-btn" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Boards</span>
        </button>

        <h3>{cardItems.length} Tasks</h3>
      </div>

      <CardComposer
        cardValue={cardValue}
        setCardValue={setCardValue}
        textareaHeight={textareaHeight}
        setTextareaHeight={setTextareaHeight}
        handleAddCard={handleAddCard}
        getRandomColor={getRandomColor}
        boardTitle={boardTitle}
        onTitleChange={onTitleChange}
      />

      <CardList
        moveCardUp={moveCardUp}
        moveCardDown={moveCardDown}
        handleEditCard={handleEditCard}
        handleDeleteCard={handleDeleteCard}
        cards={cardItems}
      />
    </>
  );
}
