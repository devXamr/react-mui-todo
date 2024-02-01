import {useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



export default function Todoadder({addingFunc}){
    const [newTodo, setNewTodo] = useState('')

    function handleChange(evt){

        setNewTodo(evt.target.value)

    }

    function formSubmission(evt){
        evt.preventDefault()
        addingFunc(newTodo)
        setNewTodo('')

    }
    function submitFunc(){
        addingFunc(newTodo)
        setNewTodo('')
    }

    return (

      <form onSubmit={formSubmission}>
          <TextField
              required
              id="outlined-required"
              label="new todo"
              value={newTodo}
              onChange={handleChange}
              sx={{marginRight: 1 }}
          />

          <Button variant="contained" endIcon={<SendIcon />} onClick={submitFunc}> Add </Button>
      </form>
    )
}