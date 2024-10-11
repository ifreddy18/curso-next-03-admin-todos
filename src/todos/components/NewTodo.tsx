'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

import * as todosApi from '@/todos/helpers/todos'
import { addTodoAction, deleteCompletedTodosAction } from '../actions'

export const NewTodo = () => {
	const router = useRouter()
	const [description, setDescription] = useState('')

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (description.trim().length === 0) return

		//? Without Server actions
		todosApi.createTodo(description)
		setDescription('')
		router.refresh()

		//? With server actions
		// await addTodoAction(description)
		// setDescription('')
	}

	const deleteCompleted = async () => {
		/*
			? Without Server actions
			await todosApi.deleteCompletedTodos()
			router.refresh()
		*/

		//? With server actions
		await deleteCompletedTodosAction()
	}

	return (
		<form onSubmit={onSubmit} className="flex w-full">
			<input
				type="text"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				className="-ml-10 w-6/12 rounded-lg border-2 border-gray-200 py-2 pl-3 pr-3 outline-none transition-all focus:border-sky-500"
				placeholder="¿Qué necesita ser hecho?"
			/>

			<button
				type="submit"
				className="ml-2 flex items-center justify-center rounded bg-sky-500 p-2 text-white transition-all hover:bg-sky-700"
			>
				Crear
			</button>

			<span className="flex flex-1"></span>

			<button
				onClick={() => deleteCompleted()}
				type="button"
				className="ml-2 flex items-center justify-center rounded bg-red-400 p-2 text-white transition-all hover:bg-red-700"
			>
				<IoTrashOutline />
				<span className="ml-2">Borrar completados</span>
			</button>
		</form>
	)
}
