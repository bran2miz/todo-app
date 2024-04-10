import { Button, Typography, Card } from '@mui/material';

const ToDoForm = ({ defaultValues, handleChange, handleSubmit }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card variant="outlined" style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" gutterBottom>Add To Do Item</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label style={{ margin: 10, padding: 3 }}>
              <span>To Do Item</span>
              <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
            </label>
            <label style={{ margin: 10, padding: 3 }}>
              <span>Assigned To</span>
              <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </label>
            <label style={{ margin: 10, padding: 3 }}>
              <span>Difficulty</span>
              <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
            </label>
          </div>
          <Button type="submit" variant="contained" color="secondary" style={{ margin: 10, padding: '10px 20px' }}>Add Item</Button>
        </form>
      </Card>
    </div>
  )
}

export default ToDoForm;