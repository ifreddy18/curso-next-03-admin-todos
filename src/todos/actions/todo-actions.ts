'use server'

import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const sleep = (seconds: number = 0): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, seconds * 1000)
	})
}

export const toogleTodoAction = async (
	id: string,
	complete: boolean,
): Promise<Todo> => {

  sleep(3)


	const todo = await prisma.todo.findFirst({ where: { id } })

	if (!todo) throw `Todo con id ${id} no encontrado`

	const updatedTodo = await prisma.todo.update({
		where: { id },
		data: { complete },
	})

	revalidatePath('/dashboard/server-todos')

	return updatedTodo
}

export const addTodoAction = async (description: string) => {
	try {
		const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')
		return todo
	} catch (error) {
		return { message: 'Error creando todo' }
	}
}

export const deleteCompletedTodosAction = async(): Promise<any> => {
  try {
		await prisma.todo.deleteMany({ where: { complete: true } })
		revalidatePath('/dashboard/server-todos')
	} catch (error) {
		return { message: 'Error borrando todos' }
	}
}
