// components/TodoApp.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar' // Install with npm install react-calendar
import 'react-calendar/dist/Calendar.css'

function TodoApp () {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [date, setDate] = useState(new Date())
  const [completedPercentage, setCompletedPercentage] = useState(0)

  const fetchTodos = async () => {
    // try {
    //   const token = localStorage.getItem('token');
    //   const { data } = await axios.get('http://localhost:3000/todos', {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   setTodos(data.todos);
    //   const completedCount = data.todos.filter(todo => todo.completed).length;
    //   setCompletedPercentage((completedCount / data.todos.length) * 100);
    // } catch (error) {
    //   console.error('Failed to fetch todos:', error);
    // }
  }

  const handleAddTodo = async e => {
    e.preventDefault()
    // try {
    //   const token = localStorage.getItem('token');
    //   await axios.post(
    //     'http://localhost:3000/todos',
    //     { text: newTodo, date },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   setNewTodo('');
    //   fetchTodos();
    // } catch (error) {
    //   console.error('Failed to add todo:', error);
    // }
  }

  const handleToggleComplete = async id => {
    // try {
    //   const token = localStorage.getItem('token');
    //   await axios.patch(
    //     `http://localhost:3000/todos/${id}/toggle`,
    //     {},
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   fetchTodos();
    // } catch (error) {
    //   console.error('Failed to toggle todo:', error);
    // }
  }

  const handleDeleteTodo = async id => {
    // try {
    //   const token = localStorage.getItem('token');
    //   await axios.delete(`http://localhost:3000/todos/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   fetchTodos();
    // } catch (error) {
    //   console.error('Failed to delete todo:', error);
    // }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className='todo-app w-full bg-[#0F172A] h-screen text-white'>
      {/* <div class='container'>
        <div class='calendar'></div>
        <div class='todos'></div>
        <div class='graph'></div>
      </div> */}
      <div className='container gap-2 h-screen'>
        <aside className='calender p-5 '>
          <h3>Calendar</h3>
          <Calendar onChange={setDate} value={date} />
        </aside>
        <main className='p-5 border-l-[1px]  h-screen'>
          <div className='todo-header'>
            <h2>TODO</h2>
            <form onSubmit={handleAddTodo}>
              <input
                type='text'
                placeholder='Add a todo'
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                required
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
          <div className='todo-list'>
            {todos.map((todo, index) => (
              <div key={todo.id} className='todo-item'>
                <span>
                  {index + 1}. {todo.text}
                </span>
                <span>
                  Time: {todo.time}
                  <button onClick={() => handleToggleComplete(todo.id)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </main>
        <aside className='graph border-l-[1px] border-gray-300 p-5'>
          <h3>Progress</h3>
          <div className='progress-bar'>
            <div
              className='progress'
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
          <p>{completedPercentage.toFixed(2)}% completed</p>
        </aside>
      </div>
    </div>
  )
}

export default TodoApp
