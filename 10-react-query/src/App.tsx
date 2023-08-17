import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Navigation from './pages/partials/Navigation';

import './assets/scss/App.scss'
import HomePage from './HomePage';
import PageNotFound from './pages/PageNotFound';
import RandomCatPage from './pages/RandomCatPage';
import SearchPage from './pages/SearchPage';

const App = () => {

  return (
    <>
      <div id='App'>
        <Navigation />

        <Container className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/random-cat' element={<RandomCatPage />} />
            <Route path='/search' element={<SearchPage />} />

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Container>
      </div>
    </>
  )
}

export default App
