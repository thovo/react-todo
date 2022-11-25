import { useRef } from 'react';
import { useState } from 'react';
import './App.css';
import { Todo } from './types/todo.type';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const todoInput = useRef<HTMLInputElement>(null);

	const addNewTodo = () => {
		const name = todoInput.current ? todoInput.current.value : '';
		console.log('todo value =>', todoInput.current && todoInput.current.value);
		const newTodo: Todo = {
			id: new Date().getTime(),
			name,
			isCompleted: false,
		};
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id: number, isCompleted: boolean) => {
		console.log(id);
		console.log(isCompleted);
		const currentTodos = [...todos];
		const findTodo = currentTodos.find((todo) => todo.id === id);
		if (findTodo) {
			findTodo.isCompleted = !isCompleted;
			setTodos([...currentTodos]);
		}
	};

	return (
		<div className='App'>
			<div className='Input'>
				<label htmlFor='todoInput'>New todo:</label>
				<input type='text' id='todoInput' ref={todoInput} />
				<button className='Add' onClick={addNewTodo}>
					Add
				</button>
			</div>
			<ul className='List'>
				{todos.map((todo) => {
					return (
						<li
							className={todo.isCompleted ? 'completed' : ''}
							key={todo.id}
							onClick={() => toggleTodo(todo.id, todo.isCompleted)}
						>
							{todo.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
