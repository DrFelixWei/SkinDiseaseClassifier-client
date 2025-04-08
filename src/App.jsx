import React from 'react'
import { CssBaseline, Box } from '@mui/material'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home' 
import ProtectedRoute from "./components/Authentication/ProtectedRoute.jsx";


const theme = createTheme({
  palette: {
    mode: 'dark', // Enable proper dark mode component styling
    background: {
      default: '#121212',  // Standard dark mode background
      paper: '#1E1E1E',    // Slightly lighter for cards/elements
    },
    primary: {
      main: '#4CAF50',     // Soothing green - medical/health association
      light: '#80E27E',
      dark: '#087f23',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#64B5F6',     // Calm blue - professional/trustworthy
      light: '#9BE7FF',
      dark: '#0077C2',
      contrastText: '#000000',
    },
    error: {
      main: '#F44336',     // For warnings/errors
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
  },
  // Add light mode theme variant
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@media (prefers-color-scheme: light)': {
          body: {
            backgroundColor: '#F5F5F5',
            color: '#424242',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // More modern look without all-caps buttons
    },
  },
});

// Function to toggle between light and dark mode
const toggleColorMode = () => {
  const updatedTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark',
      // When switching to light mode
      ...(theme.palette.mode === 'dark' ? {
        background: {
          default: '#F5F5F5',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      } : {})
    }
  };
  return updatedTheme;
};

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
