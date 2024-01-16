import { useState, useEffect } from "react"
import axios from "axios"
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

function TasksRetroPage() {
	const [doneTasks, setDoneTasks] = useState(null)

	async function fetchDoneTasks() {
		try {
			const res = await axios.get(`${API_URL}/tasks?finished=true`)
			setDoneTasks(res.data)
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		fetchDoneTasks()
	}, [])

	if (!doneTasks) {
		return <p>Loading</p>
	}
	return (
		<div>
			<h2>Finished tasks</h2>
			<ul>
				{doneTasks.map((task) => {
					return (
						<li key={task.id}>
							<p>{task.title}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default TasksRetroPage
