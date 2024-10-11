export const dynamic = 'force-dynamic'
export const revalidate = 0
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'
import { getUserServerSession } from '@/auth/actions/auth-actions'

export const metadata = {
	title: 'Listado de Todos - Server Actions',
	description: 'SEO Title',
}

export default async function ServerTodosPage() {
	const user = await getUserServerSession()
	if (!user) redirect('/api/auth/signin')

	const todos = await prisma.todo.findMany({
		where: { userId: user.id },
		orderBy: { description: 'asc' },
	})
	console.log('[ServerTodosPage] Construido')

	return (
		<>
			<span className="mb-10 text-3xl">Server Actions</span>
			<div>
				<div className="mx-5 mb-5 w-full px-3">
					<NewTodo />
				</div>

				<TodosGrid todos={todos} />
			</div>
		</>
	)
}
