import React, { Component } from 'react';
import './App.css';
import List from './composition/List.js';
import STORE from './composition/STORE'

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends Component {

  state={
    store:STORE,
  };

  handleAddCard=(listId)=>{
    const {lists} = this.state.store;
    
      const newCard = newRandomCard();

      const newLists = lists.map(list => {
      if (list.id === listId) {
       
	    return {
        ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
        }
      return list;
       })
   
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })

      console.log(`handle new card called `)
  }
   
  handleDeleteCard=(cardId)=>{
    const {lists, allCards} = this.state.store;
    console.log(lists);
    console.log(allCards);
    const newCardIdLists = lists.map(list => list.cardIds.filter(crd => crd!==cardId))
    const newLists=[];
    for (let i=0; i<lists.length; i++){
        let j=0;
        newLists[i]={};
        newLists[i].id = lists[i].id;
        newLists[i].header = lists[i].header;
        newLists[i].cardIds = newCardIdLists[j]; 
        j++;
      }
    
    const newAllCards = omit(allCards, cardId);
    
    this.setState({
      store: {
        lists: newLists,
        allCards: newAllCards
      }
    });
   
    console.log('handle delete card called', {newLists})
  };
 /* handleAddCard(){
    console.log('handle check card called')
  }*/


render() {
  const { store } = this.state
  return (
    <main className='App'>
      <header className="App-header">
        <h1>Trelloyes!</h1>
      </header>
      <div className="App-list">
        {store.lists.map(list=>
        <List
           key={list.id}
           id={list.id}
           header={list.header}
           cards={list.cardIds.map(card =>store.allCards[card])}
         //  onAddCard={this.handleAddCard}
         onClickDelete={this.handleDeleteCard}  
         onClickAdd={this.handleAddCard}        
        />)}
      </div>  
    </main>
  );
}
}

export default App;
