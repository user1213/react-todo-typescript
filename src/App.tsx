import React, { FC, ChangeEvent, useState } from 'react';

import './App.css';
import { ITask } from './interfaces';
import TodoTask from './Components/TodoTask';

const App: FC = () => {

   const [task, setTask] = useState<string>("");
   const [deadline, setDeadline] = useState<number>(0);
   const [todoList, setTodoList] = useState<ITask[]>([]);


   const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
     const{name, value} = event.target;
     if(name === 'task'){
      setTask(event.target.value);
     }
     else{
       const days = Number(event.target.value);  
       if(days >= 0){
          setDeadline(Number(event.target.value));
       }
     }
   }

   const addTask = (): void => {
     const newTask = {taskName: task, deadline};
     setTodoList([...todoList, newTask]);
     console.log(todoList);
     setTask("");
     setDeadline(0);
   }

   const completeTask = (taskNameToDelete: string): void => {
      setTodoList(todoList.filter(task => {
            return task.taskName !== taskNameToDelete
          }
        ));
   }   

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
            <input type="text" placeholder="Task..." value={task} name="task" onChange={handleChange}/>
            <input type="number" placeholder="Deadline (in Days)..." value={deadline} name="deadline" onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
          {
            todoList.map((task: ITask, key: number) => {
              return <TodoTask key={key} task={task} completeTask={completeTask}/>;
            })
          }
      </div>
    </div>  
  );
}

export default App;
