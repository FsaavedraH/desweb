import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Bill.css";

export default function Bill({ datos }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!datos) return <p>There is no data to display.</p>;

  const finalizarCompra = () => {
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push(datos);
    localStorage.setItem("historialCompras", JSON.stringify(historial));
    
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="factura">
      <h2>Purchase invoice</h2>
      <p><strong>Name:</strong> {datos.nombre}</p>
      <p><strong>Address:</strong> {datos.direccion}, {datos.ciudad}</p>
      <p><strong>Phone:</strong> {datos.telefono}</p>
      <p><strong>Date:</strong> {datos.fecha}</p>

      <ul>
        {datos.carrito.map((item) => (
          <li key={item.id}>
            {item.nombre} x {item.cantidad} : ${item.precio * item.cantidad}
          </li>
        ))}
      </ul>

      <h3>Subtotal: ${datos.subtotal.toFixed(2)}</h3>
      <h3>IVA: ${datos.iva.toFixed(2)}</h3>
      <h2>Total: ${datos.total.toFixed(2)}</h2>

      <button className="finalizar-btn" onClick={finalizarCompra}>
        Complete purchase
      </button>

      {/* pop up */}
      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <h3>Purchase successful!</h3>
          </div>
        </div>
      )}
    </div>
  );
}