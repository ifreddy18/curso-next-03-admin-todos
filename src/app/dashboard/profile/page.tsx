'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function NamePage() {
	const { data: session } = useSession()

	useEffect(() => {
		console.log('Client side')
	}, [])

	return (
		<div>
			<h1>Hello Page</h1>

			<hr />
			<div className='flex flex-col'>
				<span>{session?.user?.name ?? 'No name'}</span>
				<span>{session?.user?.email ?? 'No email'}</span>
				<span>{session?.user?.image ?? 'No image'}</span>
				<span>{session?.user?.id ?? 'No UUID'}</span>
				<span>{(session?.user?.roles ?? ['no-roles']).join(', ')}</span>
				<p>{JSON.stringify(session?.user, null, 2)}</p>
			</div>
		</div>
	)
}
