
import {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Todoadder from "./Todoadder.jsx";
import {v4 as uuid} from "uuid";
import {useEffect} from "react";
import {Box} from '@mui/material';



const getInitialTodos = () => {
     const data = JSON.parse(localStorage.getItem('todos'))
    if(!data) return [];
    return data
}
export default function Todo(){
    const [todos, setTodos] = useState(getInitialTodos)
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])

    function toggleTodo(id){
        setTodos((prevTodos)=>{
            return prevTodos.map((todo)=>{
                 return todo.id === id ? {...todo, isDone: !todo.isDone} : todo
            })
        })
    }

    function deleteTodo(id){
      setTodos((prevTodos)=>{
          return prevTodos.filter((todo)=> todo.id !== id)
      })
    }

    function addTodo(textValue){
        if(textValue === '') return


        setTodos((prevTodos)=>[...prevTodos, {id: uuid(), text: textValue, isDone: false}])

    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
                const labelId = `checkbox-list-label-${todo.id}`;

                return (
                    <ListItem
                        key={todo.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments" onClick={() => deleteTodo(todo.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined}  dense>
                            <ListItemIcon>
                                <Checkbox
                                    onClick={() => toggleTodo(todo.id)}
                                    edge="start"
                                    checked={todo.isDone}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todo.text} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
            </List>
            <Todoadder addingFunc={addTodo}/>


        </Box>
        )
}