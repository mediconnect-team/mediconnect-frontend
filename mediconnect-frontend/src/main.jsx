import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from './context/AuthContext.jsx';

import { Tooltip } from 'bootstrap';


document.addEventListener("DOMContentLoaded", () => {
  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
    .map(el => new Tooltip(el));
});


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
)
