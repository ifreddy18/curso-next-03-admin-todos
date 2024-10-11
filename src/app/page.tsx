import { redirect } from "next/navigation"

export default function Home() {
	
	redirect('/dashboard')
	
	return (
		<>
			<h1></h1>
			<span className="text-5xl">Hola mundo</span>
		</>
	)
}
