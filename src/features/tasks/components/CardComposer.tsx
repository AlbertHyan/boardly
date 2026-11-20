import { useState } from 'react';

interface CardComposerProps {
  handleAddCard: (color: string) => void;
  cardValue: string;
  setCardValue: (value: string) => void;
  getRandomColor: () => string;
  textareaHeight: string;
  setTextareaHeight: (height: string) => void;
}


export default function CardComposer({
  handleAddCard,
  cardValue,
  setCardValue,
  getRandomColor,
  textareaHeight,
  setTextareaHeight
}: CardComposerProps) {
  const [randomColor] = useState(getRandomColor);

  const isButtonActive = cardValue.trim().length > 0;

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    const value = textarea.value;

    setCardValue(value);
    setTextareaHeight('auto');
    setTextareaHeight(`${textarea.scrollHeight}px`);

    // resposnive textarea
    const header = document.querySelector('header');

    if (header instanceof HTMLElement) {
      if (textarea.scrollHeight > 65) {
        header.style.flexDirection = 'column';
      } else if (!value) {
        header.style.flexDirection = 'row';
      }
    }
  };

  const handleSubmit = () => {
    if (!isButtonActive) return;
    handleAddCard(randomColor);
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="card-composer__input-row">
        <textarea
          className="card-composer__textarea"
          rows={1}
          value={cardValue}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          style={{
            backgroundColor: `${randomColor.slice(0, -2) + 15}`,
            height: textareaHeight
          }}
          placeholder="Enter card content..."
        />

        <button
          type="button"
          className={`font-press-start ${
            isButtonActive ? 'btn-active' : 'button--disabled'
          }`}
          onClick={handleSubmit}
          disabled={!isButtonActive}
        >
          Add
        </button>
      </div>
    </>
  );
}
