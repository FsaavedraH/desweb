import { useNavigate } from "react-router-dom";

export function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

  const sub_total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = sub_total * 0.19;
  const total = sub_total + iva;

  const remover = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <div className="carrito invoice">
      <h2 className="invoice-title">Bill</h2>

      {carrito.length === 0 ? (
        <p className="empty-message">Your cart is empty</p>
      ) : (
        <>
          <table className="invoice-table" style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Courier New', Courier, monospace" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #000", textAlign: "left", padding: "8px" }}>Product</th>
                <th style={{ borderBottom: "2px solid #000", textAlign: "center", padding: "8px" }}>Amount</th>
                <th style={{ borderBottom: "2px solid #000", textAlign: "right", padding: "8px" }}>Price</th>
                <th style={{ borderBottom: "2px solid #000", textAlign: "right", padding: "8px" }}>Subtotal</th>
                <th style={{ borderBottom: "2px solid #000", padding: "8px" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px dashed #000" }}>
                  <td style={{ padding: "8px" }}>{item.nombre}</td>
                  <td style={{ textAlign: "center" }}>{item.cantidad}</td>
                  <td style={{ textAlign: "right" }}>${item.precio.toFixed(2)}</td>
                  <td style={{ textAlign: "right" }}>${(item.precio * item.cantidad).toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <button 
                      onClick={() => remover(item.id)} 
                      style={{ 
                        background: "none", 
                        border: "none", 
                        color: "red", 
                        fontWeight: "bold", 
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: "1"
                      }} 
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-summary" style={{ marginTop: "20px", fontFamily: "'Courier New', Courier, monospace" }}>
            <p><strong>Sub total:</strong> ${sub_total.toFixed(2)}</p>
            <p><strong>IVA (19%):</strong> ${iva.toFixed(2)}</p>
            <p style={{ borderTop: "2px solid #000", paddingTop: "8px", fontWeight: "bold" }}><strong>Total:</strong> ${total.toFixed(2)}</p>
          </div>

          <button 
            id="fin" 
            onClick={() => navigate("/form")} 
            style={{ 
              marginTop: "20px", 
              padding: "10px 20px", 
              fontFamily: "'Courier New', Courier, monospace",
              backgroundColor: "#000", 
              color: "#fff", 
              border: "none",
              cursor: "pointer",
              letterSpacing: "1px"
            }}
          >
            Complete purchase
          </button>
        </>
      )}
    </div>
  );
}
