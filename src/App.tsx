import { IconContext } from 'react-icons'

import { createTheme, ThemeProvider } from '@mui/material'

import Routes from './routes'

const themeConfig = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 0
        }
      }
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={themeConfig}>
      <IconContext.Provider value={{ color: '#ccc', size: '20px' }}>
        <Routes />
      </IconContext.Provider>
    </ThemeProvider>
  )
}

export default App
