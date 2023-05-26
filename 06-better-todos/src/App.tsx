import Container from 'react-bootstrap/Container'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import { TodoPage } from './pages/TodoPage'
import Navigation from './components/Navigation'

function App() {
	return (
		<div id='App'>
			<Navigation />

			<Container className='py-3'>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/todos' element={<TodoPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
