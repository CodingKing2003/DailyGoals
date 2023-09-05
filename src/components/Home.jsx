import { useEffect, useState } from "react"
import Task from "./Task"


const Home = () => {

  const initialArray=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

  const [tasks,setTasks]=useState(initialArray);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  const submitHandler=(e)=>{
    e.preventDefault();
    setTasks([...tasks,{
      title:title,
      description:description,
    }])
    localStorage.setItem('tasks',JSON.stringify(tasks));

  }

  const deleteTask=(index)=>{
    const filteredArray=tasks.filter((val,i)=>{
      return i!==index;
    }
    )

    setTasks(filteredArray)

  }

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))

  },[tasks])
  return (
    <div className='container'>
      <h1>Daily Goals</h1>
     <form onSubmit={submitHandler}>
      <input type="text" placeholder='Title' value={title} onChange={(e)=>{
        setTitle(e.target.value);
      }} />
      <textarea placeholder='Description' value={description} onChange={(e)=>{
        setDescription(e.target.value);
      }}></textarea>
      <button type="submit" >Add</button>
     </form>
     {tasks.map((items,index)=>(
          <Task key={index} title={items.title} description={items.description} deleteTask={deleteTask} index={index} />

     ))}
 
    
    </div>
  )
}

export default Home
