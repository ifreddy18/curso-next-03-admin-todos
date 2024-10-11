'use client'
// https://tailwindcomponents.com/component/radio-buttons-1

import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const defaultTabOptions = [1, 2, 3, 4]

interface Props {
	currentTab?: number
	tabOptions?: number[]
}

const gridCols: {[key:number]: string} = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

export const TabBar = ({
	currentTab = 1,
	tabOptions = defaultTabOptions,
}: Props) => {
	const router = useRouter()
	const [selected, setSelected] = useState(currentTab)


	const onTabSelected = (tab: number) => {
		setSelected(tab)
		setCookie('selectedTab', tab.toString())
		router.refresh()
	}

	return (
		<div
			className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${'grid-cols-' + tabOptions.length}`}
			// className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${gridCols[tabOptions.length]}`}
		>
			{tabOptions.map((tab) => (
				<div>
					<input
						type="radio"
						className="peer hidden"
						id={tab.toString()}
						checked={tab === selected}
						onChange={() => {}}
					/>
					<label
						onClick={() => onTabSelected(tab)}
						className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
					>
						{tab}
					</label>
				</div>
			))}
		</div>
	)
}
