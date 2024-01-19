import axios from "axios"
const API_URL = "http://other-api.com"

const secondApi = axios.create({
	baseURL: API_URL,
})

export default secondApi
