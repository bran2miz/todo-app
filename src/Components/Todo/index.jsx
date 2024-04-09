import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import ToDoForm from '../toDoForm';
import dummyData from './dummyData.json';

import { v4 as uuid } from 'uuid';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState(dummyData);
  // one way we could do this is put all items when created in incomplete, and then if we check the complete, remove them. 
  const [incomplete, setIncomplete] = useState([]);

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });
    const newIncomplete = items.filter(thing => !thing.complete);
    setIncomplete(newIncomplete);
    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  

  return (
    <>
      <Header incomplete={incomplete} />

      <ToDoForm defaultValues={defaultValues} handleSubmit={handleSubmit} handleChange={handleChange} deleteItem={deleteItem}/>

      <List incomplete={incomplete} list={list}toggleComplete={toggleComplete}/>

    </>
  );
};

export default Todo;
