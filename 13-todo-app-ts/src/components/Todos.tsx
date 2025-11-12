import { type ListOfTodos } from '../types'
import { Todo } from './Todo.tsx'
import { type TodoId, type Todo as TodoType } from '../types'
import { useState } from 'react'

interface Props {
    todos: ListOfTodos,
    onToggleCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void,
    onRemoveTodo: ({ id }: TodoId) => void
}

// Pasando parametros a los tipos (tipos genericos).
export const Todos: React.FC<Props> = ({ todos, onToggleCompletedTodo, onRemoveTodo }) => {
  return (
    <ul className="todo-list">
      {
        todos.map(todo => (
          <li
            key={todo.id}
            id={todo.id}
            className={`${todo.completed ? 'completed' : ''}`}>
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggleCompletedTodo={onToggleCompletedTodo}
              onRemoveTodo={onRemoveTodo}
            />
          </li>
        ))
      }
    </ul>
  )
}
