import React from 'react'
import { CssBaseline, Box } from '@mui/material'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home' 
import ProtectedRoute from "./components/Authentication/ProtectedRoute.jsx";


const theme = createTheme({
  palette: {
    background: {
      default: '#181a1b',  // Black
      primary: '#00629c',  // Blue 
      secondary: '#585f63',  // Gray
    },
    text: {
      primary: '#F5F5F5',  // White for readability
      secondary: '#8b8a83',  // Gray for secondary text
    },
    primary: {
      main: '#4a6614',  // Dark green for primary elements
    },
    secondary: {
      main: '#64c0f9',  // Light blue for secondary elements
    },
    accent: {
      main: '#e5202e',  // Red
    },
  },
});


const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: 'relative',
  width: '100vw',
  maxWidth: '100vw', // Ensures full width
  overflow: 'hidden',
}))

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  flex: 1,
  padding: theme.spacing(3),
}))

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Root>
          <Content>

            <NavBar/>

            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/admin" element={<ProtectedRoute role="admin"><Admin/></ProtectedRoute>}/> */}
            </Routes>
            
          </Content>
        </Root>
      </Router>
    </ThemeProvider>
  )
}

export default App
