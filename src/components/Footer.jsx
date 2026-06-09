export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>LunaTech</h4>
          <p>Servicios tecnicos informaticos profesionales para tu computador.</p>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Punta Arenas, Chile</p>
          <p>contacto@lunatech.cl</p>
          <p>+56 9 1234 5678</p>
        </div>
        <div className="footer-col">
          <h4>Enlaces</h4>
          <a href="https://www.mindicador.cl/" target="_blank" rel="noopener noreferrer">
            Indicadores economicos
          </a>
          <a href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">
            W3Schools
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LunaTech — Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
