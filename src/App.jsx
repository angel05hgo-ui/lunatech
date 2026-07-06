import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Servicios from './pages/Servicios.jsx'
import Cotizar from './pages/Cotizar.jsx'
import Solicitudes from './pages/Solicitudes.jsx'
import Diagramas from './pages/Diagramas.jsx'
import Manual from './pages/Manual.jsx'
import Terminos from './pages/Terminos.jsx'

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="bg-blobs" aria-hidden="true">
        <span /><span /><span />
      </div>

      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/cotizar" element={<Cotizar />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/diagramas" element={<Diagramas />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
