import type { ReactNode } from 'react';
import type { Task } from '@shared/types/board';

interface CardItemProps {
  children: ReactNode;
  index: number;
  card: Task;
  moveCardUp: (index: number) => void;
  moveCardDown: (index: number) => void;
  handleEditCard: (index: number) => void;
  handleDeleteCard: (index: number) => void;
}


export default function CardItem({
  children, // task card
  index,
  moveCardUp,
  moveCardDown,
  handleEditCard,
  handleDeleteCard,
  card
}: CardItemProps) {
  return (
    <li className="task-card" style={{ backgroundColor: card.color }}>
      {children}

      <div className="task-card__footer">
        <p className="task-card__date flex-center">
          {card.date}
        </p>

        <div className="task-card__actions">
          <button 
            type="button" 
            aria-label="Move card up" 
            onClick={() => { moveCardUp(index) }}
          >
            <i className="fa-solid fa-angle-up" aria-hidden="true"></i>
          </button>

          <button 
            type="button" 
            aria-label="Move card down" 
            onClick={() => { moveCardDown(index) }}
          >
            <i className="fa-solid fa-angle-down" aria-hidden="true"></i>
          </button>

          <button 
            type="button" 
            aria-label="Edit card" 
            onClick={() => { handleEditCard(index) }}
          >
            <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
          </button>

          <button 
            type="button" 
            aria-label="Delete card" 
            onClick={() => { handleDeleteCard(index) }}
          >
            <i className="fa-regular fa-trash-can" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </li>
  );
}
