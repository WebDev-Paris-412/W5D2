import axios from "axios"
const API_URL = import.meta.env.VITE_BACKEND_URL
// API_URL is : https://project-management-api-4641927fee65.herokuapp.com
/**
 * We're going an axios instance
 */

const myApi = axios.create({
	baseURL: API_URL,
})

myApi.getAllProjects = async function () {
	try {
		const response = await myApi.get("/projects")
		return response
	} catch (error) {
		console.log(error)
	}
}
myApi.getProjectById = async function (id) {
	try {
		const response = await myApi.get(`/projects/${id}?_embed=tasks`)
		return response
	} catch (error) {
		console.log(error)
	}
}

// myApi.get('/projects')
// https://project-management-api-4641927fee65.herokuapp.com/projects

export default myApi
