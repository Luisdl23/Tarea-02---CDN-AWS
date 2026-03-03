export default function App() {

  const weather = {
    city: "Guatemala",
    temperature: "24°C",
    condition: "Soleado",
    humidity: "65%",
    wind: "15 km/h"
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      fontFamily: "Arial"
    }}>
      <div style={{
        backgroundColor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        textAlign: "center",
        width: "350px",
        color: "white"
      }}>
        <h2 style={{marginBottom: "10px"}}>
          {weather.city}
        </h2>

        <h1 style={{fontSize: "3rem", margin: "10px 0"}}>
          {weather.temperature}
        </h1>

        <p style={{fontSize: "1.2rem", marginBottom: "25px"}}>
          {weather.condition}
        </p>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          paddingTop: "15px"
        }}>
          <div>
            <strong>Agua</strong>
            <p>{weather.humidity}</p>
          </div>
          <div>
            <strong>Aire</strong>
            <p>{weather.wind}</p>
          </div>
        </div>
      </div>
    </div>
  );
}