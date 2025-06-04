import { useParams, useNavigate } from "react-router-dom";
import { productos } from "../../data";
import "./ProductDetail.css";

function ProductDetail({ agregarAlCarrito, agregarFavoritos }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = productos.find((p) => p.id === parseInt(id, 10));

    const volverInicio = () => {
        navigate("/");
    };

    if (!product) {
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <div className="detalle-container">
            <div className="detalle-card">
                <model-viewer
                    src={product.modelo}
                    alt={product.nombre}
                    auto-rotate
                    camera-controls
                    ar
                    className="detalle-model"
                />
                <div className="detalle-info">
                    <h2>{product.nombre}</h2>
                    <p className="detalle-precio">${product.precio}</p>
                    <p className="detalle-descripcion">BLACK FRIDAY!</p>
                    
                    <div className="btn-container">
                        <button
                            className="detalle-btn"
                            onClick={() => agregarAlCarrito(product)}
                        >
                            Purchase
                        </button>
                        <button
                            className="detalle-btn"
                            id="fav"
                            onClick={() => agregarFavoritos(product)}
                        >
                            Add favorites
                        </button>
                    </div>

                    <div className="volver-container">
                        <button
                            onClick={volverInicio}
                            className="volver-inicio"
                        >
                            Back to Store
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
