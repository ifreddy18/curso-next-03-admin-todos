import { Metadata } from 'next'
import { TabBar } from '@/components'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Cookies Page',
	description: 'SEO cookies',
}

export default function CookiesPage() {
	const cookieStore = cookies()
	const cookieTab = Number(cookieStore.get('selectedTab')?.value ?? '1')

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			<div className="flex flex-col">
				<span className="text-3xl">Tabs</span>
				<TabBar currentTab={cookieTab} />
			</div>
		</div>
	)
}
