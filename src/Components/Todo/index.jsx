import { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import ToDoForm from '../toDoForm';
import dummyData from './dummyData.json';
import Auth from '../Auth';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState(dummyData);
  // one way we could do this is put all items when created in incomplete, and then if we check the complete, remove them. 
  const [incomplete, setIncomplete] = useState([]);

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);


  async function makeRequest(config, callback) {
    try {
      const response = await axios(config);
      console.log(response);
      // if we successfully add to the database do the the callback - in the case of add that means the callback is adding the item to the list
      // in the case of delete it will be filtering the item out of the list
      if (callback) callback(response.data);
    } catch (e) {
      // if there is an error do not change the list
      console.error(e);
    }
  }

  useEffect(()=> {
    (async()=> {
      const items = await axios.get("https://bearer-auth-2-8fbj.onrender.com/todo");
      console.log(items.data)
      setList(items.data);
    })();
    
  }, [])

  // Update these functions "ADD", "DELETE", "TOGGLE COMPLETED"
  async function addItem(item) {
    // item.id = uuid();
    item.complete = false;
    console.log(item);
    // setList([...list, item]);
    // make axios request to post the item to the server
    const config = {
      method: 'post',
      baseUrl: 'https://bearer-auth-2-8fbj.onrender.com',
      url: "https://bearer-auth-2-8fbj.onrender.com/todo",
      data: item
    };
      const callBackFunction = (item) => setList([...list, item]);
      const data = await makeRequest(config, callBackFunction);
      
      if(data) setList([...list,data]);
      console.log(data);
   

  }

  function deleteItem(id) {
    // this will only be visible to admins
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    // set items to map through the list of current incomplete tasks. If I click to mark it as complete, the id will pass into the task clicked to check if matches any id in state. If it does, mark complete from false to true. 
    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    // then filter that mapped data, and if one of the object's complete is true, filter it out
    const newIncomplete = items.filter(thing => !thing.complete);
    // reset the empty array to the new array with the filtered data
    setIncomplete(newIncomplete);
    // list will also be updated so that useEffect can listen to updated state
    setList(items);

  }

  useEffect(() => {
    //this will trigger when dependency array's list is altered.
    let incompleteCount = list.filter(item => !item.complete);
    // filter my data and will set the state of incomplete. Reason why we have to do this is because the function won't automatically change the state when called; need to use useEffect to re-set the state when it re-renders.
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Header incomplete={incomplete} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Auth capability={'create'}>
          <ToDoForm defaultValues={defaultValues} handleSubmit={handleSubmit} handleChange={handleChange} deleteItem={deleteItem}/>
          </Auth>
          {/* pass incomplete state, list state, and the toggleComplete function into List. */}
          {/* lab 33 must pass in deleteItem so that if the user is logged in, they are able to delete a task */}
          <List list={list} toggleComplete={toggleComplete} incomplete={incomplete} deleteItem={deleteItem}/>
        </div>
      </div>
    </>
     
  );
  };

export default Todo;
