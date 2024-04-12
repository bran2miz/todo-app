// import React from "react";
// bring in the context regarding showing incomplete and/or completed items

import { useContext, useMemo, useState, useEffect } from 'react';
import { GlobalContext } from '../../App';
import { Pagination, Card, Button } from '@mui/material';
import Auth from '../Auth'

const List = ({ list, toggleComplete, incomplete, deleteItem }) => {
    // list is a list of ALL todos, incomplete is a list of only todos that have not been done yet. 

    // hideCompleted comes from App.jsx (set to false)
    // displayCount is set to 1 so that only one task is displayed on page. 
    const { hideCompleted, displayCount } = useContext(GlobalContext);
    

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    // memoization is acheived through useCallback
    // prevents unnecessary re-renders. 


    // declare a variable that will update when the value that it is dependent on changes and if it changes then it will re-render. 
    const listToUse = useMemo(() => {
        // if hideCompleted is true, return the incomplete list of items from ToDo.
        if (hideCompleted) return incomplete;
        // otherwise if it is false, return the entire list of items.
        else return list;
         // if any of these dependencies changes, it will recompute the value. If none of these changes, React will reuse the previously computed value of 'listToUse'.
    }, [hideCompleted, incomplete, list]);
    
    useEffect(() => {
        // figure out how many pages we need by dividing the list to use by the displayCount
        const totalPages = Math.floor(listToUse.length / displayCount);
        const addOne = listToUse.length % displayCount;
        setCount(addOne ? totalPages + 1 : totalPages);
    }, [displayCount, listToUse]);

    const handlePageChange = (e, ePage) => {
        setPage(ePage);
    };
    
    // only happens when you change the number of items you want to display or if the page is changed. display could change if you wanted to add another item to the todolist.
    const startIndex = useMemo(() => {
        return (page - 1) * displayCount;
    }, [displayCount, page]);
    
    const endIndex = useMemo(() => {
        return (page - 1) * displayCount + displayCount;
    }, [page, displayCount]);

    return (
        <Auth>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card variant="outlined" style={{ width: 500, margin: 50, padding: 10 }}>
        {/* uses startIndex and endIndex with the slice method to render only the subset of tasks that should be displayed on the current page. */}
       {/* will then map through those items on that page and at each item on the page, will render this component */}
                {listToUse.slice(startIndex, endIndex).map(item => (
                    <div key={item.id}>
                        <p>{item.text}</p>
                        <p><small>Assigned to: {item.assignee}</small></p>
                        <p><small>Difficulty: {item.difficulty}</small></p>
                        <div onClick={() => toggleComplete(item.id)}>Complete: {(item.complete?? false).toString()}</div>
                        {/* Lab 33 brings in Auth capabilities from auth so that when the user has the capability to delete, the can delete a task */}
                        <Auth capability="delete">
                            <Button onClick={()=> deleteItem(item.id)}>
                            Delete
                            </Button>
                        </Auth>
                        <hr />
                    </div>
                ))}
            </Card>
            <Pagination count={count} variant="outlined" color="secondary" onChange={handlePageChange} style={{ marginBottom: 20 }}/>
        </div>
        </Auth>
    );
};

export default List;

// // ie: if you are on the first page but have two items that you want to display, it will start at the index of 0 and end on the index of 2. But with slice it only will consider the first two indexes ((0,2) but really index of 0 and 1 no index of 2)... thus you will only render two items.

// //displayCount could change if users have the ability to customize their viewing preferences (like a filter that could fiter more items on the page. )