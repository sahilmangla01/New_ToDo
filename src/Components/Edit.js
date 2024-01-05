import React from 'react'
import "../stylesheets/Edit.css"

const Edit = ({setTogle,edit,setEdit,editId,todo,setTodo}) => {
    const submitEdit=(e)=>{
        e.preventDefault()
        const data = todo.map(item=> item.id===editId?{...item,title:edit}:item)
        setTodo(data)
        setTogle(false)
    
    }
  return (
    <div className='edit-container'>
      <h2>Edit Todo's</h2>
      <form className='edit-form'>
        <input className='edit-input' type='text' placeholder='edit' value={edit} onChange={(e)=>setEdit(e.target.value)}/>
        <div className='edit-buttons'>
        <button onClick={submitEdit}>Edit</button>
        <button onClick={()=>setTogle(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Edit

