export default function CardItem(props) {
  const {
    children, // todo card
    index,
    moveCardUp,
    moveCardDown,
    handleEditCard,
    handleDeleteCard,
    card
  } = props;

  return (
    <>
      <li className="todoItem" style={{ backgroundColor: card.color }}>
        {children}

        <div className="wrapper">
          <span className="todoDate">
            {card.date}
          </span>

          <div className="actionsContainer">
            <button onClick={() => { moveCardUp(index) }}>
              <i className="fa-solid fa-angle-up"></i>
            </button>

            <button onClick={() => { moveCardDown(index) }}>
              <i className="fa-solid fa-angle-down"></i>
            </button>

            <button onClick={() => { handleEditCard(index) }}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button onClick={() => { handleDeleteCard(index) }}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
