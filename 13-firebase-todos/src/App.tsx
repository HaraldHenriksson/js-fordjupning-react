import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/partials/Navigation'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import useAuth from './hooks/useAuth'
import GlobalLoadingSpinner from './components/GlobalLoadingSpinner'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
	const { isAuthDetermined } = useAuth()

	if (!isAuthDetermined) {
		return <GlobalLoadingSpinner />
	}

	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />

					{/* Use ProtectedRoute as a wrapper */}
					<Route path="/todos" element={<ProtectedRoute />}>
						<Route index element={<TodosPage />} />
						<Route path=":id" element={<TodoPage />} />
						<Route path=":id/edit" element={<EditTodoPage />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>

			<ToastContainer theme='colored' />
		</div>
	)
}

export default App;
