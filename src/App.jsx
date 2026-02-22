import './App.css'

function App() {
  return (
    <div className="container">
      <h1 className="title">CLIMA</h1>
      <div className="card main-card">
        <h2>Quetzaltenango</h2>
        <p className="temp">23°C</p>
        <p>Humedad: 50%</p>
        <p>Viento: 6 km/h</p>
      </div>

      <div className="forecast">
        <div className="card">
          <h3>Lun</h3>
          <p>26°C</p>
        </div>
        <div className="card">
          <h3>Mar</h3>
          <p>27°C</p>
        </div>
        <div className="card">
          <h3>Mié</h3>
          <p>27°C</p>
        </div>
        <div className="card">
          <h3>Jue</h3>
          <p>27°C</p>
        </div>
        <div className="card">
          <h3>Vie</h3>
          <p>27°C</p>
        </div>
      </div>
    </div>
  )
}

export default App
