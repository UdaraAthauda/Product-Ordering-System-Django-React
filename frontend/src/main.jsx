import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './components/ui/provider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
        </GoogleOAuthProvider>
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
