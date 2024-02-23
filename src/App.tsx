import { IconContext } from 'react-icons'

import Routes from './routes'

function App() {
  return (
    <IconContext.Provider value={{ color: '#ccc', size: '20px' }}>
      <Routes />
    </IconContext.Provider>
  )
}

export default App
