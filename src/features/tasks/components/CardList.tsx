import type { Task } from '@shared/types/board';
import CardItem from './CardItem.tsx';

interface CardListProps {
  cards: Task[];
  moveCardUp: (index: number) => void;
  moveCardDown: (index: number) => void;
  handleEditCard: (index: number) => void;
  handleDeleteCard: (index: number) => void;
}

export default function CardList({
  cards,
  moveCardUp,
  moveCardDown,
  handleEditCard,
  handleDeleteCard
}: CardListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {cards.map((card, cardIndex) => {
        return (
          <CardItem
            key={card.id}
            index={cardIndex}
            card={card}
            moveCardUp={moveCardUp}
            moveCardDown={moveCardDown}
            handleEditCard={handleEditCard}
            handleDeleteCard={handleDeleteCard}
          >
            <p className="task-card__text">{card.text}</p>
          </CardItem>
        );
      })}
    </ul>
  );
}
