import { useEffect } from "react";


export default function RecentCards(props) {
  const { boards } = props;

  // Flatten cards from all boards into a single array
  const allCards = boards.reduce((acc, board) => {
    return acc.concat(board.todos.map(card => ({
      ...card
    })));
  }, []);

  // Sort cards by date in descending order
  const sortedCards = allCards.sort((a, b) => b.currentTime - a.currentTime);

  // Take the top 10 most recent cards 
  const recentCards = sortedCards.slice(0, 10);

  function responsiveCards() {
    const cardBoxElements = document.querySelectorAll('.todoItem');

    cardBoxElements.forEach(cardBoxElement => {
      const textElement = cardBoxElement.querySelector('p');

      if (!textElement) return;

      if (cardBoxElement.offsetHeight >= 72) {
        textElement.classList.add('long-text');
      } else {
        textElement.classList.remove('long-text');
      }
    });
  }

  useEffect(() => {
    responsiveCards();
  }, [recentCards]);

  return (
    <main className="recent-todos-container">
      <hr />

      <h2>Recent Cards</h2>

      <ul className="main"
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {recentCards.map((card, index) => {
          return (
            <li className="todoItem"
              key={index}
              style={{
                backgroundColor: card.color
              }}
            >
              <p>{card.text}</p>

              <div className="wrapper">
                <span className="todoDate">
                  {card.date}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
