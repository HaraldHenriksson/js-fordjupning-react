import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Navigation from './pages/partials/Navigation';

import './assets/scss/App.scss'
import HomePage from './HomePage';
import PageNotFound from './pages/PageNotFound';

const App = () => {

  return (
    <>
      <div id='App'>
        <Navigation />

        <Container className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <h1>React Query</h1>
        </Container>
      </div>
    </>
  )
}

export default App
