import "./App.css"
import HomePage from "./pages/HomePage/Homepage"
import AllProjectsPage from "./pages/AllProjectsPage/AllProjectsPage"
import OneProjectPage from "./pages/OneProjectPage/OneProjectPage"
import CreateProjectPage from "./pages/CreateProjectPage/CreateProjectPage"
import UpdateProjectPage from "./pages/UpdateProjectPage/UpdateProjectPage"
import TasksRetroPage from "./pages/TYasksRetroPage/TasksRetroPage"
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/projects">
						<Route index element={<AllProjectsPage />} />
						<Route path=":projectId" element={<OneProjectPage />} />
						<Route path="new" element={<CreateProjectPage />} />
						<Route path="update/:projectId" element={<UpdateProjectPage />} />
					</Route>
					<Route path="/tasks/retro" element={<TasksRetroPage />} />
				</Routes>
			</main>
		</>
	)
}

export default App
