import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

function CreateProjectPage() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	})
	const navigate = useNavigate()

	function handleChange(event) {
		const key = event.target.id,
			value = event.target.value
		setFormData({ ...formData, [key]: value })
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const response = await axios.post(`${API_URL}/projects`, formData)
			console.log(response)
			navigate(`/projects/${response.data.id}`)
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
			<button>Create Project</button>
		</form>
	)
}

export default CreateProjectPage
