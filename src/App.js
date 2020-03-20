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

class App extends Component {

  state={
    store:STORE,
  };
  
  handleDeleteCard=(cardId)=>{
    const {lists, allCards} = this.state.store;
    const newLists = lists.map(list => list.cardIds.filter(crd => crd!==cardId))
    const newAllCards = omit(allCards, cardId);
    
    this.setState({
      store: {
        lists: newLists,
        allCards: newAllCards
      }
    })
   
    console.log('handle delete card called', {newAllCards})
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
        />)}
      </div>  
    </main>
  );
}


}

export default App;
