import Container from 'react-bootstrap/Container';

import './assets/scss/App.scss'
import Navigation from './pages/partials/Navigation';

const App = () => {

  return (
    <>
      <div id='App'>
        <Navigation />
        <Container className='py-3'>
          <h1>React Query</h1>
        </Container>
      </div>
    </>
  )
}

export default App
