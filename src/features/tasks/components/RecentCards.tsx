import { useMemo, useState } from 'react';
import type { Board } from '@shared/types/board';


interface RecentCardsProps {
  boards: Pick<Board, 'id' | 'title' | 'items'>[];
}

type ViewMode = 'grid' | 'list';


export default function RecentCards({ boards }: RecentCardsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  /* // Flatten cards from all boards into a single array
  const allCards = boards.reduce((acc, board) => {
    return acc.concat(board.todos.map(card => ({
      ...card
    })));
  }, []); */

  const recentCards = useMemo(() => {
    return boards
      .flatMap((board) =>
        board.items.flatMap((item) => {
          if (item.type !== 'task-list') return [];

          return item.tasks.map((task) => ({
            ...task,
            boardId: board.id,
            boardTitle: board.title,
            taskListId: item.id,
            taskListTitle: item.title,
          }));
        })
      )
      .sort((a, b) => b.currentTime - a.currentTime)  // Sort cards by date in descending order
      .slice(0, 10);                                  // Take the top 10 most recent cards
  }, [boards]);

  /* function responsiveCards() {
    const cardBoxElements = document.querySelectorAll('.task-card');

    cardBoxElements.forEach(cardBoxElement => {
      const textElement = cardBoxElement.querySelector('p');

      if (!textElement) return;

      if (cardBoxElement.offsetHeight >= 72) {
        textElement.classList.add('task-card__text--expanded');
      } else {
        textElement.classList.remove('task-card__text--expanded');
      }
    });
  }

  useEffect(() => {
    responsiveCards();
  }, [recentCards]); */

  return (
    <section className="app-container flex flex-col gap-4">

      <hr className="border-t border-[#0003] mb-4" />

      <div className="flex items-center justify-between">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-4 p-2 hover:bg-[#d9dfe9] rounded-lg cursor-pointer transition-colors">
          <i className={`fa-solid fa-angle-down text-xl transition-transform duration-300 ${!isOpen ? '-rotate-90' : ''}`}></i>
          <h2 className="font-press-start">Recent Cards</h2>
        </div>

        <div className="flex items-center text-gray-700 bg-gray-200 rounded-lg border-4 border-[#d9dfe9] overflow-hidden">
          <button type="button"
            onClick={() => setViewMode('grid')}
            className={`px-2 py-1 cursor-pointer transition-colors ${
              viewMode === 'grid' ? 'bg-gray-500 text-white' : 'hover:text-blue-600'
            }`}
            title="Grid view"
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
          >
            <i className="fa-solid fa-grip"></i>
          </button>

          <button type="button"
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 cursor-pointer transition-colors ${
              viewMode === 'list' ? 'bg-gray-500 text-white' : 'hover:text-blue-600'
            }`}
            title="List view"
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            <i className="fa-solid fa-list -scale-x-100"></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <ul className={`w-full gap-4 ${
          viewMode === 'grid' ? "flex flex-wrap" : "flex flex-col"
        }`}>
          {recentCards.map((card) => (
              <li className="task-card"
                key={card.id}
                style={{ backgroundColor: card.color }}
              >
                <p className="task-card__text">{card.text}</p>

                <div className="task-card__footer">
                  <span className="task-card__date"> {card.date}</span>
                </div>
              </li>
          ))}
        </ul>
      )}
    </section>
  );
}
