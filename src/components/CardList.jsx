import BoardCard from './BoardCard.jsx';

export default function CardList(props) {

    const { todos } = props;

    return (
        <ul className="main container">
            {todos.map((todo, todoIndex) => {
                return (
                    <BoardCard {...props} key={todoIndex} index={todoIndex} todo={todo}>
                        <p>{todo.text}</p>
                    </BoardCard>
                );
            })}
        </ul>
    );
}