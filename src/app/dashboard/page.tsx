import { redirect } from 'next/navigation'
import { getUserServerSession } from '@/auth/actions/auth-actions'

import { WidgetItem } from '@/components'

export default async function DashboardPage() {
	// Se obtiene información de la sesión del usuario
	const user =await getUserServerSession()

	if (!user) {
		redirect('/api/auth/signin')
	}

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<WidgetItem title="Connected user (server side)">
				<span>{user?.name}</span>
				<span>{user?.email}</span>
				<span>{user?.image}</span>

				<span>{JSON.stringify(user)}</span>
			</WidgetItem>
		</div>
	)
}
