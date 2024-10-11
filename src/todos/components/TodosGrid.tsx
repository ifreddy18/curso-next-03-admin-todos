'use client'

import { useRouter } from 'next/navigation'
import { Todo } from '@prisma/client'

import * as todosApi from '@/todos/helpers/todos'
import { toogleTodoAction } from '@/todos/actions'
import { TodoItem } from './TodoItem'

interface Props {
	todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
	const router = useRouter()

	const toggleTodo = async (id: string, complete: boolean) => {
		const updatedTodo = await todosApi.updateTodo(id, complete)
		console.log({ updatedTodo })
		router.refresh() //? Recarga la ruta sin afectar el estado de la app
	}

	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleTodo={toogleTodoAction} //? Con server actions
					// toggleTodo={toggleTodo} //? Tradicional
					// toggleTodo={todosApi.updateTodo}
				/>
			))}
		</div>
	)
}
