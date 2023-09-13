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
import RequireAuth from './components/RequireAuth'
import LogoutPage from './pages/Logout'
import UpdateProfile from './pages/UpdateProfile'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				{/* Guest Routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />

				{/* Protected Routes */}
				<Route path="/" element={
					<RequireAuth>
						<HomePage />
					</RequireAuth>}
				/>

				<Route path="/todos">
					{/* /todos */}
					<Route path="" element={
						<RequireAuth>
							<TodosPage />
						</RequireAuth>
					} />

					{/* /todos/:id */}
					<Route path=":id" element={
						<RequireAuth>
							<TodoPage />
						</RequireAuth>
					} />

					{/* /todos/:id/edit */}
					<Route path=":id/edit" element={
						<RequireAuth>
							<EditTodoPage />
						</RequireAuth>
					} />
				</Route>

				<Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfile />
					</RequireAuth>
				} />

			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App;
