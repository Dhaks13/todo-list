"use client";

import Image from "next/image";
import logo from './todo_logo.png'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <body>
        <Header />
        <Main />
        <Footer />
    </body>
  );
}

export function Header() {
  return (
    <header>
      <div className="title-bar">
        <div className="logo">
          <Image src={logo} alt="Todo List App" width={50} height={50} />
        </div>
        <h1>TODO:List App</h1>
      </div>
      <form>
        <div className='search'>
          <input type='text' placeholder='Search' required/>
          <button title="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </header>
  );
}

export function Main() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = { title, description };
    
    const response = await fetch('/api/task-data-handle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      setTitle('');
      setDescription('');
      location.reload(); 
    }
  };

  return (
    <main>
      <form onSubmit={addTask}>
        <div className='note-add'>
          <label><b>Add a new task</b></label>
          <input
            type='text'
            placeholder='Add task title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Add task description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button title="add-button" type="submit">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faPlus} />
          </button>
        </div>
      </form>
      <TodoData />
    </main>
  );
}

export function TodoData() {
  const [todo_data, set_data] = useState([]);

  useEffect(() => {
    fetch('/api/task-data-handle')
      .then((response) => response.json())
      .then((data) => set_data(data));
  }, []);

  const deleteTask = async (id) => {
    const response = await fetch(`/api/task-data-handle?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      set_data(todo_data.filter((todo) => todo.id !== id));
    }
  };

  const editTask = async (id) => {
    const updatedTitle = prompt('Enter new title');
    const updatedDescription = prompt('Enter new description');

    if (updatedTitle !== null && updatedDescription !== null) {
      const updatedTask = { id, title: updatedTitle, description: updatedDescription };

      const response = await fetch('/api/task-data-handle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedData = await response.json();
        set_data(todo_data.map(todo => (todo.id === id ? updatedData : todo)));
      }
    }
  };

  return (
    <div className='todo-data'>
      {todo_data.map((todo) => (
        <div className='todo-item' key={todo.id}>
          <h3><b>{todo.title}</b></h3>
          <p>{todo.description}</p>
          <button title="edit-button" onClick={() => editTask(todo.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button title="delete-button" onClick={() => deleteTask(todo.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}

    </div>
  )
}  


export function Footer() {
  return (
    <footer>
      <p>
        Created by <a href="https://www.linkedin.com/in/dhaks13/">Dhakshin A V</a> 
      </p>   
    </footer>
  )
}
