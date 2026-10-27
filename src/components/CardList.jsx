import CardItem from './CardItem.jsx';

export default function CardList(props) {
  const { cards } = props;

  return (
    <ul className="main container">
      {cards.map((card, cardIndex) => {
        return (
          <CardItem
            {...props}
            key={cardIndex}
            index={cardIndex}
            card={card}
          >
            <p>{card.text}</p>
          </CardItem>
        );
      })}
    </ul>
  );
}
