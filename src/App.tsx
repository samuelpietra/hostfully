import { IconContext } from 'react-icons'

import { createTheme, ThemeProvider } from '@mui/material'

import Routes from './routes'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <IconContext.Provider value={{ color: '#ccc', size: '20px' }}>
        <Routes />
      </IconContext.Provider>
    </ThemeProvider>
  )
}

export default App
