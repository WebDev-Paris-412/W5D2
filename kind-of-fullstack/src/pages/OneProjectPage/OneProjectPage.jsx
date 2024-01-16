import React from "react"
import "./OneProjectPage.css"
import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import TaskForm from "../../components/TaskForm/TaskForm"
const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

function OneProjectPage() {
	const [project, setProject] = useState(null)
	const [showForm, setShowForm] = useState(false)

	const { projectId } = useParams()
	const navigate = useNavigate()
	const modalElement = useRef()

	async function fetchOneProject() {
		try {
			const response = await axios.get(
				`${API_URL}/projects/${projectId}?_embed=tasks`
			)
			setProject(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	async function handleDelete() {
		try {
			const response = await axios.delete(`${API_URL}/projects/${projectId}`)
			console.log(response)
			closeModal()
			navigate("/projects")
		} catch (error) {
			console.log(error)
		}
	}

	function openModal() {
		modalElement.current.showModal()
	}
	function closeModal() {
		modalElement.current.close()
	}
	async function updateFinishedState(task) {
		try {
			const taskToUpdate = { ...task, finished: !task.finished }

			const response = await axios.put(
				`${API_URL}/tasks/${task.id}`,
				taskToUpdate
			)

			fetchOneProject()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchOneProject()
	}, [])

	if (!project) {
		return <p>Loading...</p>
	}
	return (
		<div>
			<h2>{project.title}</h2>
			<p>{project.description}</p>
			<section>
				<Link to={`/projects/update/${project.id}`}>Update</Link>
				<button onClick={openModal}>Delete</button>
			</section>
			<section>
				<ul>
					{project.tasks.map((task) => {
						return (
							<li
								key={task.id}
								style={{
									textDecoration: task.finished ? "line-through" : "none",
								}}>
								<h3>{task.title}</h3>
								<p>{task.description}</p>
								<p>
									<label htmlFor="finished">Done? </label>
									<input
										type="checkbox"
										id="finished"
										checked={task.finished}
										onChange={() => updateFinishedState(task)}
									/>
								</p>
							</li>
						)
					})}
				</ul>
				<button onClick={() => setShowForm(!showForm)}>
					{showForm ? "Hide" : "Show"} Task Form
				</button>
				{showForm && (
					<TaskForm
						id={projectId}
						setShowForm={setShowForm}
						fetchProject={fetchOneProject}
					/>
				)}
			</section>
			<dialog className="delete-modal" ref={modalElement}>
				<p>Are you sure sure sure?</p>
				<div>
					<button onClick={handleDelete}>Delete</button>{" "}
					<button onClick={closeModal}>Cancel</button>
				</div>
			</dialog>
		</div>
	)
}

export default OneProjectPage
