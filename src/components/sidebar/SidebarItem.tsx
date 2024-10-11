'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	title: string
	path: string
	icon: React.ReactNode
}

const baseStyle = 'relative flex items-center space-x-4 rounded-xl py-3 hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white'
const activeStyle = 'bg-gradient-to-r from-sky-600 to-cyan-400 px-4 text-white'

export const SidebarItem = ({ title, path, icon }: Props) => {
	const pathName = usePathname()

	return (
		<li>
			<Link
				href={path}
				className={`${baseStyle} ${pathName === path ? activeStyle : ''}`}
			>
				{icon}
				<span className="-mr-1 font-medium">{title}</span>
			</Link>
		</li>
	)
}
