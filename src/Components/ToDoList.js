import React, { useState ,useEffect} from 'react'
import "../stylesheets/ToDOList.css"
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";

import axios from 'axios';
import Edit from './Edit';


const ToDoList = () => {
    const [togle,setTogle] = useState(true);
    const [todo, setTodo] = useState()
    const [title,setTitle]= useState("")
    const [togle2 , setTogle2] = useState(false)
    const [edit,setEdit] = useState("")
    const [editId, setEditId] = useState("")


    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users/1/todos")
        .then((res)=>setTodo(res.data))
        .catch((err)=>console.log(err))
       },[])

       const addTask =(e)=>{
        e.preventDefault()
        if(title!=="" && title.length>=4){
            setTodo((prev)=>[
                {
                "userId": 1,
                "id":todo.length+1,
                "title": title,
                "completed": false
            }, ...prev])
            setTitle("")
        }
       
       }

       const handleDelete=(id)=>{
        const updated = todo.filter((e)=>e.id!==id)
        setTodo(updated)
    }
    const handleDone =(id)=>{
        const updated = todo.map((item)=>item.id===id?{...item,completed:true}:item)
        setTodo(updated)
    }
    const handleNotDone =(id)=>{
        const updated = todo.map((item)=>item.id===id?{...item,completed:false}:item)
        setTodo(updated)
    }
    const handleEdit=(id)=>{
        setTogle2(true)
        const data = todo.filter(item=>item.id===id);
        setEdit(data[0].title)
        setEditId(data[0].id)
    }
  return (
   <>
   {
    togle2
    ?<Edit  setTogle={setTogle2} edit={edit} setEdit={setEdit} editId={editId} todo={todo} setTodo={setTodo}/>
    :
   
    <div  >
      
        
        <form className='addTask-form'>
            <input type='text' placeholder='Create a new Todo...' value={title} onChange={(e)=>setTitle(e.target.value)} />
            <button onClick={addTask} className='addTask-button'>+</button>
        </form>

        <div className='list-container'>
            <div className='list-headings'>
                <p onClick={()=>setTogle(true)} className={togle?"clicked size":"size"}>All TODO's</p>
                <p onClick={()=>setTogle(false)} className={!togle?"clicked size":"size"}>Completed TODO's</p>
            </div>
                <hr/>
                <div className='todo-parent'>
            {togle
            
            ?
            todo &&todo.map((item)=>{
                return(
                    <div className={item.completed?'completed-todos todos':'todos'} key={item.id}>
                <p className='todo'>{item.title}</p>
                <div className='list-options'>
                    <button onClick={()=>handleEdit(item.id)} className={item.completed?'checked-btn btn':'btn'}><LuFileEdit/></button>
                    <button onClick={()=>handleDelete(item.id)} className={item.completed?'checked-btn btn':'btn'}><RiDeleteBin6Line/></button>
                    <button  className={item.completed?'checked-btn btn':'btn'}>{item.completed?<IoIosCheckboxOutline onClick={()=>handleNotDone(item.id)}/>:<MdCheckBoxOutlineBlank onClick={()=>handleDone(item.id)}/>}</button>
                </div>
            </div>
                )
            })
            
            :
            todo &&todo.filter((item)=>item.completed===true).map((item,index)=>{
                return(
                    <div className='completed-todos todos' key={index}>
                <p className='todo'>{item.title}</p>
                <div className='list-options'>
                    <button onClick={()=>handleEdit(item.id)} className='checked-btn btn'><LuFileEdit/></button>
                    <button onClick={()=>handleDelete(item.id)} className='checked-btn btn'><RiDeleteBin6Line/></button>
                    <button className='checked-btn btn'>{item.completed?<IoIosCheckboxOutline onClick={()=>handleNotDone(item.id)}/>:<MdCheckBoxOutlineBlank  onClick={()=>handleDone(item.id)}/>}</button>
                </div>
            </div>
                )
            })
        }
        </div>

        </div>
      </div>
}
   </>
  )
}

export default ToDoList
