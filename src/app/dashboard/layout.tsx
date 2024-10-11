

// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar } from '@/components/sidebar/Sidebar'
import { TopMenu } from '@/components/TopMenu'

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	

	return (
		<>
			<Sidebar />
			<div className="mb-6 ml-auto min-h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
				<TopMenu />
				<div className="m-2 rounded bg-white p-2 px-6 pb-5 pt-6">
					{children}
				</div>
			</div>
		</>
	)
}
