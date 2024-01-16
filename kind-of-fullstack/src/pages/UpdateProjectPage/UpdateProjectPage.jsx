import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

/**
 * State(s) ?
 * - inputs
 *
 * useEffect to Retrieve the project
 *
 * populate the inputs with the informations from
 * the project
 *
 * When sending the form, update the project.
 *
 */
function UpdateProjectPage() {
	const [formData, setFormData] = useState({ title: "", description: "" })

	const { projectId } = useParams()

	const navigate = useNavigate()

	function handleChange(event) {
		const key = event.target.id,
			value = event.target.value
		setFormData({ ...formData, [key]: value })
	}

	async function fetchProject() {
		try {
			const response = await axios.get(`${API_URL}/projects/${projectId}`)
			setFormData(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const response = await axios.put(
				`${API_URL}/projects/${projectId}`,
				formData
			)
			console.log(response)
			navigate(`/projects/${response.data.id}`)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchProject()
	}, [])

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
			<button>Update project</button>
		</form>
	)
}

export default UpdateProjectPage
