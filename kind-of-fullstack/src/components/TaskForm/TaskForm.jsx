import { useState } from "react"
import axios from "axios"
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

function TaskForm({ id, setShowForm, fetchProject }) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	})

	function handleChange(event) {
		const key = event.target.id,
			value = event.target.value
		setFormData({ ...formData, [key]: value })
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const taskToSend = { ...formData, projectId: Number(id) }
			console.log(taskToSend)
			const response = await axios.post(`${API_URL}/tasks`, taskToSend)
			console.log(response)
			setShowForm((current) => !current)
			fetchProject()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title"></label>
				<input
					type="text"
					id="title"
					value={formData.title}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="description"></label>
				<textarea
					id="description"
					value={formData.description}
					onChange={handleChange}
					cols="30"
					rows="10"></textarea>
			</div>
			<button>Add task</button>
		</form>
	)
}

export default TaskForm
