import React from 'react';
import './List.css';
import Card from './Card.js';

export default function List(props) {
    return (
        <section className="List">
            <header className="List-header">
            <h2>{props.header}</h2>
            </header>
            <div className="List-cards">
                {props.cards.map(card=>
                <Card
                  key={card.id}
                  title={card.title}
                  listIdforCard={props.id}
                  cardId={card.id}
                  content={card.content}
                  //onAddCard={props.onAddCard}
                  onClickDelete={props.onClickDelete}
                  onClickAdd={props.onClickAdd}
                />)}
            </div>
            <button
                type='button'
                className='List-add-button'
                onClick={() => props.onClickAdd(props.id)}>
          + Add Random Card
        </button>
        </section>
    );
};

List.defaultProps = {
    onClickAdd: () => {},
}
