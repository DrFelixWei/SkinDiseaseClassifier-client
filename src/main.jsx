import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "react-auth-kit";
import './i18n'; // Import i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"} 
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <App />
    </AuthProvider>
  </StrictMode>,
)
