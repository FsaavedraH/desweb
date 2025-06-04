import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";

export default function FormularioCompra({ carrito, setCarrito, setDatosCompra }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateInvoiceTXT = (summary) => {
    let content = `Invoice - ${summary.fecha}\n\n`;
    content += `Full name: ${summary.nombre}\n`;
    content += `Mailing address: ${summary.direccion}, ${summary.ciudad}\n`;
    content += `Contact telephone number: ${summary.telefono}\n\n`;
    content += `Products:\n`;

    summary.carrito.forEach((item) => {
      content += `- ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}\n`;
    });

    content += `\nSubtotal: $${summary.subtotal.toFixed(2)}\n`;
    content += `IVA (19%): $${summary.iva.toFixed(2)}\n`;
    content += `Total: $${summary.total.toFixed(2)}\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${Date.now()}.txt`;
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fecha = new Date().toLocaleString();
    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const summary = {
      ...form,
      carrito,
      fecha,
      subtotal,
      iva,
      total,
    };

    setDatosCompra(summary);
    generateInvoiceTXT(summary);
    setCarrito([]);
    navigate("/bill");
  };

  return (
    <form className="formulario-compra" onSubmit={handleSubmit}>
      <h2>Finalizar Compra</h2>

      <div className="form-group">
        <label htmlFor="nombre">Full name</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          onChange={handleChange}
          placeholder="Ejemplo: Leo Messi"
        />
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Mailing address</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          required
          onChange={handleChange}
          placeholder="Ejemplo: Calle BATMAN"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">City</label>
        <input
          id="ciudad"
          name="ciudad"
          type="text"
          required
          onChange={handleChange}
          placeholder="Ejemplo: Ciudad Gotica"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Contact telephone number</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          required
          onChange={handleChange}
          placeholder="Ejemplo : 3001234567"
        />
      </div>

      <button type="submit">Confirm and Generate Invoice</button>
    </form>
  );
}
