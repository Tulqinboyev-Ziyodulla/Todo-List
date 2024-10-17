import React, { useReducer, useState } from 'react';
import { Input, Button } from 'antd';
import { HeartOutlined, SaveOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ACTIONS = {
  ADD_TODO: 'add_todo',
  TOGGLE_LIKE: 'toggle_like',
  TOGGLE_SAVE: 'toggle_save',
  DELETE_TODO: 'delete_todo',
};

function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...state, action.payload];
    case ACTIONS.TOGGLE_LIKE:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, isLiked: !todo.isLiked } : todo
      );
    case ACTIONS.TOGGLE_SAVE:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, isSaved: !todo.isSaved } : todo
      );
    case ACTIONS.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleAddTodo = e => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      value: input,
      isLiked: false,
      isSaved: false,
    };

    dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    setInput('');
  };

  return (
<div className="max-w-2xl mx-auto py-12 px-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-2xl mt-10 text-white">
  <header className="text-center mb-10">
    <h1 className="text-5xl font-bold drop-shadow-lg">Todo List</h1>
    <div className="flex justify-center gap-8 mt-6">
      <BadgeIcon count={todos.filter(todo => todo.isLiked).length} icon={<HeartOutlined />} color="bg-pink-600" />
      <BadgeIcon count={todos.filter(todo => todo.isSaved).length} icon={<SaveOutlined />} color="bg-teal-600" />
    </div>
  </header>

  <form onSubmit={handleAddTodo} className="flex gap-4 mb-8">
    <Input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Add a new task..."
      allowClear
      size="large"
      className="w-full rounded-full shadow-md border-0 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
    />
    <Button
      htmlType="submit"
      type="primary"
      size="large"
      className="bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg px-6 py-2 transition-transform transform hover:scale-105"
    >
      Add
    </Button>
  </form>

  <ul className="space-y-6">
    {todos.map((todo, index) => (
      <TodoItem key={todo.id} todo={todo} dispatch={dispatch} index={index} />
    ))}
  </ul>
</div>

  );
}

function BadgeIcon({ count, icon, color }) {
  return (
<div className={`w-20 h-20 flex items-center justify-center rounded-full ${color} text-white shadow-lg transform transition-transform duration-300 hover:scale-105`}>
  <div className="text-3xl">{icon}</div>
  <div className="ml-2 text-xl font-bold">{count}</div>
</div>

  );
}

function TodoItem({ todo, dispatch, index }) {
  return (
<li className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center transition-shadow duration-300 hover:shadow-xl">
  <span className="text-gray-900 font-medium text-lg">{`${index + 1}. ${todo.value}`}</span>
  <div className="flex items-center space-x-4">
    <Button
      type="text"
      icon={<HeartOutlined />}
      onClick={() => dispatch({ type: ACTIONS.TOGGLE_LIKE, payload: todo })}
      className={`transition-colors duration-300 ${todo.isLiked ? 'text-red-600' : 'text-gray-400'}`}
    />
    <Button
      type="text"
      icon={<SaveOutlined />}
      onClick={() => dispatch({ type: ACTIONS.TOGGLE_SAVE, payload: todo })}
      className={`transition-colors duration-300 ${todo.isSaved ? 'text-green-600' : 'text-gray-400'}`}
    />
    <Button
      type="text"
      icon={<EditOutlined />}
      className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
    />
    <Button
      type="text"
      icon={<DeleteOutlined />}
      onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: todo })}
      className="text-red-600 hover:text-red-700 transition-colors duration-300"
    />
  </div>
</li>

  );
}
