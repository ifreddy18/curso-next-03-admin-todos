'use client'

import { startTransition, useOptimistic } from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { Todo } from '@prisma/client'

import styles from './TodoItem.module.css'

interface Props {
	todo: Todo
	// TODO: Acciones que quiero llamar
	toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
	// Without useOptimistic, use "todo" instead "todoOptimistic"
	const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
		todo,
		(state, newCompleteValue: boolean) => ({
			...state,
			complete: newCompleteValue,
		}),
	)

	const onToggleTodo = async() => {
		try {
			startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
			await toggleTodo( todoOptimistic.id, !todoOptimistic.complete)
		} catch (error) {
			startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
		}
	}

	return (
		<div
			className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
		>
			<div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
				<button
					// onClick={() => toggleTodo(todo.id, !todo.complete)}
					onClick={onToggleTodo}
					className={`flex cursor-pointer rounded-md p-2 hover:bg-opacity-60 ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'} `}
				>
					{todoOptimistic.complete ? (
						<IoCheckboxOutline size={30} />
					) : (
						<IoSquareOutline size={30} />
					)}
				</button>

				<div className="text-center sm:text-left">
					{todoOptimistic.description}
				</div>
			</div>
		</div>
	)
}
