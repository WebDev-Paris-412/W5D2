import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import myApi from "../../api/apihandler"
// import axios from "axios"
// const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

function AllProjectsPage() {
	const [projects, setProjects] = useState(null)

	async function fetchAllProjects() {
		const response = await myApi.getAllProjects()
		setProjects(response.data)

		// 	// try {
		// 	// 	// const response = await axios.get(`${API_URL}/projects`)
		// 	// 	// console.log(response)
		// 	// 	setProjects(response.data)
		// 	// } catch (error) {
		// 	// 	console.error(error)
		// 	// }
	}

	useEffect(() => {
		fetchAllProjects()
	}, [])

	if (!projects) {
		return <p>Loading...</p>
	}
	return (
		<div>
			<h2>All Projects</h2>
			<section>
				{projects.map((oneProject) => {
					return (
						<article key={oneProject.id}>
							<Link to={`/projects/${oneProject.id}`}>{oneProject.title}</Link>
						</article>
					)
				})}
			</section>
		</div>
	)
}

export default AllProjectsPage
