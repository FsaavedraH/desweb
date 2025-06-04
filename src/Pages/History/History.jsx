import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

export default function History() {
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  const volverInicio = () => navigate("/");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("historialCompras")) || [];
    setHistorial(data);
  }, []);

  if (historial.length === 0) {
    return (
      <div className="vacio">
        <p className="historial-vacio">There are no purchases recorded.</p>
        <button onClick={volverInicio} className="volver-inicio">
          Return to the store
        </button>
      </div>
    );
  }

  return (
    <div className="historial">
      <h2>Purchase History</h2>

      <div className="historial-lista">
        {historial.map((compra, index) => (
          <div key={index} className="historial-item">
            <div className="historial-encabezado">
              <span className="historial-fecha">{compra.fecha}</span>
              <span className="historial-nombre">Customer: {compra.nombre}</span>
            </div>

            <div className="historial-detalle">
              <p><strong>Address:</strong> {compra.direccion}, {compra.ciudad}</p>
              <p><strong>Phone:</strong> {compra.telefono}</p>
              
              <ul className="historial-productos">
                {compra.carrito.map((item) => (
                  <li key={item.id}>
                    {item.nombre} × {item.cantidad} — ${item.precio * item.cantidad}
                  </li>
                ))}
              </ul>

              <div className="historial-total">
                <p><strong>:</strong> ${compra.subtotal.toFixed(2)}</p>
                <p><strong>IVA:</strong> ${compra.iva.toFixed(2)}</p>
                <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={volverInicio} className="volver-inicio">
        Return to store
      </button>
    </div>
  );
}
